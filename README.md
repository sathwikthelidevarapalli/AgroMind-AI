
# AgroMind AI – Intelligent Crop Recommendation Platform

AgroMind AI is a full-stack web platform that recommends and ranks the best crops using soil nutrients (N, P, K, pH), climate inputs (temperature, humidity, rainfall), and location-aware weather data. It serves a farmer-friendly React dashboard powered by a Flask REST API and a RandomForest model with explainable feature importances.

## Architecture
- **backend/**: Flask API, RandomForest model, training script, utilities for ranking, profitability, and weather.
- **frontend/**: React dashboard (farmer form, ranked results, feature-importance bar chart) with responsive green theme.
- **Datasets/**: Existing crop metadata (`Prediction.csv`, `Prediction.json`) reused to enrich results.

## Features
- Top-3 ranked crops with suitability %, expected yield, estimated profit (INR), composite score, and risk level.
- RandomForest model with explainable `feature_importances_` exposed to the UI.
- Location-aware weather fetch via OpenWeatherMap to auto-fill temperature, humidity, and rainfall.
- Robust input validation, CORS, and logging-ready Flask app.
- Render-ready: uses environment variables for secrets and runs on Render/Heroku-style dynos.

## Backend
**Structure**
```
backend/
    app.py                # Flask API (predict, weather, health)
    train_model.py        # Trains RandomForest and saves model.pkl
    model.pkl             # Generated on first run if missing
    utils/
        ranking.py          # Normalization + scoring
        profit.py           # Profit and min/max helpers
        weather.py          # OpenWeatherMap client
```

**Environment variables**
- `WEATHER_API_KEY` (required for live weather fetch)
- `PORT` (optional; defaults to 5000)

**Install & run**
```bash
pip install -r requirements.txt
cd backend
python app.py   # trains model if backend/model.pkl is absent
```

**API**
- `GET /health` → `{ "status": "ok" }`
- `GET /weather?location=City` → temperature, humidity, rainfall (requires `WEATHER_API_KEY`).
- `POST /predict`
    ```json
    {
        "N": 90,
        "P": 40,
        "K": 60,
        "ph": 6.8,
        "temperature": 28.5,
        "humidity": 70,
        "rainfall": 220,
        "location": "Lucknow"
    }
    ```
    Returns: `top_crops` (ranked 3), `feature_importance`, `weather` (if used).

**Training**
- `python backend/train_model.py` builds a synthetic-yet-structured dataset using `Datasets/Prediction.csv` for crop labels and revenue metadata, then saves `backend/model.pkl`.

## Frontend
**Structure** (React 18 + recharts)
```
frontend/
    public/index.html
    src/
        App.js              # Main layout and state
        index.js            # React entry
        styles.css          # Global styles
        components/
            Dashboard.jsx     # Farmer input form + weather fetch
            ResultCard.jsx    # Ranked crop card
            FeatureChart.jsx  # Bar chart for feature importance
```

**Install & run**
```bash
cd frontend
npm install
npm start
# Optional: set REACT_APP_API_BASE (defaults to http://localhost:5000)
```

## Deployment notes
- Backend ready for Render/Heroku: single Flask entrypoint `backend/app.py`, uses `PORT` env, and lazy-trains model if missing.
- Frontend consumes `REACT_APP_API_BASE` for API routing.
- Secrets: only `WEATHER_API_KEY` is needed for weather auto-fill; predictions still work with manual climate inputs if the key is absent.

## Data inputs expected
- Soil: N, P, K, pH
- Climate: temperature (°C), humidity (%), rainfall (mm)
- Location: optional string to auto-fill weather

## Outputs returned to the UI
- Top 3 crops with suitability %, expected yield (kg/ha), estimated profit (INR), composite score, and risk level
- Feature importance mapping for explainability
- Weather data applied (if fetched)

## Notes
- Existing legacy scripts (`Backend.py`, `CRS.py`, `soilNET.py`) remain for reference; the new entrypoint is `backend/app.py`.
- The training data is synthetic and driven by available crop revenue metadata—swap in a real agronomic dataset to improve accuracy.

## Output Screenshots

Add your captured UI images to `docs/screenshots/` with the following names to render this gallery on GitHub:

### Home
![Home Hero](docs/screenshots/home-hero.png)
![Home Platform Advantages](docs/screenshots/home-platform-advantages.png)
![Home How It Works](docs/screenshots/home-how-it-works.png)

### Dashboard
![Dashboard Input Form](docs/screenshots/dashboard-input-form.png)

### Results
![Results Ranked Crops](docs/screenshots/results-ranked-crops.png)
![Results Explainable AI](docs/screenshots/results-explainable-ai.png)

