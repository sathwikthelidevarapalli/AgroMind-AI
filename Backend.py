#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#importing the libraries
import json

from flask import Flask, request, jsonify
try:
    from flask_cors import CORS
except ImportError:
    CORS = None
import numpy as np
import pandas as pd
import joblib

#initializing flask

app = Flask(__name__)
# Enable CORS if available to allow frontend calls from localhost
if CORS:
    CORS(app)

# Robust model loading: try Saved Model/CRSML.sav, then fallback
model = None
model_paths = [
    'Saved Model/CRSML.sav',
    'Saved Model/finalized_model.sav',
    'finalized_model.sav'
]
for p in model_paths:
    try:
        model = joblib.load(p)
        break
    except Exception:
        continue
if model is None:
    raise FileNotFoundError('No model file found. Expected one of: ' + ', '.join(model_paths))
with open('Datasets/Prediction.json') as fp:
    crop_info = json.load(fp)
cat_crop_df = pd.read_csv('Datasets/Cat_Crop.csv')



# --- New /predict endpoint for web app ---
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # Expecting: { "state": str, "soil_type": int, "rainfall": float, "ground_water": float, "temperature": float, "season": int }
    # Optionally: add more fields as needed
    try:
        # Prepare input for model
        input_dict = {
            "States": int(data["state"]),
            "Rainfall": float(data["rainfall"]),
            "Ground Water": float(data["ground_water"]),
            "Temperature": float(data["temperature"]),
            "Soil_type": int(data["soil_type"]),
            "Season": int(data["season"])
        }
        inp_array = np.array(list(input_dict.values())).reshape(1, -1)
        # Predict top 3 crops (assuming model supports predict_proba or similar)
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(inp_array)[0]
            top3_idx = np.argsort(proba)[-3:][::-1]
            crop_labels = model.classes_
            top3_crops = [crop_labels[i] for i in top3_idx]
            top3_scores = [float(proba[i]) for i in top3_idx]
        else:
            pred = model.predict(inp_array)
            top3_crops = [pred[0]]
            top3_scores = [1.0]
        # Gather crop info
        recommendations = []
        for crop, score in zip(top3_crops, top3_scores):
            info = crop_info.get(crop, {})
            recommendations.append({
                "crop": crop,
                "suitability_score": score,
                "expected_yield": info.get("expected_yield"),
                "estimated_profitability": info.get("estimated_profitability"),
                "details": info
            })
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
    
    
    

        
        
        
        
                 
    
