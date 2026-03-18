import logging
from pathlib import Path
from typing import Dict, List

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR.parent / "Datasets"
MODEL_PATH = BASE_DIR / "model.pkl"
FEATURE_COLUMNS = ["N", "P", "K", "ph", "temperature", "humidity", "rainfall"]
RNG = np.random.default_rng(42)


def _to_float(val, default=None):
    try:
        return float(str(val).replace(",", "").replace(" ", ""))
    except Exception:
        return default


def load_crop_metadata() -> pd.DataFrame:
    meta_path = DATA_DIR / "Prediction.csv"
    if not meta_path.exists():
        raise FileNotFoundError(f"Missing metadata file at {meta_path}")

    df = pd.read_csv(meta_path)
    df = df.rename(columns={
        "Crops": "crop",
        "Expected revenues": "expected_revenue",
        "Cost of cultivation": "cost_of_cultivation",
    })
    df["expected_revenue"] = df["expected_revenue"].apply(_to_float)
    df["cost_of_cultivation"] = df["cost_of_cultivation"].apply(_to_float)
    df["expected_profit"] = df["expected_revenue"] - df["cost_of_cultivation"]
    return df


def _sample_features() -> Dict[str, float]:
    return {
        "N": float(RNG.uniform(10, 140)),
        "P": float(RNG.uniform(5, 90)),
        "K": float(RNG.uniform(5, 180)),
        "ph": float(RNG.uniform(4.8, 8.2)),
        "temperature": float(RNG.uniform(14, 42)),
        "humidity": float(RNG.uniform(25, 95)),
        "rainfall": float(RNG.uniform(20, 420)),
    }


def generate_training_frame(meta_df: pd.DataFrame, rows_per_crop: int = 32) -> pd.DataFrame:
    rows: List[Dict[str, float]] = []
    labels: List[str] = []
    for _, row in meta_df.iterrows():
        crop = row["crop"]
        revenue = row.get("expected_revenue") or 0
        profit_bias = (revenue or 0) / 150000.0  # small bias to diversify crops
        for _ in range(rows_per_crop):
            features = _sample_features()
            # bias temperature and rainfall a bit per crop to create separability
            features["temperature"] += float(RNG.normal(loc=profit_bias * 5, scale=2))
            features["rainfall"] += float(RNG.normal(loc=profit_bias * 40, scale=20))
            rows.append(features)
            labels.append(crop)
    frame = pd.DataFrame(rows)
    frame["label"] = labels
    return frame


def build_and_save_model(model_path: Path = MODEL_PATH) -> RandomForestClassifier:
    meta_df = load_crop_metadata()
    training_df = generate_training_frame(meta_df)

    # === Dataset validation ===
    required = FEATURE_COLUMNS + ["label"]
    missing_cols = [c for c in required if c not in training_df.columns]
    if missing_cols:
        raise ValueError(f"Training data missing columns: {missing_cols}")

    print("Dataset shape:", training_df.shape)
    print("Unique crop labels:", training_df["label"].unique())
    print("Label distribution:\n", training_df["label"].value_counts())

    unique_labels = training_df["label"].nunique()
    if unique_labels <= 1:
        raise ValueError("Label column contains only one class; aborting training")

    X = training_df[FEATURE_COLUMNS]
    y = training_df["label"]

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=200,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train, y_train)

    val_score = model.score(X_val, y_val)
    logging.info("Validation accuracy: %.3f", val_score)
    logging.info("Classes learned: %s", list(model.classes_))

    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)
    return model


if __name__ == "__main__":
    trained_model = build_and_save_model()
    print(f"Model trained and saved to {MODEL_PATH}")
