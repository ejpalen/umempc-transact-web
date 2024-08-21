import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Support from "./pages/Support";
import SupportChat from "./pages/SupportChart";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ApplyForLoan from "./pages/ApplyForLoan";

const Homepage = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="home">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <Routes>
        <Route
          path="/home"
          element={
            <Home activeLink={activeLink} setActiveLink={setActiveLink} />
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/apply-for-loan" element={<ApplyForLoan />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support-chat" element={<SupportChat />} />
      </Routes>
    </div>
  );
};

export default Homepage;
