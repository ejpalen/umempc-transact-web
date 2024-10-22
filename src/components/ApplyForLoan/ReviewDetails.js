import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import backIcon from "../../assets/images/back-icon.png";
import homeIcon from "../../assets/images/home-icon.png";
import { db } from "../../firebaseConfig"; 

const ReviewDetails = ({
  loanAmount,
  loanTerm,
  selectedLoanType,
  selectedPaymentMethod,
  name,
  address,
  contactNumber,
  selectedCollege,
  selectedMembershipStatus,
  selectedEmploymentStatus,
  selectedKindOfLoan,
  memberPersonalDetails,
  setLoanAmount,
        setLoanTerm,
        setSelectedLoanType,
        setSelectedPaymentMethod,
        setSelectedKindOfLoan
}) => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const addLoan = async (e) => {

    const currentDate = new Date();

    try {
      const formData = {
        loanAmount: parseFloat(loanAmount),
        loan_term: parseInt(loanTerm),
        loan_type: selectedLoanType,
        payment_method: selectedPaymentMethod,
        kind_of_loan: selectedKindOfLoan,
        issued_date: currentDate,
        loan_applicant_id: memberPersonalDetails[0].id,
       loan_applicant: {
        name: name,
        address: address,
        contactNumber: contactNumber,
        selectedCollege: selectedCollege,
        selectedMembershipStatus: selectedMembershipStatus,
        selectedEmploymentStatus: selectedEmploymentStatus,
       },
      };
      // Add the form data to Firestore
      await addDoc(collection(db, "loans"), formData);

      setIsSubmitClicked(true); // Set submit clicked to true to show confirmation

    } catch (error) {
      console.error("Error adding loan:", error);
    }
  };

  const resetForm = () => {
    setLoanAmount("");
    setLoanTerm("5 months"); 
    setSelectedLoanType("Prepaid Cash");
    setSelectedPaymentMethod("Salary Deduction"); 
    setSelectedKindOfLoan("Salary Loan");
    setIsChecked(false); // Reset checkbox
  };

  return (
    <div className="wrapper text-default">
      {isSubmitClicked && (
        <WithdrawConfirmation
          loanAmount={loanAmount}
          name={name}
          navigate={navigate}
          resetForm={resetForm}
        />
      )}
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-4 px-0 pt-0 z-10">
        <nav className="flex pt-3 items-center px-4 gap-2 flex-col">
          <section className="flex gap-2 bg-pink-50 flex-1 w-full">
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full"></span>
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full"></span>
            <span className="h-1 flex-1 w-full bg-primary rounded-full"></span>
          </section>
          <span
            onClick={addLoan} 
            className={`${
              !isChecked && "opacity-50"
            } text-white text-bold p-4 flex-1 text-center bg-primary w-full rounded-full`}
          >
            Submit Application
          </span>
        </nav>
      </div>
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/apply-for-loan/personal-details");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Review Details</h2>
      </section>
      <main className="flex-1 flex flex-col mt-20 p-4 pt-0 pb-40">
        <h2 className="flex-1 text-bold">Loan Details</h2>
        <section className="mt-1 bg-hoverBg rounded-lg p-2">
          <label className="text-sm opacity-75">Loan Amount</label>
          <p className="">₱{loanAmount}</p>
          <label className="text-sm opacity-75">Loan Term</label>
          <p className="">{loanTerm} months</p>
          <label className="text-sm opacity-75">Loan Type</label>
          <p className="">{selectedLoanType}</p>
          <label className="text-sm opacity-75">Kind of Loan</label>
          <p className="">{selectedKindOfLoan}</p>
          <label className="text-sm opacity-75">Payment Method</label>
          <p className="">{selectedPaymentMethod}</p>
        </section>

        <h2 className="flex-1 mt-6 text-bold">Personal Details</h2>
        <section className="mt-1 bg-hoverBg rounded-lg p-2">
          <label className="text-sm opacity-75">Name</label>
          <p className="">{name}</p>
          <label className="text-sm opacity-75">Contact Number</label>
          <p className="">{contactNumber}</p>
          <label className="text-sm opacity-75">Address</label>
          <p className="">{address}</p>
          <label className="text-sm opacity-75">College</label>
          <p className="">{selectedCollege}</p>
          <label className="text-sm opacity-75">Membership Status</label>
          <p className="">{selectedMembershipStatus}</p>
          <label className="text-sm opacity-75">Employment Status</label>
          <p className="">{selectedEmploymentStatus}</p>
        </section>
        <span className="flex gap-2 mt-2">
          <input
            type="checkbox"
            required
            id="confirmation"
            name="confirmation"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="confirmation">
            I confirm that all the information provided is accurate and complete.
          </label>
        </span>
      </main>
    </div>
  );
};

const WithdrawConfirmation = ({ loanAmount, name, navigate, resetForm }) => {
  return (
    <div className="gradient-bg-2 h-full w-[100vw] absolute top-0 right-0 left-0 z-30 text-white flex">
      <section className="flex-1 flex justify-center items-center flex-col px-4">
        <section className="">
          <h1 className="text-2xl text-center">
            Your loan application was submitted.
          </h1>
        </section>
        <section className="bg-hoverBg bg-opacity-10 p-4 rounded-lg mt-12 w-full">
          <span className="transaction-details-data">
            <p>Amount</p>
            <p>₱{loanAmount}</p>
          </span>
          <span className="transaction-details-data">
            <p>Name</p>
            <p>{name}</p>
          </span>
        </section>
        <section className="bg-white text-primary p-4 rounded-lg mt-6 w-full text-center">
          <span>Expect approval notification within 24 hours.</span>
        </section>
        <section className="fixed bottom-4 right-4 left-4">
          <span
            onClick={() => {
              navigate("/home")
              resetForm()
            }}
            className={`cursor-pointer flex gap-4 items-center justify-center rounded-full mt-12 text-center w-full text-white text-bold`}
          >
            <img
              src={homeIcon}
              alt=""
              className="h-4 w-4 invert brightness-0"
            />
            <p>Back to Home</p>
          </span>
        </section>
      </section>
    </div>
  );
};

export default ReviewDetails;
