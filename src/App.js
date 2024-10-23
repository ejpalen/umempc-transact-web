import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Firebase
import { db } from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query as firestoreQuery,
  query,
  addDoc,
  where,
} from "firebase/firestore";

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
  const [memberPersonalDetails, setMemberPersonalDetails] = useState(() => {
    const storedMemberDetails = sessionStorage.getItem("memberPersonalDetails");
    return storedMemberDetails || null;
  });
  const [adminPersonalDetails, setAdminPersonalDetails] = useState([]);
  const [prediction, setPrediction] = useState(() => {
    const storedPrediction = sessionStorage.getItem("prediction");
    return storedPrediction || null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    return storedIsLoggedIn || false;
  });

  const [loans, setLoans] = useState([]);
  const [loanTotalBalance, setLoanTotalBalance] = useState(0);
  const [loanTotal, setLoanTotal] = useState(0);

    useEffect(() => {
      const storedPrediction = JSON.parse(sessionStorage.getItem("prediction"));
      const storedMemberDetails = JSON.parse(sessionStorage.getItem("memberPersonalDetails"));
      const storedIsLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  
      if (storedPrediction !== null) {
        setPrediction(storedPrediction);
      }

      if (storedMemberDetails !== null) {
        setMemberPersonalDetails(storedMemberDetails);
      }

      if (storedIsLoggedIn !== null) {
        setIsLoggedIn(storedIsLoggedIn);
      }


    }, []);

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
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/renew-password" element={<RenewPassword />} />
          <Route
            path="/*"
            element={
              <Homepage
                memberPersonalDetails={memberPersonalDetails}
                setMemberPersonalDetails={setMemberPersonalDetails}
                prediction={prediction}
                setPrediction={setPrediction}
                loans={loans}
                setLoans={setLoans}
                loanTotalBalance={loanTotalBalance}
                setLoanTotalBalance={setLoanTotalBalance}
                loanTotal={loanTotal}
                setLoanTotal={setLoanTotal}
                isLoggedIn={isLoggedIn}
              />
            }
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
