import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

import Support from "./pages/Support";
import SupportChat from "./components/SupportChat";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ApplyForLoan from "./pages/ApplyForLoan";
import LoanDetails from ".//components/ApplyForLoan/LoanDetails";
import PersonalDetails from ".//components/ApplyForLoan/PersonalDetails";
import ReviewDetails from ".//components/ApplyForLoan/ReviewDetails";

const Homepage = () => {
  const [activeLink, setActiveLink] = useState(0);

  // Loan Details
  const [loanAmount, setLoanAmount] = useState("");  
  const [selectedLoanTerm, setSelectedLoanTerm] = useState("");  
  const [selectedLoanType, setSelectedLoanType] = useState("Prepaid Cash");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Salary Deduction");
  
    const loanTerms = ["5 months", "6 months", "12 months", "18 months", "24 months", "36 months", "Others"]
    const loanTypes = ["Prepaid Cash", "Add-on Cash"];
    const paymentMethod = ["Salary Deduction", "Over-the-counter", "Post Dated Check"];

    // Personal Details
    const [name, setName] = useState("Edgar Palen Jr.");  
    const [address, setAddress] = useState("JP Rizal Extension, West Rembo, 1644 City of Taguig, Metro Manila, Philippines");  
    const [contactNumber, setContactNumber] = useState("09178335355");  
    const [selectedCollege, setSelectedCollege] = useState("College of Computing and Information Sciences");  
    const [selectedMembershipStatus, setSelectedMembershipStatus] = useState("Regular");  
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState("Casual");  
  
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

    useEffect(() =>{
      console.log(name)
    }, [name])

  return (
    <div className="home">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <Routes>
        <Route
          path="/home"
          element={
            <Home activeLink={activeLink} setActiveLink={setActiveLink} />
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/apply-for-loan" element={<ApplyForLoan />} />
        <Route path="/apply-for-loan/loan-details" element={<LoanDetails
        loanAmount={loanAmount} setLoanAmount={setLoanAmount}
        selectedLoanTerm={selectedLoanTerm} setSelectedLoanTerm={setSelectedLoanTerm} selectedLoanType={selectedLoanType} setSelectedLoanType={setSelectedLoanType} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod}
        
        
        loanTerms={loanTerms} loanTypes={loanTypes} paymentMethod={paymentMethod}
        />} />
        <Route path="/apply-for-loan/personal-details" element={<PersonalDetails
        name={name} setName={setName} address={address} setAddress={setAddress} contactNumber={contactNumber} setContactNumber={setContactNumber} selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege}
        selectedMembershipStatus={selectedMembershipStatus} setSelectedMembershipStatus={setSelectedMembershipStatus} selectedEmploymentStatus={selectedEmploymentStatus} setSelectedEmploymentStatus={setSelectedEmploymentStatus}
        
        membershipStatus={membershipStatus} employmentStatus={employmentStatus} colleges={colleges}
        />} />
        <Route path="/apply-for-loan/review-details" element={<ReviewDetails
        loanAmount={loanAmount} setLoanAmount={setLoanAmount}
        selectedLoanTerm={selectedLoanTerm} setSelectedLoanTerm={setSelectedLoanTerm} selectedLoanType={selectedLoanType} setSelectedLoanType={setSelectedLoanType} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod}
        name={name} setName={setName} address={address} setAddress={setAddress} contactNumber={contactNumber} setContactNumber={setContactNumber} selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege}
        selectedMembershipStatus={selectedMembershipStatus} setSelectedMembershipStatus={setSelectedMembershipStatus} selectedEmploymentStatus={selectedEmploymentStatus} setSelectedEmploymentStatus={setSelectedEmploymentStatus}
        
      
        />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support-chat" element={<SupportChat />} />
      </Routes>
    </div>
  );
};

export default Homepage;
