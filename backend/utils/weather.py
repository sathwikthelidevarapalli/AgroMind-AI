import logging
import os
from typing import Dict, Optional

import requests

WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather"


def fetch_weather(location: str, api_key: Optional[str]) -> Optional[Dict]:
    """Fetch temperature, humidity, and rainfall (if available) for a location."""
    if not location or not api_key:
        return None
    try:
        params = {
            "q": location,
            "appid": api_key,
            "units": "metric",
        }
        resp = requests.get(WEATHER_ENDPOINT, params=params, timeout=8)
        if resp.status_code != 200:
            logging.warning("Weather API returned %s: %s", resp.status_code, resp.text)
            return None
        payload = resp.json()
        main = payload.get("main", {})
        rain = payload.get("rain", {})
        return {
            "temperature": main.get("temp"),
            "humidity": main.get("humidity"),
            "rainfall": rain.get("1h") or rain.get("3h"),
            "location_name": payload.get("name"),
            "raw": payload,
        }
    except Exception as exc:  # pragma: no cover - safety net for network issues
        logging.exception("Weather fetch failed: %s", exc)
        return None
