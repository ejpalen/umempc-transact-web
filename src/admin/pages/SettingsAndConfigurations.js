import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import closeIcon from "../../assets/images/close-icon.png";
import editIcon from "../../assets/images/admin-edit-icon.png";
import removeIcon from "../../assets/images/remove-icon.png";
import addIcon from "../../assets/images/add-icon.png";

const SettingsAndConfigurations = () => {
  const moment = require("moment");

  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const navLinks = [
    "Loan Configuration",
    "Member Management Settings",
    "System Settings",
  ];

  const loanTypes = ["Prepaid Cash", "Add-on Cash"];
  const kindOfLoan = ["Salary Loan", "Benefits Loan", "Merchandise Loan"];
  const paymentMethod = [
    "Salary Deduction",
    "Over-the-counter",
    "Post Dated Check",
  ];

  return (
    <div className="dashboard">
      <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Settings & Configurations</h1>
          <p className="opacity-75">
            Manage and configure system-wide settings, loan parameters, and
            application behavior.
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
        <section className="mt-8 flex flex-col">
          <div className="border-bottom pb-8">
            <h1 className="text-xl text-bold pl-6">Loan Type</h1>
            <div className="flex flex-wrap gap-2 items-center mt-2">
              {loanTypes.map((loan) => (
                <div className="flex gap-8 items-center bg-hoverBg p-2 px-6 rounded-full">
                  <span className="">{loan}</span>
                  <div className="flex gap-1">
                    <span
                      className="flex gap-2 items-center button-1 rounded-lg h-9 w-max bg-hoverBg text-default
                    "
                    >
                      <img src={editIcon} className="size-4" />
                    </span>
                    <span
                      className="flex gap-2 items-center rounded-lg h-9 w-max
                    "
                    >
                      <img src={closeIcon} className="size-4" />
                    </span>
                  </div>
                </div>
              ))}
              <span
                className="flex gap-2 items-center rounded-lg h-9 w-max py-2 px-2
                    "
              >
                <img src={addIcon} className="size-4" />
                <p>Add Loan Type</p>
              </span>
            </div>
          </div>
          <div className="mt-8 border-bottom pb-8">
            <h1 className="text-xl text-bold pl-6">Kind of Loan</h1>
            <div className="flex flex-wrap gap-2 items-center mt-2">
              {kindOfLoan.map((loan) => (
                <div className="flex gap-8 items-center bg-hoverBg p-2 px-6 rounded-full">
                  <span className="">{loan}</span>
                  <div className="flex gap-1">
                    <span
                      className="flex gap-2 items-center button-1 rounded-lg h-9 w-max bg-hoverBg text-default
                    "
                    >
                      <img src={editIcon} className="size-4" />
                    </span>
                    <span
                      className="flex gap-2 items-center rounded-lg h-9 w-max
                    "
                    >
                      <img src={closeIcon} className="size-4" />
                    </span>
                  </div>
                </div>
              ))}
              <span
                className="flex gap-2 items-center rounded-lg h-9 w-max py-2 px-2
                    "
              >
                <img src={addIcon} className="size-4" />
                <p>Add Kind of Loan</p>
              </span>
            </div>
          </div>
          <div className="mt-8 pb-8">
            <h1 className="text-xl text-bold pl-6">Payment Method</h1>
            <div className="flex flex-wrap gap-2 items-center mt-2">
              {paymentMethod.map((loan) => (
                <div className="flex gap-8 items-center bg-hoverBg p-2 px-6 rounded-full">
                  <span className="">{loan}</span>
                  <div className="flex gap-1">
                    <span
                      className="flex gap-2 items-center button-1 rounded-lg h-9 w-max bg-hoverBg text-default
                    "
                    >
                      <img src={editIcon} className="size-4" />
                    </span>
                    <span
                      className="flex gap-2 items-center rounded-lg h-9 w-max
                    "
                    >
                      <img src={closeIcon} className="size-4" />
                    </span>
                  </div>
                </div>
              ))}
              <span
                className="flex gap-2 items-center rounded-lg h-9 w-max py-2 px-2
                    "
              >
                <img src={addIcon} className="size-4" />
                <p>Add Payment Method</p>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsAndConfigurations;
