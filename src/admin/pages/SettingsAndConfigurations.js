import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import closeIcon from "../../assets/images/search-icon.png";

const SettingsAndConfigurations = () => {
  const moment = require("moment");

  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const navLinks = ["Loan Configuration", "Member Management Settings", "System Settings"];

  const members = [
    {
      id: "12345",
      name: "Nomar Maestro",
      membershipStatus: "Regular",
      employmentStatus: "Casual",
      totalLoans: 32,
      outstandingBalance: 35600.0,
      joinDate: "08-12-2024",
    },
  ];
  

  return (
    <div className="dashboard">
    <section className="flex gap-2 justify-between items-start">
      <span>
        <h1 className="text-2xl text-bold">Settings & Configurations</h1>
        <p className="opacity-75">
        Manage and configure system-wide settings, loan parameters, and application behavior.
        </p>
      </span>
      <div className="flex gap-2 items-center">
        <Profile />
      </div>
    </section>
    <main className="mt-10 p-4 bg-white rounded-lg">
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
      <section className="mt-8 flex gap-2 flex-col">
        <div>
        <h1 className="text-2xl">Loan Type</h1>
        </div>

      </section>
    </main>
  </div>
  );
};

export default SettingsAndConfigurations;
