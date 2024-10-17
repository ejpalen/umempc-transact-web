from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('logistic_regression_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        print('Error: Model not loaded. Please train the model first.')
        return jsonify({'error': 'Model not loaded. Please train the model first.'}), 500

    data = request.get_json(force=True)
    # Assuming the data is a dictionary with keys matching the feature names
    features = np.array([data['ApplicantIncome'], data['CoapplicantIncome'], data['LoanAmount'], 
                         data['Loan_Amount_Term'], data['Credit_History']]).reshape(1, -1)
    prediction = model.predict(features)
    
    # Print the result to the console
    result = 'Eligible' if prediction[0] == 1 else 'Not Eligible'
    print(f'Loan Status: {result}')
    
    return jsonify({'Loan_Status': result})

if __name__ == '__main__':
    app.run(debug=True)
