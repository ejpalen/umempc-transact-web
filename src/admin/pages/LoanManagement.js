import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import LoanIcon from "../../assets/images/loan-management-icon.png"

const LoanManagement = () => {

  const [selectedNav, setSelectedNav] = useState(0)

  const navLinks = [
    "All Loans",
    "Approved",
    "Pending",
    "Declined",
    "Overdue",
    "Payment Schedules",
  ]

  return (
    <div className="dashboard">
        <section className="flex gap-2 justify-between items-start">
        <span>
        <h1 className="text-2xl text-bold">Loan Management</h1>
        <p className="opacity-75">Monitor and control active loans, pending requests, and repayment schedules.</p>
        </span>
        <div className="flex gap-2 items-center">
        <span className="flex gap-2 items-center button-1 rounded-lg h-9">
        <img src={LoanIcon} className="size-5 invert brightness-0" />
        <p>Add New Loan</p>
        </span>
        <Profile/>
        </div>
        </section>
        <main className="mt-4 p-4 bg-white rounded-lg">
        <section className="flex items-center gap-1 border-bottom pb-4">
          {navLinks.map((link, index) => (
            <span
            onClick={() => setSelectedNav(index)}
            key={link} className={`cursor-pointer hover:bg-hoverBg text-sm rounded-md py-2 px-4 ${selectedNav === index ? "bg-secondary text-primary text-bold" : 'bg-white'}`}>{link}</span>
          ))}
        </section>
        </main>
    </div>
  );
};

export default LoanManagement;
