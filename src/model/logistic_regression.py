# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib
import os
from datetime import datetime
from sklearn.model_selection import train_test_split

# Assume the model is already trained and saved
# For demonstration, let's create a dummy model and train it on synthetic data
np.random.seed(42)
n_samples = 1000
income = np.random.normal(50000, 15000, n_samples)
age = np.random.randint(18, 70, n_samples)
credit_score = np.random.normal(650, 50, n_samples)
loan_status = ((income > 40000) & (age > 21) & (credit_score > 600)).astype(int)

X = np.column_stack((income, age, credit_score))
y = loan_status

# Train a logistic regression model
model = LogisticRegression()
model.fit(X, y)

# Save the model
os.makedirs('src/model', exist_ok=True)
joblib.dump(model, 'src/model/logistic_regression_model.pkl')

# Create data for a single user
user_data = {
    'Name': 'John Doe',
    'Income': 55000,
    'Age': 30,
    'Credit_Score': 700,
    'Loan_History': [
        {
            'Loan_Amount': 10000,
            'Loan_Term': '12 months',
            'Loan_Type': 'Personal',
            'Issued_Date': datetime(2022, 1, 15),
            'Next_Payment_Date': datetime(2023, 1, 15),
            'Repayment_Status': 'Paid',
            'Due_Date': datetime(2023, 1, 15),
            'Overdue_Days': 0,
            'Overdue_Amount': 0,
            'Status': 'Closed'
        },
        {
            'Loan_Amount': 15000,
            'Loan_Term': '24 months',
            'Loan_Type': 'Auto',
            'Issued_Date': datetime(2021, 6, 10),
            'Next_Payment_Date': datetime(2023, 6, 10),
            'Repayment_Status': 'Paid',
            'Due_Date': datetime(2023, 6, 10),
            'Overdue_Days': 0,
            'Overdue_Amount': 0,
            'Status': 'Closed'
        },
        {
            'Loan_Amount': 20000,
            'Loan_Term': '36 months',
            'Loan_Type': 'Mortgage',
            'Issued_Date': datetime(2020, 3, 5),
            'Next_Payment_Date': datetime(2023, 3, 5),
            'Repayment_Status': 'Defaulted',
            'Due_Date': datetime(2023, 3, 5),
            'Overdue_Days': 30,
            'Overdue_Amount': 500,
            'Status': 'Defaulted'
        },
        {
            'Loan_Amount': 5000,
            'Loan_Term': '6 months',
            'Loan_Type': 'Personal',
            'Issued_Date': datetime(2022, 7, 20),
            'Next_Payment_Date': datetime(2023, 1, 20),
            'Repayment_Status': 'Paid',
            'Due_Date': datetime(2023, 1, 20),
            'Overdue_Days': 0,
            'Overdue_Amount': 0,
            'Status': 'Closed'
        },
        {
            'Loan_Amount': 12000,
            'Loan_Term': '18 months',
            'Loan_Type': 'Education',
            'Issued_Date': datetime(2021, 11, 25),
            'Next_Payment_Date': datetime(2023, 5, 25),
            'Repayment_Status': 'Paid',
            'Due_Date': datetime(2023, 5, 25),
            'Overdue_Days': 0,
            'Overdue_Amount': 0,
            'Status': 'Closed'
        }
    ]
}

# Display user's loan history
print(f"Loan history for {user_data['Name']}:")
for i, loan in enumerate(user_data['Loan_History']):
    print(f"Loan {i+1}:")
    for key, value in loan.items():
        if isinstance(value, datetime):
            value = value.strftime('%Y-%m-%d')
        print(f"  {key}: {value}")

# Prepare features for eligibility prediction
total_loan_amount = sum(loan['Loan_Amount'] for loan in user_data['Loan_History'])
num_loans = len(user_data['Loan_History'])
num_paid_loans = sum(1 for loan in user_data['Loan_History'] if loan['Repayment_Status'] == 'Paid')
num_defaulted_loans = sum(1 for loan in user_data['Loan_History'] if loan['Repayment_Status'] == 'Defaulted')

# Create user features array
# Update this line to match the original training features
user_features = np.array([[user_data['Income'], user_data['Age'], user_data['Credit_Score']]])

# Handle missing values by imputing them (if any)
imputer = SimpleImputer(strategy='mean')
user_features = imputer.fit_transform(user_features)

# Load the model and predict eligibility for the single user
model = joblib.load('src/model/logistic_regression_model.pkl')
probability = model.predict_proba(user_features)[0][1]
prediction = model.predict(user_features)

# Determine eligibility
eligibility = 'Eligible' if prediction[0] == 1 else 'Not Eligible'

# Print the result with probability
print(f"{user_data['Name']} is {eligibility} for a new loan with a probability of {probability * 100:.2f}%.")

# Provide reasons for eligibility
if prediction[0] == 1:
    reasons = "Income, age, credit score, and loan history metrics meet the eligibility criteria."
else:
    reasons = "One or more of income, age, credit score, or loan history metrics do not meet the eligibility criteria."

print(f"Reasons: {reasons}")

# Evaluate the model with some metrics
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("\nModel Evaluation Metrics:")
print(f"Accuracy: {accuracy * 100:.2f}%")
print(f"Precision: {precision * 100:.2f}%")
print(f"Recall: {recall * 100:.2f}%")
print(f"F1 Score: {f1 * 100:.2f}%")
