import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav"

import Dashboard from "./pages/Dashboard"
import LoanManagement from "./pages/LoanManagement"
import MemberManagement from "./pages/MemberManagement"
import LedgerManagement from "./pages/LedgerManagement"
import AgingReport from "./pages/AgingReport"
import ReportAndAnalytics from "./pages/ReportAndAnalytics"
import SettingsAndConfigurations from "./pages/SettingsAndConfigurations"

const AdminHomepage = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="flex gap-2 h-screen">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="content p-4 bg flex-1 overflow-y-scroll">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/member-management" element={<MemberManagement />} />
        <Route path="/ledger-management" element={<LedgerManagement />} />
        <Route path="/aging-report" element={<AgingReport />} />
        <Route path="/report-and-analytics" element={<ReportAndAnalytics />} />
        <Route path="/settings-and-configurations" element={<SettingsAndConfigurations />} />
      </Routes>
      </div>
    </div>
  );
};

export default AdminHomepage;
