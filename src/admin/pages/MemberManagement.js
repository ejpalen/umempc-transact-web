import { useEffect, useState } from "react";

import Profile from "../components/Profile";
import closeIcon from "../../assets/images/search-icon.png";

const MemberManagement = () => {
  const moment = require("moment");

  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const navLinks = ["All Members", "Regular", "Casual", "Part-time", "Retire"];

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
        <section className="mt-4 flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <select
              name="loanTerms"
              id="loanTerms"
              onChange={(e) => {
                setSelectedFilter(e.target.value);
              }}
              value={selectedFilter}
            >
              <optgroup label="Membership Status">
                <option value="Prepaid Cash">Active</option>
                <option value="Add-on Cash">Inactive</option>
              </optgroup>
              <optgroup label="Employment Status">
                <option value="Prepaid Cash">Regular</option>
                <option value="Add-on Cash">Associate</option>
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
                  <select
                    name="loanTerms"
                    id="loanTerms"
                    onChange={(e) => {
                      setSelectedFilter(e.target.value);
                    }}
                  >
                    <option value="Salary Deduction">View Profile</option>
                    <option value="Over-the-counter">Edit Profile</option>
                  </select>
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
