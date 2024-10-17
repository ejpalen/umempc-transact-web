import React, { useState } from 'react';
import axios from 'axios';

const LoanPrediction = () => {
  const [formData, setFormData] = useState({
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: ''
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/predict', formData);
      setPrediction(response.data.Loan_Status);
    } catch (error) {
      console.error('Error making prediction', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="ApplicantIncome" placeholder="Applicant Income" onChange={handleChange} />
        <input type="number" name="CoapplicantIncome" placeholder="Coapplicant Income" onChange={handleChange} />
        <input type="number" name="LoanAmount" placeholder="Loan Amount" onChange={handleChange} />
        <input type="number" name="Loan_Amount_Term" placeholder="Loan Amount Term" onChange={handleChange} />
        <input type="number" name="Credit_History" placeholder="Credit History" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Loan Status: {prediction}</p>}
    </div>
  );
};

export default LoanPrediction;
