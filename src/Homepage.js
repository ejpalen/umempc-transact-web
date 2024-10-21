import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Support from "./pages/Support";
import SupportChat from "./components/SupportChat";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ApplyForLoan from "./pages/ApplyForLoan";
import CheckEligibility from "./components/ApplyForLoan/CheckEligibility";
import LoanDetails from ".//components/ApplyForLoan/LoanDetails";
import PersonalDetails from ".//components/ApplyForLoan/PersonalDetails";
import ReviewDetails from ".//components/ApplyForLoan/ReviewDetails";
import Calculator from "./components/Features/Calculator";
import MyAccount from "./components/Features/MyAccount";
import MyAccountDetails from "./components/Features/MyAccountDetails";
import Transaction from "./components/Transactions/Transaction";
import EditProfile from "./components/Profile/EditProfile";
import Settings from "./components/Profile/Settings";
import ChangePassword from "./components/Profile/ChangePassword";
import About from "./components/Profile/About";

//Firebase
import { db } from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query as firestoreQuery,
  query,
  addDoc,
  where,
} from "firebase/firestore";

const Homepage = ({ memberPersonalDetails }) => {
  const [activeLink, setActiveLink] = useState(0);

  // Loan Details
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("5 months");
  const [loanTerm, setLoanTerm] = useState("5 months");
  const [selectedKindOfLoan, setSelectedKindOfLoan] = useState("Salary Loan");
  const [selectedLoanType, setSelectedLoanType] = useState("Prepaid Cash");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Salary Deduction");

  const loanTerms = [5, 6, 12, 18, 24, 36];

  const kindOfLoan = [
    "Salary Loan",
    "Benefits Loan",
    "Merchandise Loan",
    "Others",
  ];

  const loanTypes = ["Prepaid Cash", "Add-on Cash"];
  const paymentMethod = [
    "Salary Deduction",
    "Over-the-counter",
    "Post Dated Check",
  ];

  // Personal Details
  const [name, setName] = useState(memberPersonalDetails[0].member_name);
  const [address, setAddress] = useState(
    memberPersonalDetails[0].member_address
  );
  const [contactNumber, setContactNumber] = useState(
    memberPersonalDetails[0].member_contact_number
  );
  const [email, setEmail] = useState(memberPersonalDetails[0].member_email);
  const [selectedCollege, setSelectedCollege] = useState(
    memberPersonalDetails[0].member_college
  );
  const [selectedMembershipStatus, setSelectedMembershipStatus] = useState(
    memberPersonalDetails[0].member_membership_status
  );
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState(
    memberPersonalDetails[0].member_employment_status
  );

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

  const accountData = [
    {
      id: "111",
      type: "loan",
      //ledger data
      date: "01-Jan-24",
      reference: "LAMAYAN",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: null,
      gjNo: null,
      shareCapital: 36400.04,
      loans: 34043.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 31673.0,
      //aging data
      loanType: "Lamayan",
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
      date: "01-Jan-24",
      reference: "BEGINNING BALANCE",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: null,
      gjNo: null,
      shareCapital: 36400.04,
      loans: 34043.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 31673.0,
    },
    {
      id: "333",
      date: "13-Jan-24",
      reference: "PAYROLL",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10714",
      gjNo: "2024-01-003",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 33173.0,
    },
    {
      id: "444",
      date: "18-Jan-24",
      reference: "CASH ADVANCE PAYMENT",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10749",
      gjNo: "2024-01-005",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 31673.0,
    },
    {
      id: "555",
      date: "23-Jan-24",
      reference: "PAYROLL",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10793",
      gjNo: "2024-01-011",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 33173.0,
    },
    {
      id: "666",
      date: "25-Feb-24",
      reference: "CASH ADVANCE PAYMENT",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10714",
      gjNo: "2024-02-005",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 31673.0,
    },
    {
      id: "777",
      date: "28-Feb-24",
      reference: "PREPAID CASH LOAN",
      cvNo: "37862",
      checkNo: "298",
      loanTerms: "10",
      orNo: null,
      gjNo: null,
      shareCapital: 0.0,
      loans: 25000.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 56673.0,
    },
    {
      id: "888",
      date: "01-Mar-24",
      reference: "PAYROLL",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10855",
      gjNo: "2024-03-001",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 55173.0,
    },
    {
      id: "999",
      date: "13-Mar-24",
      reference: "CASH ADVANCE PAYMENT",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10911",
      gjNo: "2024-03-015",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 53673.0,
    },
    {
      id: "101010",
      date: "15-Apr-24",
      reference: "PAYROLL",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10958",
      gjNo: "2024-04-015",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 52173.0,
    },
    {
      id: "111111",
      date: "25-Apr-24",
      reference: "PAYROLL",
      cvNo: null,
      checkNo: null,
      loanTerms: null,
      orNo: "10998",
      gjNo: "2024-04-025",
      shareCapital: 100.0,
      loans: -1502.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 50673.0,
    },
    {
      id: "121212",
      date: "05-May-24",
      reference: "CASH ADVANCE PAYMENT",
      cvNo: "38210",
      checkNo: "422051",
      loanTerms: null,
      orNo: null,
      gjNo: null,
      shareCapital: 0.0,
      loans: 0.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 50673.0,
    },
    {
      id: "131313",
      date: "17-May-24",
      reference: "LAMAYAN - CESAR",
      cvNo: "38213",
      checkNo: "421178",
      loanTerms: null,
      orNo: null,
      gjNo: null,
      shareCapital: 0.0,
      loans: 0.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 50673.0,
    },
    {
      id: "141414",
      date: "20-Jun-24",
      reference: "PAYROLL",
      cvNo: "38233",
      checkNo: "422192",
      loanTerms: null,
      orNo: null,
      gjNo: null,
      shareCapital: 0.0,
      loans: 0.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 51849.0,
    },
    {
      id: "151515",
      date: "03-Jul-24",
      reference: "13TH & 14TH MONTH 2024",
      cvNo: "38233",
      checkNo: "422192",
      loanTerms: null,
      orNo: null,
      gjNo: "2024-06-025",
      shareCapital: 100.0,
      loans: 0.0,
      accounts: 0.0,
      interest: 0.0,
      loanBalance: 51849.0,
    },
  ];

  const [memberLoans, setMemberLoans] = useState([]);

  const loans_ref = collection(db, "applied_loans");
  const loans_query = firestoreQuery(
    loans_ref,
    where("loan_applicant_id", "==", memberPersonalDetails[0].member_id)
  );

  //Fetch cashiers from database
  useEffect(() => {
    const unsubscribe = onSnapshot(loans_query, (snapshot) => {
      const allData = snapshot.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setMemberLoans(allData);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

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
        <Route path="/apply-for-loan/check-eligibility" element={<CheckEligibility
         />} />
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
              selectedKindOfLoan={selectedKindOfLoan}
              setSelectedKindOfLoan={setSelectedKindOfLoan}
              kindOfLoan={kindOfLoan}
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
              selectedKindOfLoan={selectedKindOfLoan}
              selectedLoanType={selectedLoanType}
              selectedPaymentMethod={selectedPaymentMethod}
              name={name}
              address={address}
              contactNumber={contactNumber}
              selectedCollege={selectedCollege}
              selectedMembershipStatus={selectedMembershipStatus}
              selectedEmploymentStatus={selectedEmploymentStatus}
              memberPersonalDetails={memberPersonalDetails}
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

        <Route
          path="/profile"
          element={<Profile memberPersonalDetails={memberPersonalDetails} />}
        />
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
              memberPersonalDetails={memberPersonalDetails}
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
        <Route
          path="/my-account"
          element={<MyAccount accountData={accountData} />}
        />
        <Route
          path="/my-account/:id"
          element={<MyAccountDetails accountData={accountData} />}
        />
      </Routes>
    </div>
  );
};

export default Homepage;
