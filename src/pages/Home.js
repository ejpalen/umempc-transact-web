import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import calculatorIcon from "../assets/images/calculator-icon.png";
import ledgerIcon from "../assets/images/ledger-icon.png";
import agingIcon from "../assets/images/aging-icon.png";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import transactionFeatureIcon from "../assets/images/transaction-feature-icon.png";
import allIcon from "../assets/images/all-feature-icon.png";
import allSettingsIcon from "../assets/images/all-settings-icon.png";
import allSupportIcon from "../assets/images/all-customer-service-icon.png";
import allApplyForLoanIcon from "../assets/images/all-apply-for-loan-icon.png";
import rightArrowIcon from "../assets/images/right-arrow-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";
import eyeActiveIcon from "../assets/images/eye-active-icon.png";
import loanAgainIcon from "../assets/images/loan-again-icon.png";

const Home = ({ setActiveLink, prediction,
  setLoanAmount,
  setLoanTerm,
  setSelectedLoanType,
  setSelectedKindOfLoan,
  setSelectedPaymentMethod,
  loans,
  loanTotalBalance,
  memberPersonalDetails,
  isLoggedIn

 }) => {
  const navigate = useNavigate();

  const [openAllFeature, setOpenAllFeature] = useState(false);

  useEffect(() => {
    if (openAllFeature) {
      document.querySelector("meta[name='theme-color']").content = "#6366A3";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#8788EF";
    }
  }, [openAllFeature]);

  const features = [
    {
      name: "Loan Calculator",
      image: calculatorIcon,
      link: "/loan-calculator",
    },
    {
      name: "My Account",
      image: ledgerIcon,
      link: "/my-account",
    },
    {
      name: "Chat Support",
      image: allSupportIcon,
      link: "/support-chat",
    },
    {
      name: "Apply For Loan",
      image: allApplyForLoanIcon,
      link: "/apply-for-loan",
    },
   
    {
      name: "Edit Profile",
      image: transactionFeatureIcon,
      link: "/profile/edit-profile",
    },
    {
      name: "Settings",
      image: allSettingsIcon,
      link: "/profile/settings",
    },
  ];

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (memberPersonalDetails && memberPersonalDetails.length > 0) {
      const fullName = memberPersonalDetails[0].member_name;
      const firstWord = fullName.split(' ')[0];
      setFirstName(firstWord);
    }
  }, [memberPersonalDetails]); 

  const currentHour = moment().hour();
  
  // Determine the greeting based on the current hour
  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }


  return (
    <div className="wrapper">
      <section>
        {openAllFeature && (
          <div className="modal">
            <div
              className="modal-overlay"
              onClick={() => {
                setOpenAllFeature(false);
              }}
            ></div>
            <div className="modal-content">
              <AllContent allFeatures={features} navigate={navigate} />
            </div>
          </div>
        )}
      </section>
      <section className="text-white p-4 pb-14 gradient-bg">
        <h2 className="text-2xl text-bold">Hi {firstName},</h2>
        <p className=" opacity-75">{greeting}</p>
      </section>
      <main className=" relative top-[-3.5rem] p-4 pb-20 text-default">
        <section className="shadow-lg p-4 rounded-lg bg-white flex justify-between items-center">
          <div className="flex-1 flex flex-col gap-2">
          <div  className="flex justify-between items-center pb-2">

          <span>
            <p className=" opacity-50">Balance</p>
            <h1 className="text-3xl text-bold">₱{Intl.NumberFormat().format(loanTotalBalance)}</h1>
          </span>
          <img src={eyeActiveIcon} alt="" className="h-7" />
          </div>
          <div  className="flex justify-between items-center pt-4 share-capital-text">
          <span>
            <p className=" opacity-50">Share Capital</p>
            <h1 className="text-3xl text-bold">₱{Intl.NumberFormat().format(memberPersonalDetails[0].shared_capital)}</h1>
          </span>
          <img src={eyeActiveIcon} alt="" className="h-7" />
          </div>
          </div>
          
        </section>
        <section className="mt-8 flex gap-2 w-full">
          {features.slice(0, 3).map((feature) => (
            <div
              className="feature-link cursor-pointer"
              onClick={() => navigate(`${feature.link}`)}
            >
              <img src={feature.image} alt="" />
              <p className="text-center">{feature.name}</p>
            </div>
          ))}
          <div className="feature-link cursor-pointer" onClick={() => setOpenAllFeature(true)}>
            <img src={allIcon} alt="" />
            <p>All</p>
          </div>
        </section>
        <section className="mt-8">
          <div className="flex justify-between gap-2 items-center mb-2">
            <h2 className="text-xl ">Recent Transactions</h2>
            <span className="">
              <p
                className="button-2 text-sm"
                onClick={() => {
                  setActiveLink(1);
                  navigate("/transactions");
                }}
              >
                View All
              </p>
            </span>
          </div>
          <div className="transaction-list">
            {loans.slice(0, 5).map((item) => (
              <TransactionItem item={item} navigate={navigate} prediction={prediction} />
            ))}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl mb-2">Loan Again</h2>
          <section className="flex gap-2 overflow-x-scroll w-full pb-2">
            {loans.slice(0, 5).map((item) => (
              <LoanAgainItem item={item} navigate={navigate} prediction={prediction}
              setLoanAmount={setLoanAmount}
              setLoanTerm={setLoanTerm}
              setSelectedLoanType={setSelectedLoanType}
              setSelectedKindOfLoan={setSelectedKindOfLoan}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
               />
            ))}
          </section>
        </section>
      </main>
    </div>
  );
};

