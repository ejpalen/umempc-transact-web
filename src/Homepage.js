import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Support from "./pages/Support";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ApplyForLoan from "./pages/ApplyForLoan";

const Homepage = () => {
  return (
    <div className="home">
      <Nav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/apply-for-loan" element={<ApplyForLoan />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Homepage;
