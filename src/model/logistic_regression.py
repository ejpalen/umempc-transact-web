import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib
import os
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

# Load the existing dataset
file_path = "src/model/loan_management_dataset.xlsx"
data = pd.read_excel(file_path)

# Extract features and target variable
X = data[['Income', 'Age', 'Shared_Capital', 'Loan_Balance', 'num_loans', 'LoanAmount', 'num_paid_loans', 'num_defaulted_loans', 'num_active_loans']].values

# Generate loan status (eligible or not) based on existing data
loan_status = ((data['Income'] > 40000) & (data['Age'] > 21) & 
               (data['Shared_Capital'] > 5000) & (data['Loan_Balance'] < 50000) & 
               (data['num_paid_loans'] > data['num_defaulted_loans'])).astype(int)

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train a logistic regression model
model = LogisticRegression(max_iter=200)
model.fit(X_scaled, loan_status)

# Save the model and the scaler
os.makedirs('src/model', exist_ok=True)
joblib.dump(model, 'src/model/logistic_regression_model.pkl')
joblib.dump(scaler, 'src/model/scaler.pkl')  # Save the scaler

# You can also add code here to evaluate your model and print metrics if needed