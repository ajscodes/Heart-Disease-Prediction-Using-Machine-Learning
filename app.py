# This is UI using Streamlit which is not useful now.
# Currently we work with UI using Next.js so ignore this file.

import streamlit as st
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

import joblib


st.set_page_config(
    page_title="Cardio Disease Prediction",
    layout="centered"
)

st.title("Cardiovascular Disease Prediction")
st.write("Enter patient details to predict the risk of cardiovascular disease.")


def load_data():
    return pd.read_csv("./data/cardio_cleaned_data.csv")

df = load_data()

X = df.drop(columns=['cardio', 'id'])
y = df['cardio']

# Encoding
X = pd.get_dummies(X, columns=['cholesterol', 'gluc', 'gender'], drop_first=True)

@st.cache_resource
def load_model():
    model = joblib.load("models/cardio_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    return model, scaler

model, scaler = load_model()

#Input from user
st.subheader("Patient Information")

age = st.number_input("Age (years)", min_value=1, max_value=120, value=21)
gender = st.selectbox("Gender", ["Female", "Male"])
height = st.number_input("Height (cm)", min_value=100, max_value=220, value=161)
weight = st.number_input("Weight (kg)", min_value=30.0, max_value=200.0, value=59.0)
ap_hi = st.number_input("Systolic BP (ap_hi)", min_value=80, max_value=250, value=120)
ap_lo = st.number_input("Diastolic BP (ap_lo)", min_value=40, max_value=150, value=80)
cholesterol = st.selectbox("Cholesterol Level", ["Normal", "Above Normal", "Well Above Normal"])
gluc = st.selectbox("Glucose Level", ["Normal", "Above Normal", "Well Above Normal"])
smoke = st.selectbox("Smoking", ["No", "Yes"])
alco = st.selectbox("Alcohol Intake", ["No", "Yes"])
active = st.selectbox("Physically Active", ["No", "Yes"])

#Label
gender_val = 1 if gender == "Male" else 0
chol_map = {"Normal": 1, "Above Normal": 2, "Well Above Normal": 3}
gluc_map = {"Normal": 1, "Above Normal": 2, "Well Above Normal": 3}

bmi = (weight / (height ** 2)) * 10000

input_data = pd.DataFrame([{
    "age": age,
    "height": height,
    "weight": weight,
    "ap_hi": ap_hi,
    "ap_lo": ap_lo,
    "smoke": 1 if smoke == "Yes" else 0,
    "alco": 1 if alco == "Yes" else 0,
    "active": 1 if active == "Yes" else 0,
    "bmi": bmi,
    "cholesterol": chol_map[cholesterol],
    "gluc": gluc_map[gluc],
    "gender": 2 if gender == "Male" else 1
}])

# Encode input
input_data = pd.get_dummies(input_data, columns=['cholesterol', 'gluc', 'gender'], drop_first=True)
input_data = input_data.reindex(columns=X.columns, fill_value=0)

input_scaled = scaler.transform(input_data)

#Predict
if st.button("Predict"):
    prediction = model.predict(input_scaled)[0]
    probability = model.predict_proba(input_scaled)[0][1]

    st.subheader("Result:")

    if prediction == 1:
        st.error(f"High Risk of Cardiovascular Disease\n\nProbability: {probability:.2f}")
    else:
        st.success(f"Low Risk of Cardiovascular Disease\n\nProbability: {probability:.2f}")