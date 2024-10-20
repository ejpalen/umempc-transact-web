import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//Firebase
import { db } from "../firebaseConfig";
import { getDocs, collection, where, query } from "@firebase/firestore";
import UmempcLogo from "../assets/images/umempc-transact-logo.png";

import { toast } from "react-toastify";

const Login = ({ setMemberPersonalDetails, memberPersonalDetails, prediction, setPrediction }) => {
  const navigate = useNavigate();

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  const [loginText, setLoginText] = useState("Log in");

  const [memberID, setMemberID] = useState("k11937320");
  const [password, setPassword] = useState("");

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

    // New state variable for combined user data and loan statistics
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
      setCombinedData({
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
      });
    }, [formData]);


  const login = async (e) => {
      

    const dbref = collection(db, "members");
    const getDetails = query(
      dbref,
      where("member_id", "==", `${memberID}`),
      where("member_password", "==", `${password}`)
    );
    try {
      const querySnapshot = await getDocs(getDetails);
      const allData = querySnapshot.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setMemberPersonalDetails(allData);

      if (allData.length >= 1) {
          // Construct the query string
          const queryString = new URLSearchParams(combinedData).toString();

          console.log("User Input to be sent:", combinedData); // Log the user input
          axios.post("http://localhost:8080/predict", combinedData).then((response) => {
            setPrediction(response.data);
            console.log("Prediction:", response.data);
              
        toast.success("Log in successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLoginText("Logging in...");
        navigate("/home");
        setLoginText("Log in");

      }).catch((error) => {
        console.error("Error:", error.response ? error.response.data : error.message);
    });
      
      


      } else {
        toast.error("Invalid Entry!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("error");
        setLoginText("Log in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper full-screen-100 gradient-bg-2 flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
      </section>
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        <h2 className="text-2xl">Log in and let's start</h2>
        <section className="flex flex-col mt-4 container-with-label">
          <label htmlFor="email" className="text-sm">
            Account ID
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id=""
            className="w-full h-12"
            value={memberID}
            onChange={(e) => setMemberID(e.target.value)}
          />
          <label htmlFor="email" className="text-sm mt-2">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id=""
            className="w-full h-12"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="text-right text-sm opacity-75 mt-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </section>
        <button
          onClick={login}
          className="h-12 mt-4 px-6 py-2 bg-white text-primary rounded-lg w-full text-bold"
        >
          {loginText}
        </button>
      </section>
    </div>
  );
};

export default Login;
