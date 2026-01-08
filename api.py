
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
try:
    model = joblib.load("models/cardio_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

class PredictionRequest(BaseModel):
    age: int
    gender: str # "male" or "female"
    height: float
    weight: float
    apHi: int
    apLo: int
    cholesterol: str # "1", "2", "3"
    glucose: str # "1", "2", "3"
    smoke: str # "yes", "no"
    alcohol: str # "yes", "no"
    active: str # "yes", "no"
    model: str # "random_forest", etc. (currently unused)

@app.post("/predict")
def predict(request: PredictionRequest):
    if not model or not scaler:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # Preprocess inputs
    # Gender: Male -> 2, Female -> 1
    gender_val = 2 if request.gender == "male" else 1
    
    # Smoke, Alcohol, Active: Yes -> 1, No -> 0
    smoke_val = 1 if request.smoke == "yes" else 0
    alco_val = 1 if request.alcohol == "yes" else 0
    active_val = 1 if request.active == "yes" else 0
    
    # Calculate BMI
    # height in cm, weight in kg
    # bmi = weight / (height/100)^2
    bmi = request.weight / ((request.height / 100) ** 2)
    
    # Pulse Pressure (ap_hi - ap_lo)
    # The existing model seems to have 'pulse_pressure' as a feature.
    pulse_pressure = request.apHi - request.apLo

    # Prepare DataFrame
    data = {
        "age": [request.age],
        "ap_hi": [request.apHi],
        "ap_lo": [request.apLo],
        "smoke": [smoke_val],
        "alco": [alco_val],
        "active": [active_val],
        "bmi": [bmi],
        "pulse_pressure": [pulse_pressure],
        "cholesterol": [int(request.cholesterol)],
        "gluc": [int(request.glucose)],
        "gender": [gender_val]
    }
    
    input_df = pd.DataFrame(data)
    
    # One-hot encoding manual replication
    # Features: age,ap_hi,ap_lo,smoke,alco,active,bmi,pulse_pressure,cholesterol_2,cholesterol_3,gluc_2,gluc_3,gender_2
    
    # Initialize all dummy columns to 0
    input_df['cholesterol_2'] = 0
    input_df['cholesterol_3'] = 0
    input_df['gluc_2'] = 0
    input_df['gluc_3'] = 0
    input_df['gender_2'] = 0
    
    # Set dummy values
    if request.cholesterol == "2":
        input_df['cholesterol_2'] = 1
    elif request.cholesterol == "3":
        input_df['cholesterol_3'] = 1
        
    if request.glucose == "2":
        input_df['gluc_2'] = 1
    elif request.glucose == "3":
        input_df['gluc_3'] = 1
        
    if gender_val == 2:
        input_df['gender_2'] = 1
        
    # Drop original categorical columns
    input_df = input_df.drop(columns=['cholesterol', 'gluc', 'gender'])
    
    # Ensure column order matches model expectation
    expected_cols = [
        'age', 'ap_hi', 'ap_lo', 'smoke', 'alco', 'active', 'bmi', 
        'pulse_pressure', 'cholesterol_2', 'cholesterol_3', 
        'gluc_2', 'gluc_3', 'gender_2'
    ]
    
    input_df = input_df[expected_cols]
    
    # Scale
    try:
        input_scaled = scaler.transform(input_df)
    except Exception as e:
         # If columns mismatch, try reindexing with 0 (fallback)
         input_df = input_df.reindex(columns=scaler.feature_names_in_, fill_value=0)
         input_scaled = scaler.transform(input_df)

    # Predict
    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]
    
    risk = "low"
    if probability > 0.6:
        risk = "high"
    elif probability > 0.3:
        risk = "moderate"
        
    factors = []
    if request.age > 55: factors.append("Age above 55 years")
    if request.apHi > 140: factors.append("High systolic blood pressure")
    if request.apLo > 90: factors.append("High diastolic blood pressure")
    if request.cholesterol != "1": factors.append("Elevated cholesterol")
    if request.glucose != "1": factors.append("Elevated glucose")
    if request.smoke == "yes": factors.append("Smoker")
    if bmi > 25: factors.append("Overweight/Obese")

    model_names = {
        "random_forest": "Random Forest",
        "logistic_regression": "Logistic Regression",
        "decision_tree": "Decision Tree"
    }
    model_used = model_names.get(request.model, "Random Forest")

    return {
        "risk": risk,
        "probability": float(probability),
        "factors": factors,
        "modelUsed": model_used
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
