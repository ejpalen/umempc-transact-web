import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";

const ReviewDetails = ({loanAmount,selectedLoanTerm, selectedLoanType,selectedPaymentMethod,name,address,contactNumber,selectedCollege, setSelectedCollege
    ,selectedMembershipStatus, setSelectedMembershipStatus,selectedEmploymentStatus, setSelectedEmploymentStatus}) => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);


const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };
  

  return (
    <div className="wrapper text-default">
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-3 px-0 pt-0 z-10">
        <nav className="flex pt-3 pb-3 items-center px-4 gap-2 flex-col">
        <section className="flex gap-2 bg-pink-50 flex-1 w-full">
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full">-</span>
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full">-</span>
            <span className="h-1 flex-1 w-full bg-primary rounded-full">-</span>
          </section>
        <span 

        onClick={()=> navigate(`${isChecked ? "/apply-for-loan/loan-details" : ""}`)}
        className={`${!isChecked && "opacity-50"} text-white text-xl text-bold p-2 flex-1 text-center bg-primary w-full mb-2 rounded-lg`}>
              Submit Application
            </span>
        </nav>
      </div>
      <section className="header p-4 flex justify-between items-center gap-2">
      <img
          src={backIcon}
          alt=""
          className="h-7 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/apply-for-loan/personal-details");
          }}
        />
        <h2 className="flex-1 text-center text-2xl text-bold">Review Details</h2>
        
      </section>
      <main className=" flex-1 flex flex-col mt-14 p-4 pt-0 mb-20">
      <h2 className="flex-1 text-xl text-bold">Loan Details</h2>
      <section className="mt-2 bg-hoverBg rounded-lg p-2">
        <label className="text-sm opacity-75">Loan Amount</label>
        <p className="text-bold">₱{loanAmount}</p>
        <label className="text-sm opacity-75">Loan Term</label>
        <p className="text-bold">{selectedLoanTerm}</p>
        <label className="text-sm opacity-75">Loan Type</label>
        <p className="text-bold">{selectedLoanType}</p>
        <label className="text-sm opacity-75">Payment Method</label>
        <p className="text-bold">{selectedPaymentMethod}</p>
      </section>

      <h2 className="flex-1 text-xl text-bold mt-6">Personal Details</h2>
      <section className="mt-2 bg-hoverBg rounded-lg p-2">
        <label className="text-sm opacity-75">Name</label>
        <p className="text-bold">{name}</p>
        <label className="text-sm opacity-75">Contact Number</label>
        <p className="text-bold">{contactNumber}</p>
        <label className="text-sm opacity-75">Address</label>
        <p className="text-bold">{address}</p>
        <label className="text-sm opacity-75">College</label>
        <p className="text-bold">{selectedCollege}</p>
        <label className="text-sm opacity-75">Membership Status</label>
        <p className="text-bold">{selectedMembershipStatus}</p>
        <label className="text-sm opacity-75">Employment Status</label>
        <p className="text-bold">{selectedEmploymentStatus}</p>
      </section>
      <span className="flex gap-2 mt-2 ">
      <input type="checkbox" required 
      id="confirmation"
      name="confirmation"
      checked={isChecked} 
      onChange={handleCheckboxChange} 
      />
        <label htmlFor="confirmation">I confirm that all the information provided is accurate and complete.</label>  
      
      </span>
      </main>
    </div>
  );
};

export default ReviewDetails;