const TransactionItem = ({ item, navigate }) => {
  return (
    <div
      className="transaction-list-item cursor-pointer"
      onClick={() => navigate(`../transactions/${item.id}`)}
    >
      <div className="transaction-list-item-left">
        <img src={loanTransactIcon} alt="" />
        <span>
          <h3>{item.loan_type}</h3>
          <p>{moment(item.date).format("DD MMMM YYYY")}</p>
        </span>
      </div>
      <div className="transaction-list-item-right flex items-center gap-3">
        <p>₱{Intl.NumberFormat().format(item.loanAmount)}</p>
        <img src={rightArrow2Icon} alt="" />
      </div>
    </div>
  );
};

const LoanAgainItem = ({ item, navigate, prediction,setLoanAmount, setLoanTerm, setSelectedLoanType, setSelectedKindOfLoan, setSelectedPaymentMethod }) => {

  const [loanNavigation, setLoanNavigation] = useState('/apply-for-loan/check-eligibility');
  
  useEffect(() => {
    if( prediction !== null){
      setLoanNavigation('/apply-for-loan/loan-details');
    }else{
      setLoanNavigation('/apply-for-loan/check-eligibility');
    }
  }, [prediction]);

  return (
    <div className="loan-again-item rounded-2xl flex justify-between items-end w-max flex-none cursor-pointer"
    onClick={() => {
              navigate(`${loanNavigation}`);
              setLoanAmount(item.loanAmount)
  setLoanTerm(item.loan_term)
  setSelectedLoanType(item.loan_type)
  setSelectedKindOfLoan(item.kind_of_loan)
  setSelectedPaymentMethod(item.payment_method)
            }}
    >
      <div className=" p-4 pr-8 pb-8  flex flex-col w-max">
        <h1 className=" text-bold">₱{Intl.NumberFormat().format(item.loanAmount)}</h1>
        <span className="flex gap-2 flex-1 w-max opacity-75">
          <p className="text-sm">{item.loan_type}</p>
          <p className="text-sm">•</p>
          <p className="text-sm">{item.loan_term} months</p>
        </span>
      </div>
      <img src={loanAgainIcon} alt="" className="w-12 h-12" />
    </div>
  );
};

const AllContent = ({ allFeatures, navigate }) => {
  return (
    <div className="pb-8 pt-4">
      <h1 className="text-xl text-bold">Features</h1>
      <section className="grid grid-cols-4 gap-4 mt-6">
        {allFeatures.slice(0, 4).map((feature) => (
          <div
            className="feature-link"
            onClick={() => {
              navigate(`${'/apply-for-loan/loan-details'}`)
            }}
          >
            <img src={feature.image} alt="" />
            <p>{feature.name}</p>
          </div>
        ))}
      </section>
      <h1 className="text-xl text-bold mt-8">Actions</h1>
      <section className="grid grid-cols-4 gap-4 mt-6">
        {allFeatures.slice(4, 8).map((feature) => (
          <div
            className="feature-link"
            onClick={() => {
              navigate(`${feature.link}`)

            }}
          >
            <img src={feature.image} alt="" />
            <p>{feature.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
