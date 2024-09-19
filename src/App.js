import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
