import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav"

import "./admin.css"

import LoanManagement from "./pages/LoanManagement"
import MemberManagement from "./pages/MemberManagement"
import SettingsAndConfigurations from "./pages/SettingsAndConfigurations"
import Inbox from "./pages/Inbox";

const AdminHomepage = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="flex h-screen text-default">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="content p-5 bg flex-1 overflow-y-scroll">
      <Routes>
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/member-management" element={<MemberManagement />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/settings-and-configurations" element={<SettingsAndConfigurations />} />
      </Routes>
      </div>
    </div>
  );
};

export default AdminHomepage;
