import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";

import closeIcon from "../../assets/images/search-icon.png";


import dashboardIcon from "../../assets/images/dashboard-icon.png";
import dashboardIconActive from "../../assets/images/dashboard-icon-active.png";
import settingsIcon from "../../assets/images/settings-and-configuration-icon.png";
import settingsIconActive from "../../assets/images/settings-and-configuration-icon-active.png";
import memberManagementIcon from "../../assets/images/member-management-icon.png";
import memberManagementIconActive from "../../assets/images/member-management-icon-active.png";
import loanManagementIcon from "../../assets/images/loan-management-icon.png";
import loanManagementIconActive from "../../assets/images/loan-management-icon-active.png";
import reportAnalyticsIcon from "../../assets/images/report-analytics-icon.png";
import reportAnalyticsIconActive from "../../assets/images/report-analytics-icon-active.png";


const ReportAndAnalytics = () => {
  const [selectedNav, setSelectedNav] = useState(0);

  
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const [activeLink, setActiveLink] = useState(0);

  const financialReportLinks = [
    {
      path: "/admin/dashboard",
      text: "General Ledger",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Cash Disbursement Book",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
    {
      path: "/admin/member-management",
      text: "Cash Receipt Book",
      icon: memberManagementIcon,
      activeIcon: memberManagementIconActive,
    },
    {
      path: "/admin/report-and-analytics",
      text: "General Journal",
      icon: reportAnalyticsIcon,
      activeIcon: reportAnalyticsIconActive,
    },
    
  ];

  const loanReportLinks = [

    {
      path: "/admin/settings-and-configurations",
      text: "Loan Status Report",
      icon: settingsIcon,
      activeIcon: settingsIconActive,
    },
    {
      path: "/admin/dashboard",
      text: "Loan Aging Report",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Loan Repayment Report",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
  
    
  ];
  
  const analyticsLinks = [
    {
      path: "/admin/dashboard",
      text: "Loan Performance",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Cash Flow",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
    {
      path: "/admin/member-management",
      text: "Member Engagement",
      icon: memberManagementIcon,
      activeIcon: memberManagementIconActive,
    },
    
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const navLinks = ["All Members", "Regular", "Casual", "Part-time", "Retire"];

  const generalLedgerData = [
    {
      recordMonth: "31/01/2024",
      books: "BB",
      debit: 5884808.66,
      credit: 2098.90,
      balance: 5882727.76,
    },
  ];

  return (
    <div className="dashboard">
        <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Report & Analytics</h1>
          <p className="opacity-75">
          Generate, review, and analyze key financial and operational reports for the loan management system.
          </p>
        </span>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center button-1 rounded-lg h-9">
            {/* <img src={LoanIcon} className="size-5 invert brightness-0" /> */}
            <p>Export Report</p>
          </span>
          <Profile />
        </div>
      </section>
      <section className="flex gap-8 items-start mt-10">
      <nav className="flex flex-col gap-1">
        <p className="text-sm opacity-75">Financial Reports</p>
        {financialReportLinks.map((link, index) => (
          <span
            to={link.path}
            className={`cursor-pointer admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index && "active bg-primary"
            }`}
            onClick={() => handleLinkClick(index)}
          >
              <img className="h-4"
                src={activeLink === index ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index ? "text-primary" : "text-white"}`}>{link.text}</span>
          </span>
        ))}
         <p className="text-sm opacity-75 mt-2">Loan Reports</p>
        {loanReportLinks.map((link, index) => (
          <span
            to={link.path}
            className={`cursor-pointer admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index + 4 && "active bg-primary"
            }`}
            onClick={() => handleLinkClick(index + 4)}
          >
              <img className="h-4"
                src={activeLink === index + 4 ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index + 4 ? "text-primary" : "text-white"}`}>{link.text}</span>
          </span>
        ))}
           <p className="text-sm opacity-75 mt-2">Analytics</p>
        {analyticsLinks.map((link, index) => (
          <span
            to={link.path}
            className={`cursor-pointer admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index + 10 && "active bg-primary"
            }`}
            onClick={() => handleLinkClick(index + 10)}
          >
              <img className="h-4"
                src={activeLink === index + 10 ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index + 10 ? "text-primary" : "text-white"}`}>{link.text}</span>
          </span>
        ))}
      </nav>
      <main className="p-4 bg-white rounded-lg flex-1">
        <section className="flex gap-4 mb-4 border-bottom pb-4">
        <span className="bg-secondary p-4 rounded-lg">
        <p className="opacity-75">Account Code</p>
        <h1 className="text-2xl text-bold">11340</h1>
        </span>
        <span className="p-4">
        <p className="opacity-75">Total Debit (Dr.)</p>
        <h1 className="text-2xl text-bold">₱6,494,672.99</h1>
        </span>
        <span className="p-4">
        <p className="opacity-75">Total Credit  (Dr.)</p>
        <h1 className="text-2xl text-bold">₱62,578,712.52         </h1>
        </span>
        
        
        </section>
        <section className=" flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <select
              name="loanTerms"
              id="loanTerms"
              onChange={(e) => {
                setSelectedFilter(e.target.value);
              }}
              value={selectedFilter}
            >
              <optgroup label="Account Title">
                <option value="Prepaid Cash">Active</option>
                <option value="Add-on Cash">Inactive</option>
              </optgroup>
            </select>
            <select
              name="loanTerms"
              id="loanTerms"
              onChange={(e) => {
                setSelectedFilter(e.target.value);
              }}
              value={selectedFilter}
            >
              <optgroup label="Commulative Date">
                <option value="Prepaid Cash">Active</option>
                <option value="Add-on Cash">Inactive</option>
              </optgroup>
            </select>
            <span>
              <p className="text-primary text-sm">Clear</p>
            </span>
            
          </div>
          <div>
          <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none"
                placeholder="Search by Books"
              />
            </span>
          </div>
        </section>
        <section className="mt-4">
          <table>
            <tr>
              <th>Record Month</th>
              <th>Books</th>
              <th>Dr.</th>
              <th>Cr.</th>
              <th>Balance</th>
            </tr>
            {generalLedgerData.map((ledger) => (
              <tr>
                <td>{ledger.recordMonth}</td>
                <td>{ledger.books}</td>
                <td>₱{ledger.debit}</td>
                <td>₱{ledger.credit}</td>
                <td>₱{ledger.balance}</td>
              </tr>
            ))}
          </table>
        </section>
      </main>
      </section>
    </div>
  );
};

export default ReportAndAnalytics;
