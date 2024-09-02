import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { uuid } from "uuidv4";
import Support from "./pages/Support";
import SupportChat from "./components/SupportChat";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ApplyForLoan from "./pages/ApplyForLoan";
import LoanDetails from ".//components/ApplyForLoan/LoanDetails";
import PersonalDetails from ".//components/ApplyForLoan/PersonalDetails";
import ReviewDetails from ".//components/ApplyForLoan/ReviewDetails";
import Calculator from "./components/Features/Calculator";
import Ledger from "./components/Features/Ledger";
import Aging from "./components/Features/Aging";
import AgingDetails from "./components/Features/AgingDetails";
import Withdraw from "./components/Features/Withdraw";
import WithdrawDetails from "./components/Features/WithdrawDetails";
import Transaction from "./components/Transactions/Transaction";
import EditProfile from "./components/Profile/EditProfile";
import Settings from "./components/Profile/Settings";
import ChangePassword from "./components/Profile/ChangePassword";
import About from "./components/Profile/About";

const Homepage = () => {
  const [activeLink, setActiveLink] = useState(0);

  // Loan Details
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("5 months");
  const [loanTerm, setLoanTerm] = useState("5 months");
  const [selectedLoanType, setSelectedLoanType] = useState("Prepaid Cash");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Salary Deduction");

  const loanTerms = [
    "5 months",
    "6 months",
    "12 months",
    "18 months",
    "24 months",
    "36 months",
    "Others",
  ];
  const loanTypes = ["Prepaid Cash", "Add-on Cash"];
  const paymentMethod = [
    "Salary Deduction",
    "Over-the-counter",
    "Post Dated Check",
  ];

  // Personal Details
  const [name, setName] = useState("Edgar Palen Jr.");
  const [address, setAddress] = useState(
    "JP Rizal Extension, West Rembo, 1644 City of Taguig, Metro Manila, Philippines"
  );
  const [contactNumber, setContactNumber] = useState("09178335355");
  const [email, setEmail] = useState("umempc_transact@gmaill.com");
  const [selectedCollege, setSelectedCollege] = useState(
    "College of Computing and Information Sciences"
  );
  const [selectedMembershipStatus, setSelectedMembershipStatus] =
    useState("Regular");
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] =
    useState("Casual");

  const membershipStatus = ["Regular", "Associate"];
  const employmentStatus = ["Regular", "Casual", "Part-time", "Retire"];
  const colleges = [
    "College of Arts and Letters",
    "College of Human Kinetics",
    "College of Business and Financial Science",
    "College of Computing and Information Sciences",
    "College of Innovative Teacher Education",
    "College of Governance and Public Policy",
    "College of Construction Sciences and Engineering",
    "College of Science",
    "College of Technology Management",
    "College of Tourism and Hospitality Management",
    "College of Continuing, Advanced and Professional Studies",
  ];

  const transactionItemData = [
    {
      date: "23 April 2024",
      time: "08:11 pm",
      amount: "₱10,000.00",
      id: "1a1a1a",
      status: "Approved",
      type: "Prepaid Cash",
    },
    {
      date: "01 April 2024",
      time: "03:45 pm",
      amount: "₱45,000.00",
      id: "2b2b2b",
      status: "Approved",
      type: "Add-on Cash",
    },
    {
      date: "18 March 2024",
      time: "12:11 pm",
      amount: "₱2,000.00",
      id: "3c3c3c",
      status: "Approved",
      type: "Prepaid Cash",
    },
    {
      date: "06 March 2024",
      time: "10:08 am",
      amount: "₱5,000.00",
      id: "4d4d4d",
      status: "Approved",
      type: "Add-on Cash",
    },
    {
      date: "25 Feb 2024",
      time: "05:48 pm",
      amount: "₱20,000.00",
      id: "5e5e5e",
      status: "Approved",
      type: "Add-on Cash",
    },
    {
      date: "18 March 2024",
      time: "12:11 pm",
      amount: "₱2,000.00",
      id: "3c3c3c",
      status: "Approved",
      type: "Prepaid Cash",
    },
    {
      date: "06 March 2024",
      time: "10:08 am",
      amount: "₱5,000.00",
      id: "4d4d4d",
      status: "Approved",
      type: "Add-on Cash",
    },
    {
      date: "25 Feb 2024",
      time: "05:48 pm",
      amount: "₱20,000.00",
      id: "5e5e5e",
      status: "Approved",
      type: "Prepaid Cash",
    },
  ];

  const agingData = [
    {
      id: "111",
      cv: null,
      loanType: "Lamayan",
      loanDate: null,
      loanTerms: null,
      modeOfPayment: "Dividend",
      amortization: null,
      loanAmount: 600,
      deductions: [
        {
          period: "Jan. 1-15",
          salary: 600,
          otc: 0,
          otherPayroll: 0,
          reconstructionOthers: 0,
          balance: 600,
        },
        {
          period: "Jan. 16-31",
          salary: 1002,
          otc: 0,
          otherPayroll: 0,
          reconstructionOthers: 0,
          balance: 28071,
        },
        // ... more periods ...
      ],
    },
    {
      id: "222",
      cv: null,
      loanType: "Capital Build Up",
      loanDate: null,
      loanTerms: 24,
      modeOfPayment: "Payroll",
      amortization: 100,
      loanAmount: 100000,
      deductions: [
        {
          period: "Jan. 1-15",
          salary: 100,
          otc: 0,
          otherPayroll: 0,
          reconstructionOthers: 0,
          balance: 99900,
        },
        // ... more periods ...
      ],
    },
    {
      id: "333",
      cv: 36536,
      loanType: "Prepaid Cash Loan",
      loanDate: "2022-12-13",
      loanTerms: 24,
      modeOfPayment: "Payroll",
      amortization: 1002,
      loanAmount: 29073,
      deductions: [
        {
          period: "Jan. 1-15",
          salary: 1002,
          otc: 0,
          otherPayroll: 0,
          reconstructionOthers: 0,
          balance: 28071,
        },
        // ... more periods ...
      ],
    },
    {
      id: "444",
      cv: 43,
      loanType: "Cash Advance",
      loanDate: "2023-09-30",
      loanTerms: 4,
      modeOfPayment: "OTC",
      amortization: 500,
      loanAmount: 2500,
      deductions: [
        {
          period: "Jan. 1-15",
          salary: 0,
          otc: 500,
          otherPayroll: 0,
          reconstructionOthers: 0,
          balance: 2000,
        },
        // ... more periods ...
      ],
    },
    {
      id: "555",
      cv: 37862,
      loanType: "Prepaid Cash Loan",
      loanDate: "2024-03-05",
      loanTerms: null,
      modeOfPayment: "Payroll",
      amortization: null,
      loanAmount: 5000,
      deductions: [], // No deductions yet as it's a future loan
    },
  ];

  return (
    <div className="home">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              transactionItemData={transactionItemData}
            />
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/apply-for-loan" element={<ApplyForLoan />} />
        <Route
          path="/apply-for-loan/loan-details"
          element={
            <LoanDetails
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              selectedLoanTerm={selectedLoanTerm}
              setSelectedLoanTerm={setSelectedLoanTerm}
              selectedLoanType={selectedLoanType}
              setSelectedLoanType={setSelectedLoanType}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              loanTerms={loanTerms}
              loanTypes={loanTypes}
              paymentMethod={paymentMethod}
              loanTerm={loanTerm}
              setLoanTerm={setLoanTerm}
            />
          }
        />
        <Route
          path="/apply-for-loan/personal-details"
          element={
            <PersonalDetails
              name={name}
              setName={setName}
              address={address}
              setAddress={setAddress}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              selectedCollege={selectedCollege}
              setSelectedCollege={setSelectedCollege}
              selectedMembershipStatus={selectedMembershipStatus}
              setSelectedMembershipStatus={setSelectedMembershipStatus}
              selectedEmploymentStatus={selectedEmploymentStatus}
              setSelectedEmploymentStatus={setSelectedEmploymentStatus}
              membershipStatus={membershipStatus}
              employmentStatus={employmentStatus}
              colleges={colleges}
            />
          }
        />
        <Route
          path="/apply-for-loan/review-details"
          element={
            <ReviewDetails
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              selectedLoanTerm={selectedLoanTerm}
              loanTerm={loanTerm}
              selectedLoanType={selectedLoanType}
              selectedPaymentMethod={selectedPaymentMethod}
              name={name}
              address={address}
              contactNumber={contactNumber}
              selectedCollege={selectedCollege}
              selectedMembershipStatus={selectedMembershipStatus}
              selectedEmploymentStatus={selectedEmploymentStatus}
            />
          }
        />
        <Route
          path="/transactions"
          element={<Transactions transactionItemData={transactionItemData} />}
        />
        <Route
          path="/transactions/:id"
          element={<Transaction transactionItemData={transactionItemData} />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/edit-profile"
          element={
            <EditProfile
              name={name}
              setName={setName}
              address={address}
              setAddress={setAddress}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              email={email}
              setEmail={setEmail}
              selectedCollege={selectedCollege}
              setSelectedCollege={setSelectedCollege}
              selectedMembershipStatus={selectedMembershipStatus}
              setSelectedMembershipStatus={setSelectedMembershipStatus}
              selectedEmploymentStatus={selectedEmploymentStatus}
              setSelectedEmploymentStatus={setSelectedEmploymentStatus}
              membershipStatus={membershipStatus}
              employmentStatus={employmentStatus}
              colleges={colleges}
            />
          }
        />
        <Route path="/profile/settings" element={<Settings />} />
        <Route
          path="/profile/settings/change-password"
          element={<ChangePassword />}
        />
        <Route path="/profile/about-umempc-transact" element={<About />} />
        <Route path="/support-chat" element={<SupportChat />} />
        <Route
          path="/loan-calculator"
          element={
            <Calculator
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              selectedLoanTerm={selectedLoanTerm}
              setSelectedLoanTerm={setSelectedLoanTerm}
              selectedLoanType={selectedLoanType}
              setSelectedLoanType={setSelectedLoanType}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              loanTerms={loanTerms}
              loanTypes={loanTypes}
              paymentMethod={paymentMethod}
            />
          }
        />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/aging" element={<Aging agingData={agingData} />} />
        <Route
          path="/aging/:id"
          element={<AgingDetails agingData={agingData} />}
        />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/withdraw/:id" element={<WithdrawDetails />} />
      </Routes>
    </div>
  );
};

export default Homepage;
