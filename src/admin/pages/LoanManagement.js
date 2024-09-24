import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import LoanIcon from "../../assets/images/loan-management-icon.png";
import closeIcon from "../../assets/images/search-icon.png";

const LoanManagement = () => {
  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");

  const navLinks = [
    "All Loans",
    "Approved",
    "Pending",
    "Declined",
    "Overdue",
    "Payment Schedules",
  ];

  return (
    <div className="dashboard">
      <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Loan Management</h1>
          <p className="opacity-75">
            Monitor and control active loans, pending requests, and repayment
            schedules.
          </p>
        </span>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center button-1 rounded-lg h-9">
            <img src={LoanIcon} className="size-5 invert brightness-0" />
            <p>Add New Loan</p>
          </span>
          <Profile />
        </div>
      </section>
      <main className="mt-4 p-4 bg-white rounded-lg">
        <section className="flex items-center gap-1 border-bottom pb-4">
          {navLinks.map((link, index) => (
            <span
              onClick={() => setSelectedNav(index)}
              key={link}
              className={`cursor-pointer hover:bg-hoverBg rounded-md py-2 px-4 ${
                selectedNav === index
                  ? "bg-secondary text-primary text-bold"
                  : "bg-white"
              }`}
            >
              {link}
            </span>
          ))}
        </section>
        <section className="mt-4 flex gap-2 items-center">
          <select
            name="loanTerms"
            id="loanTerms"
            onChange={(e) => {
              setSelectedFilter(e.target.value);
            }}
          >
            <optgroup label="Loan Type">
              <option value="Prepaid Cash">Prepaid Cash</option>
              <option value="Add-on Cash">Add-on Cash</option>
            </optgroup>
            <optgroup label="Kind of Loan">
              <option value="Salary Loan">Salary Loan</option>
              <option value="Benefits Loan">Benefits Loan</option>
              <option value="Merchandise Loan">Merchandise Loan</option>
              <option value="Others">Others</option>
            </optgroup>
            <optgroup label="Payment Method">
              <option value="Salary Deduction">Salary Deduction</option>
              <option value="Over-the-counter">Over-the-counter</option>
              <option value="Post Dated Check">Post Dated Check</option>
            </optgroup>
          </select>
          <span>
            <p className="text-primary text-sm">Clear</p>
          </span>
          <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
            <img src={closeIcon} alt="" className="size-4" />
            <input
              type="text"
              name="search"
              id=""
              className="border-none"
              placeholder="Search by Loan or Member"
            />
          </span>
        </section>
      </main>
    </div>
  );
};

export default LoanManagement;
