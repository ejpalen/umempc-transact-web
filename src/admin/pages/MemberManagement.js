import { useEffect, useState } from "react";

import Profile from "../components/Profile";
import closeIcon from "../../assets/images/search-icon.png";

import downArrow from "../../assets/images/down-arrow.png";

const MemberManagement = () => {
  const moment = require("moment");

  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const navLinks = ["All Members", "Regular", "Casual", "Part-time", "Retire"];

  const actions = ["View Profile", "Edit Profile"]

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

  const loanTermsOptions = {
    membershipStatus: {
      label: "Membership Status",
      options: [
        { value: "Prepaid Cash", label: "Active" },
        { value: "Add-on Cash", label: "Inactive" }
      ]
    },
    employmentStatus: {
      label: "Employment Status",
      options: [
        { value: "Prepaid Cash", label: "Regular" },
        { value: "Add-on Cash", label: "Associate" }
      ]
    }
  };
  

  return (
    <div className="dashboard">
      <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Member Management</h1>
          <p className="opacity-75">
            Manage member profiles, loan histories, account statuses, and
            transactions.
          </p>
        </span>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center button-1 rounded-lg h-9">
            {/* <img src={LoanIcon} className="size-5 invert brightness-0" /> */}
            <p>Add New Member</p>
          </span>
          <Profile />
        </div>
      </section>
      <main className="mt-10 p-4 bg-white rounded-lg admin-min-height">
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
        <section className="mt-4 flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
        
            <div
                className="dropdown dropdown-select search-container text-sm"
              >
                <button className="dropbtn hover-1 gap-2 w-full">
                  <p className={`${selectedFilter === "Filter" && "opacity-50"}`}>
                    {!selectedFilter
                      ? "Filter"
                      : selectedFilter}
                  </p>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
    {Object.keys(loanTermsOptions).map((key) => (
      <div key={key}>
        <h2 className="dropdown-label text-bold">{loanTermsOptions[key].label}</h2>
        {loanTermsOptions[key].options.map((option) => (
          <a
            href="#"
            className="dropdown-sublist-link hover-1"
            key={option.value}
            onClick={() => {
              // You can define your custom action here
              setSelectedFilter(option.value)
              console.log(`Selected: ${option.value}`);
            }}
          >
            {option.label}
          </a>
        ))}
      </div>
    ))}
  </div>
</div>
</div>
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
                className="border-none text-sm"
                placeholder="Search by Books"
              />
            </span>
          </div>
        </section>
        <section className="mt-4">
          <table>
            <tr>
              <th>Member ID</th>
              <th>Name</th>
              <th>Membership Status</th>
              <th>Employment Status</th>
              <th>Total Loans</th>
              <th>Outstanding Balance</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
            {members.map((loan) => (
              <tr>
                <td>{loan.id}</td>
                <td>{loan.name}</td>
                <td>{loan.membershipStatus}</td>
                <td>{loan.employmentStatus}</td>
                <td>{loan.totalLoans}</td>
                <td>₱{loan.outstandingBalance.toFixed()}</td>
                <td>{loan.joinDate}</td>
                <td>
                <div
                className="dropdown dropdown-select search-container text-sm"
              >
                <button className="dropbtn hover-1 gap-2 w-full">
                  <p className={`${"opacity-50"}`}>
                  Select Action
                  </p>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
    {actions.map((action) => (
       <a
       href="#"
       className="dropdown-sublist-link hover-1"
       onClick={() => {
         setSelectedFilter(action)
       }}
     >
       {action}
     </a>
    ))}
  </div>
</div>
</div>
                </td>
              </tr>
            ))}
          </table>
        </section>
      </main>
    </div>
  );
};

export default MemberManagement;
