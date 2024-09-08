import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./Homepage";
import Login from "./pages/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import RenewPassword from "./components/Login/RenewPassword";

import AdminLogin from "./admin/AdminLogin";
import AdminHomepage from "./admin/AdminHomepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/renew-password" element={<RenewPassword />} />
          <Route path="/*" element={<Homepage />} />
          <Route path="/admin/" exact element={<AdminLogin />} />
          <Route path="/admin/*" exact element={<AdminHomepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
