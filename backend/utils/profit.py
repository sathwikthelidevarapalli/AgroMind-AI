import math
from typing import Iterable, Optional, Tuple


def _to_float(value: Optional[object]) -> Optional[float]:
    if value is None:
        return None
    try:
        cleaned = str(value).replace(",", "").replace(" ", "").strip()
        return float(cleaned)
    except Exception:
        return None


def compute_profitability(
    expected_yield: Optional[float],
    market_price: Optional[float],
    input_cost: Optional[float],
    expected_revenue: Optional[float] = None,
) -> Optional[float]:
    """Compute profitability using either revenue-cost or yield*price-cost."""
    ey = _to_float(expected_yield)
    mp = _to_float(market_price)
    cost = _to_float(input_cost) or 0.0
    revenue = _to_float(expected_revenue)

    if revenue is not None:
        return revenue - cost
    if ey is None or mp is None:
        return None
    return (ey * mp) - cost


def series_min_max(values: Iterable[Optional[float]]) -> Tuple[float, float]:
    numeric_values = [v for v in (_to_float(v) for v in values) if v is not None and not math.isnan(v)]
    if not numeric_values:
        return (0.0, 1.0)
    return (min(numeric_values), max(numeric_values))
