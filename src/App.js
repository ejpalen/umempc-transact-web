import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./Homepage";
import Login from "./pages/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import RenewPassword from "./components/Login/RenewPassword";

import AdminLogin from "./admin/AdminLogin";
import AdminHomepage from "./admin/AdminHomepage";

import { ToastContainer } from "react-toastify";

function App() {
  const [memberPersonalDetails, setMemberPersonalDetails] = useState([]);
  const [adminPersonalDetails, setAdminPersonalDetails] = useState([]);
  const [array, setArray] = useState([]);


  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const fetchAPI = async () => {
    try {
      const response = await axios.post("http://localhost:8080/predict");
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch prediction");
    }
  };

  useEffect(() => {
    if (prediction && prediction.output) {
      try {
        const finalOutput = JSON.parse(prediction.output);

        // const probabilityPercentage = (finalOutput.probability * 100).toFixed(2) + '%';
        // console.log(`Probability: ${probabilityPercentage}`);
        // console.log(prediction.eligibility);
        // console.log(probabilityPercentage);
        // console.log(prediction.reasons);

        setPrediction(finalOutput);
        console.log("Parsed prediction:", prediction);
      } catch (err) {
        console.error("Error parsing prediction output:", err);
        setError("Failed to parse prediction output");
      }
    }
  }, [prediction]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Login
                setMemberPersonalDetails={setMemberPersonalDetails}
                memberPersonalDetails={memberPersonalDetails}
                prediction={prediction}
                setPrediction={setPrediction}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/renew-password" element={<RenewPassword />} />
          <Route
            path="/*"
            element={<Homepage memberPersonalDetails={memberPersonalDetails} />}
          />
          <Route
            path="/admin/"
            exact
            element={
              <AdminLogin
                adminPersonalDetails={adminPersonalDetails}
                setAdminPersonalDetails={setAdminPersonalDetails}
              />
            }
          />
          <Route
            path="/admin/*"
            exact
            element={
              <AdminHomepage
                adminPersonalDetails={adminPersonalDetails}
                setAdminPersonalDetails={setAdminPersonalDetails}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
