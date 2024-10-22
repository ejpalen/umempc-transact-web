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
  const [array, setArray] = useState([]);
  const [prediction, setPrediction] = useState(() => {
    const storedPrediction = sessionStorage.getItem("prediction");
    return storedPrediction || null;
  });

  const [loans, setLoans] = useState([]);
  const [loanTotalBalance, setLoanTotalBalance] = useState([]);

    useEffect(() => {
      const storedPrediction = JSON.parse(sessionStorage.getItem("prediction"));
      const storedMemberDetails = JSON.parse(sessionStorage.getItem("memberPersonalDetails"));
  
      if (storedPrediction !== null) {
        setPrediction(storedPrediction);
      }

      if (storedMemberDetails !== null) {
        setMemberPersonalDetails(storedMemberDetails);
      }


    }, []);

    let loanRef = query(
      collection(db, "loans"),
      orderBy("issued_date"),
      where("loan_applicant_id", "==",JSON.parse(sessionStorage.getItem("memberPersonalDetails"))[0].id)
    );
  
    //Fetch loans from database
    useEffect(() => {
      onSnapshot(loanRef, (snapshot) => {
        const loanData = snapshot.docs.map((val) => ({
          ...val.data(),
          id: val.id,
        }));
        setLoans(loanData);
         // Calculate the total loan amount
         const totalLoanAmount = loanData.reduce((total, loan) => total + (loan.loanAmount || 0), 0);
         setLoanTotalBalance(totalLoanAmount); 
      });
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
                prediction={prediction}
                setPrediction={setPrediction}
                loans={loans}
                loanTotalBalance={loanTotalBalance}
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
