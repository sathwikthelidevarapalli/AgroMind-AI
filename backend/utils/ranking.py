import math
from typing import Dict, Iterable, List, Optional


def normalize_value(value: Optional[float], min_value: float, max_value: float) -> float:
    """Return a 0-1 normalized score; gracefully handle missing or constant ranges."""
    if value is None or math.isnan(value):
        return 0.0
    if max_value == min_value:
        return 1.0
    normalized = (value - min_value) / (max_value - min_value)
    return max(0.0, min(1.0, normalized))


def compute_final_score(
    suitability_score: float,
    normalized_profit: float,
    normalized_yield: float,
    risk_factor: float = 1.0,
) -> float:
    """Composite score prioritizing suitability, profit, then yield, adjusted by risk.

    - suitability_score: probability (0-1)
    - normalized_profit: 0-1 normalized (negative profits should be clamped before calling)
    - normalized_yield: 0-1 normalized
    - risk_factor: multiplier for risk (Low ~1.0, Medium <1, High <<1)
    """
    base = (0.6 * suitability_score) + (0.3 * normalized_profit) + (0.1 * normalized_yield)
    return base * max(risk_factor, 0.0)


def rank_candidates(
    candidates: Iterable[Dict],
    top_k: int = 3,
) -> List[Dict]:
    """Return the top_k candidates ordered by final_score descending."""
    sorted_items = sorted(candidates, key=lambda item: item.get("final_score", 0), reverse=True)
    return sorted_items[:top_k]
