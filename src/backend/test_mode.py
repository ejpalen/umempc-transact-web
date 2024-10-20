import joblib
import numpy as np
from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and scaler
model = joblib.load('src/model/logistic_regression_model.pkl')
scaler = joblib.load('src/model/scaler.pkl')

# Example user input (make sure it matches the features used in training)
Income = 50000
Age = 30
Shared_Capital = 10000
Loan_Balance = 20000
num_loans = 2
LoanAmount = 5000  # This should be removed if not used in training
num_paid_loans = 1
num_defaulted_loans = 0
num_active_loans = 1

# Create a user features array (ensure it matches the training features)
user_features = np.array([
    Income,
    Age,
    Shared_Capital,
    Loan_Balance,
    num_loans,
    num_paid_loans,          # Ensure these match the training features
    num_defaulted_loans,
    num_active_loans
]).reshape(1, -1)  # Reshape to ensure it's 2D

# Scale user features
user_features_scaled = scaler.transform(user_features)  # Scale user features

# Predict eligibility
probability = model.predict_proba(user_features_scaled)[0][1]
prediction = model.predict(user_features_scaled)

# Determine eligibility
eligibility = 'Eligible' if prediction[0] == 1 else 'Not Eligible'


output = {
    "eligibility": eligibility,
    "probability": probability,
   
}

# Print the output as a JSON string
print(json.dumps(output))  # This must be the last line of output