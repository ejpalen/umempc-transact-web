import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import confetti from "../../assets/images/confetti.png";
import sadFace from "../../assets/images/sad-face.png";

const CheckEligibility = ({ prediction, setPrediction }) => {
    const navigate = useNavigate();

    const [isEligible, setIsEligible] = useState(false);
    const [loadingEnded, setLoadingEnded] = useState(false);
    const [eligibilityFactors, setEligibilityFactors] = useState([]);

    const [formData, setFormData] = useState({
        Name: 'John Doe',
        Income: 55000,
        Age: 30,
        Shared_Capital: 12000,
        Loan_Balance: 18000,
        Loan_History: [
            {
                Loan_Amount: 10000,
                Loan_Term: '12 months',
                Loan_Type: 'Personal',
                Issued_Date: '2022-01-15',
                Next_Payment_Date: '2023-01-15',
                Repayment_Status: 'Paid',
                Due_Date: '2023-01-15',
                Overdue_Days: 0,
                Overdue_Amount: 0,
                Status: 'Closed'
            },
            {
                Loan_Amount: 15000,
                Loan_Term: '24 months',
                Loan_Type: 'Auto',
                Issued_Date: '2021-06-10',
                Next_Payment_Date: '2023-06-10',
                Repayment_Status: 'Paid',
                Due_Date: '2023-06-10',
                Overdue_Days: 0,
                Overdue_Amount: 0,
                Status: 'Closed'
            },
            {
                Loan_Amount: 20000,
                Loan_Term: '36 months',
                Loan_Type: 'Mortgage',
                Issued_Date: '2020-03-05',
                Next_Payment_Date: '2023-03-05',
                Repayment_Status: 'Defaulted',
                Due_Date: '2023-03-05',
                Overdue_Days: 30,
                Overdue_Amount: 500,
                Status: 'Defaulted'
            },
            {
                Loan_Amount: 5000,
                Loan_Term: '6 months',
                Loan_Type: 'Personal',
                Issued_Date: '2022-07-20',
                Next_Payment_Date: '2023-01-20',
                Repayment_Status: 'Paid',
                Due_Date: '2023-01-20',
                Overdue_Days: 0,
                Overdue_Amount: 0,
                Status: 'Closed'
            },
            {
                Loan_Amount: 12000,
                Loan_Term: '18 months',
                Loan_Type: 'Education',
                Issued_Date: '2021-11-25',
                Next_Payment_Date: '2023-05-25',
                Repayment_Status: 'Paid',
                Due_Date: '2023-05-25',
                Overdue_Days: 0,
                Overdue_Amount: 0,
                Status: 'Closed'
            }
        ]
    });

    const [combinedData, setCombinedData] = useState({
        Name: '',
        Income: 0,
        Age: 0,
        Shared_Capital: 0,
        Loan_Balance: 0,
        LoanAmount: 0,
        num_loans: 0,
        num_paid_loans: 0,
        num_defaulted_loans: 0,
        num_active_loans: 0,
    });

    // Effect to calculate loan statistics and combine with user data
    useEffect(() => {
        const totalLoanAmount = formData.Loan_History.reduce((sum, loan) => sum + loan.Loan_Amount, 0);
        const paidLoans = formData.Loan_History.filter(loan => loan.Repayment_Status === 'Paid').length;
        const defaultedLoans = formData.Loan_History.filter(loan => loan.Repayment_Status === 'Defaulted').length;
        const activeLoans = formData.Loan_History.filter(loan => loan.Repayment_Status === 'Active').length;
        const totalLoans = formData.Loan_History.length;

        // Update combinedData state with user data and loan statistics
        const updatedCombinedData = {
            Name: formData.Name,
            Income: formData.Income,
            Age: formData.Age,
            Shared_Capital: formData.Shared_Capital,
            Loan_Balance: formData.Loan_Balance,
            LoanAmount: totalLoanAmount,
            num_loans: totalLoans,
            num_paid_loans: paidLoans,
            num_defaulted_loans: defaultedLoans,
            num_active_loans: activeLoans,
        };

        setCombinedData(updatedCombinedData);
        postData(updatedCombinedData); // Call postData with updated combinedData
    }, [formData]);

    const postData = (data) => {
        console.log("User Input to be sent:", data); // Log the user input
        axios.post("http://localhost:8080/predict", data).then((response) => {
            setPrediction(response.data);

            if(response.data.eligibility === "Eligible"){
              setIsEligible(true);
            }else{
              setIsEligible(false);
            }

            sessionStorage.setItem("prediction", JSON.stringify(response.data));
            setLoadingEnded(true);
        }).catch((error) => {
            console.error("Error:", error.response ? error.response.data : error.message);
        });
    }

    useEffect(() => {
        // Simulate eligibility checks using setTimeout
        const factorCheckTimeouts = [
            setTimeout(() => setEligibilityFactors((prev) => [...prev, "Income Verification..."]), 500),
            setTimeout(() => setEligibilityFactors((prev) => [...prev, "Age..."]), 1000),
            setTimeout(() => setEligibilityFactors((prev) => [...prev, "Shared Capital..."]), 1500),
            setTimeout(() => setEligibilityFactors((prev) => [...prev, "Loan Balance..."]), 2000),
            setTimeout(() => setEligibilityFactors((prev) => [...prev, "Loan History..."]), 2500),
            setTimeout(() => {
                // Removed postData call from here
            }, 3500),
        ];
        return () => factorCheckTimeouts.forEach(clearTimeout); // Cleanup on unmount
    }, [formData]);

    return (
        <div className={`flex flex-col items-center justify-center h-screen z-40 absolute w-screen ${!loadingEnded ? 'bg-primary' : isEligible ? 'gradient-bg' : 'gradient-bg-5'}`}>
            {!loadingEnded ? (
                <div className="">
                    <h1 className="text-2xl text-bold mb-4 text-white">Checking Eligibility...</h1>
                    <ul className="text-white mb-4">
                        {eligibilityFactors.map((factor, index) => (
                            <li key={index} className="opacity-75 text-center">{factor}</li>
                        ))}
                    </ul>
                    <div role="status" className="flex flex-col items-center gap-2 fixed bottom-20 left-0 right-0">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-primary fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="text-white">Loading...</span>
                    </div>
                </div>
            ) : (
                isEligible ? (
                    <div className="flex flex-col items-center text-center p-8 text-white">
                        <img src={confetti} className="size-16 mb-4" />
                        <h2 className="text-2xl text-bold mb-4 ">Congratulations!</h2>
                        <p className="text-bold text-xl">
                            Your income, age, shared capital, loan balance, and loan history have successfully met the eligibility requirements.
                        </p>
                        <p className="opacity-75 mt-4">
                            Please continue to complete your application process by providing the required details.
                        </p>
                        <button className="button-2 bg-white text-primary mt-8 px-8 py-3 text-sm w-full" onClick={() => navigate("/apply-for-loan/loan-details")}>
                            Continue to Apply
                        </button>
                        <button className="button-3 border-white text-white px-8 py-3 text-sm w-full mt-2" onClick={() => { navigate("/home") }}>
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center p-8 text-white">
                        <img src={sadFace} className="size-16 mb-4" />
                        <h2 className="text-2xl text-bold mb-4 ">We're Sorry</h2>
                        <p className="text-bold text-xl">
                            Unfortunately, you are not eligible for a loan at this time.
                        </p>
                        <p className="opacity-75 mt-4">
                            This could be due to insufficient credit history or other financial factors.
                            You can review your eligibility criteria or contact our support for more details.
                        </p>
                        <div className="flex flex-col gap-2 mt-8 w-full">
                            <button className="button-2 bg-white text-[#E42F76] px-8 py-3 text-sm" onClick={() => { navigate("/support-chat") }}>
                                Contact Support
                            </button>
                            <button className="button-3 border-white text-white px-8 py-3 text-sm" onClick={() => { navigate("/home") }}>
                                Back to Home
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default CheckEligibility;
