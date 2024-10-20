from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler  # Import the scaler
import sys
import json

# Set random seed for reproducibility
np.random.seed(42)

# Generate synthetic data
n_samples = 2
income = np.random.normal(50000, 15000, n_samples)
age = np.random.randint(18, 70, n_samples)
shared_capital = np.random.normal(10000, 5000, n_samples)
loan_balance = np.random.normal(20000, 10000, n_samples)

# Generate loan history data
def generate_loan_history():
    num_loans = np.random.randint(1, 6)  # Number of loans remains an integer
    total_amount = round(np.random.normal(50000, 20000), 2)  # Generate total amount in thousands and round to 2 decimal points
    paid_loans = round(np.random.uniform(0, num_loans), 2)  # Generate paid loans in thousands and round to 2 decimal points
    defaulted_loans = round(np.random.uniform(0, num_loans - paid_loans), 2)  # Generate defaulted loans in thousands and round to 2 decimal points
    active_loans = round(num_loans - paid_loans - defaulted_loans, 2)  # Calculate active loans in thousands and round to 2 decimal points
    return [num_loans, total_amount, paid_loans, defaulted_loans, active_loans]

loan_history = np.array([generate_loan_history() for _ in range(n_samples)])

# Format the loan history to ensure two decimal places
loan_history = np.round(loan_history, 2)

# Combine all features
X = np.column_stack((income, age, shared_capital, loan_balance, loan_history))

# Generate loan status (eligible or not)
loan_status = ((income > 40000) & (age > 21) & 
               (shared_capital > 5000) & (loan_balance < 50000) & 
               (loan_history[:, 2] > loan_history[:, 3])).astype(int)  # More paid loans than defaulted

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Scale the feature set

# Train a logistic regression model with increased max_iter
model = LogisticRegression(max_iter=200)  # Increased max_iter to 200
model.fit(X_scaled, loan_status)

# Save the model
os.makedirs('src/model', exist_ok=True)
joblib.dump(model, 'src/model/logistic_regression_model.pkl')


ApplicantIncome = int(sys.argv[1])
Applicant_Age = int(sys.argv[2])
Shared_Capital = int(sys.argv[3])
Loan_Balance = int(sys.argv[4])
num_loans = int(sys.argv[5])
LoanAmount = int(sys.argv[6])
num_paid_loans = int(sys.argv[7])
num_defaulted_loans = int(sys.argv[8])
num_active_loans = int(sys.argv[9])


# Create a user features array
user_features = np.array([
    ApplicantIncome,
    Applicant_Age,
    Shared_Capital,
    Loan_Balance,
    num_loans,
    LoanAmount,
    num_paid_loans,
    num_defaulted_loans,
    num_active_loans
]).reshape(1, -1)  # Reshape to ensure it's 2D

# Handle missing values by imputing them (if any)
imputer = SimpleImputer(strategy='mean')
user_features = imputer.fit_transform(user_features)

# Scale user features
user_features_scaled = scaler.transform(user_features)  # Scale user features

# Load the model and predict eligibility for the single user
model = joblib.load('src/model/logistic_regression_model.pkl')  # Load the existing model

# Predict eligibility
probability = model.predict_proba(user_features_scaled)[0][1]
prediction = model.predict(user_features_scaled)

# Determine eligibility
eligibility = 'Eligible' if prediction[0] == 1 else 'Not Eligible'

# Provide reasons for eligibility
if prediction[0] == 1:
    reasons = "Income, age, shared capital, loan balance, and loan history metrics meet the eligibility criteria."
else:
    reasons = "One or more of income, age, shared capital, loan balance, or loan history metrics do not meet the eligibility criteria."

# Evaluate the model with some metrics
X_train, X_test, y_train, y_test = train_test_split(X, loan_status, test_size=0.2, random_state=42)
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

output = {
    "eligibility": eligibility,
    "probability": probability,
    "reasons": reasons,
    "model_metrics": {
        "accuracy": f"{accuracy * 100:.2f}%",   # Convert to percentage
        "precision": f"{precision * 100:.2f}%", 
        "recall": f"{recall * 100:.2f}%",     
        "f1_score": f"{f1 * 100:.2f}%"         
    }
}

# Print the output as a JSON string
print(json.dumps(output))  # This must be the last line of output

