import logging
import os
from pathlib import Path
from typing import Any, Dict, Optional

import joblib
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from utils.ranking import compute_final_score, normalize_value, rank_candidates
from utils.profit import compute_profitability, series_min_max
from utils.weather import fetch_weather
from utils.market_data import market_data
from train_model import FEATURE_COLUMNS, MODEL_PATH, build_and_save_model, load_crop_metadata

load_dotenv()
logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")

BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__)
CORS(app)


# ---- Model + metadata bootstrap -------------------------------------------------

def _load_model():
    if MODEL_PATH.exists():
        logging.info("Loading trained model from %s", MODEL_PATH)
        return joblib.load(MODEL_PATH)
    logging.info("Model not found. Training a fresh model...")
    return build_and_save_model(MODEL_PATH)


model = _load_model()
metadata_df = load_crop_metadata()

# derive numeric fields
metadata_df["expected_yield"] = metadata_df["expected_revenue"].apply(
    lambda r: (r or 0) / 12.0 if pd.notna(r) else None
)
metadata_df["estimated_profit"] = metadata_df.apply(
    lambda row: compute_profitability(
        expected_yield=None,
        market_price=None,
        input_cost=row.get("cost_of_cultivation"),
        expected_revenue=row.get("expected_revenue"),
    ),
    axis=1,
)
metadata_map: Dict[str, Dict[str, Any]] = {
    row["crop"]: row.to_dict() for _, row in metadata_df.iterrows()
}

yield_min, yield_max = series_min_max(
    [row.get("expected_yield") for row in metadata_map.values()]
)
profit_min, profit_max = series_min_max(
    [row.get("estimated_profit") for row in metadata_map.values()]
)

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")


# ---- Helpers --------------------------------------------------------------------

def _to_float(value: Any) -> Optional[float]:
    if value is None:
        return None
    try:
        return float(value)
    except Exception:
        try:
            cleaned = str(value).replace(",", "").strip()
            return float(cleaned)
        except Exception:
            return None


def _clean_number(value: Any) -> Optional[float]:
    try:
        if pd.isna(value):
            return None
    except Exception:
        pass
    try:
        return float(value)
    except Exception:
        return None


def _risk_level(profit: Optional[float]) -> str:
    if profit is None:
        return "Medium"
    if profit >= 75000:
        return "Low"
    if profit >= 25000:
        return "Medium"
    return "High"


def _risk_factor(level: str) -> float:
    if level == "Low":
        return 1.0
    if level == "Medium":
        return 0.85
    return 0.6


def _feature_importance_dict(model_obj) -> Dict[str, float]:
    if not hasattr(model_obj, "feature_importances_"):
        return {}
    return {
        name: round(float(score), 4)
        for name, score in zip(FEATURE_COLUMNS, model_obj.feature_importances_)
    }


def _market_info(crop_name: str) -> Dict[str, Any]:
    name_lower = (crop_name or "").lower()
    for key, info in market_data.items():
        if key in name_lower:
            return info
    return _demo_market_stub(crop_name)


def _demo_market_stub(crop_name: str) -> Dict[str, Any]:
    """Provide a deterministic demo market profile for crops not in market_data."""
    seeds = sum(ord(c) for c in (crop_name or "")) or 7
    demand_levels = ["High", "Medium", "Low"]
    trends = ["Up", "Stable", "Down"]
    risks = ["Low", "Medium", "High"]
    demand = demand_levels[seeds % len(demand_levels)]
    trend = trends[(seeds // 3) % len(trends)]
    market_risk = risks[(seeds // 5) % len(risks)]
    # Price between 1600 and 2600 with light variation
    price = 1600 + (seeds % 11) * 100
    return {
        "price_per_quintal": price,
        "demand": demand,
        "trend": trend,
        "market_risk": market_risk,
    }


# ---- Routes ---------------------------------------------------------------------


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/weather", methods=["GET"])
def weather():
    location = request.args.get("location") or ""
    weather_payload = fetch_weather(location, WEATHER_API_KEY)
    if not weather_payload:
        return jsonify({"error": "Unable to fetch weather"}), 400
    return jsonify(weather_payload)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(force=True) or {}
    except Exception:
        return jsonify({"error": "Invalid JSON payload"}), 400

    location = payload.get("location")
    features = {}
    for key in FEATURE_COLUMNS:
        features[key] = _to_float(payload.get(key))

    # Auto-fill weather if location provided and temp/humidity missing
    weather_data = None
    if location:
        if features.get("temperature") is None or features.get("humidity") is None:
            weather_data = fetch_weather(location, WEATHER_API_KEY)
            if weather_data:
                features["temperature"] = features.get("temperature") or weather_data.get("temperature")
                features["humidity"] = features.get("humidity") or weather_data.get("humidity")
                if features.get("rainfall") is None:
                    features["rainfall"] = weather_data.get("rainfall")

    missing = [k for k, v in features.items() if v is None]
    if missing:
        return jsonify({"error": f"Missing or invalid inputs: {', '.join(missing)}"}), 400

    feature_row = np.array([features[col] for col in FEATURE_COLUMNS], dtype=float).reshape(1, -1)

    if not hasattr(model, "predict_proba"):
        return jsonify({"error": "Model does not support predict_proba"}), 500

    probabilities = model.predict_proba(feature_row)[0]
    classes = model.classes_

    # Debug prints to verify multiple crops and correct probabilities
    print("Classes:", classes)
    print("Probabilities:", probabilities)

    # Top 3 crops by probability
    top_indices = np.argsort(probabilities)[::-1][:3]
    candidates = []
    for idx in top_indices:
        crop = classes[idx]
        prob = float(probabilities[idx])
        meta = metadata_map.get(crop, {})
        market = _market_info(crop)
        expected_yield = _clean_number(meta.get("expected_yield"))
        estimated_profit = _clean_number(meta.get("estimated_profit"))
        estimated_profit = max(0.0, estimated_profit) if estimated_profit is not None else None
        norm_yield = normalize_value(expected_yield, yield_min, yield_max)
        norm_profit = normalize_value(estimated_profit, profit_min, profit_max)
        agr_risk_level = _risk_level(estimated_profit)
        risk_factor = _risk_factor(agr_risk_level)
        final_score = compute_final_score(prob, norm_profit, norm_yield, risk_factor)
        candidates.append(
            {
                "crop": crop,
                "suitability_score": round(prob * 100, 2),
                "expected_yield": expected_yield,
            "estimated_profit": estimated_profit,
            "risk_level": agr_risk_level,
                "final_score": round(final_score * 100, 2),
                "market_price": market.get("price_per_quintal"),
                "demand": market.get("demand"),
                "trend": market.get("trend"),
                "market_risk": market.get("market_risk"),
            }
        )

    response = {
        "top_crops": rank_candidates(candidates, top_k=3),
        "feature_importance": _feature_importance_dict(model),
        "weather": weather_data,
        "confidence_score": round(float(max(probabilities)) * 100, 2) if len(probabilities) else None,
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
