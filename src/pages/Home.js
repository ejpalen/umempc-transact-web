import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import calculatorIcon from "../assets/images/calculator-icon.png";
import ledgerIcon from "../assets/images/ledger-icon.png";
import agingIcon from "../assets/images/aging-icon.png";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import transactionFeatureIcon from "../assets/images/transaction-feature-icon.png";
import allIcon from "../assets/images/all-feature-icon.png";
import rightArrowIcon from "../assets/images/right-arrow-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";
import eyeActiveIcon from "../assets/images/eye-active-icon.png";

const Home = ({ setActiveLink, transactionItemData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#8788EF";
  }, []);

  const features = [
    {
      name: "Calculator",
      image: calculatorIcon,
      link: "/loan-calculator",
    },
    {
      name: "Ledger",
      image: ledgerIcon,
      link: "/ledger",
    },
    {
      name: "Aging",
      image: agingIcon,
      link: "/aging",
    },
    {
      name: "Withdraw",
      image: transactionFeatureIcon,
      link: "/withdraw",
    },
  ];

  return (
    <div className="wrapper">
      <section className="text-white p-4 pb-14 gradient-bg">
        <h2 className="text-xl text-bold">Hi Edgar,</h2>
        <p className="text-sm opacity-75">Good evening</p>
      </section>
      <main className=" relative top-[-3.5rem] p-4 pb-20 text-default">
        <section className="shadow-lg p-4 rounded-lg bg-white flex justify-between items-center">
          <span>
            <p className="text-sm opacity-50">Balance</p>
            <h1 className="text-2xl text-bold">₱97,463.25</h1>
          </span>
          <img src={eyeActiveIcon} alt="" className="h-6" />
        </section>
        <section className="mt-6 flex gap-2 container">
          {features.map((feature) => (
            <div
              className="feature-link"
              onClick={() => navigate(`${feature.link}`)}
            >
              <img src={feature.image} alt="" />
              <p>{feature.name}</p>
            </div>
          ))}
          <div className="feature-link">
            <img src={allIcon} alt="" />
            <p>All</p>
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-between gap-2 items-center">
            <h2 className="text-lg ">Recent Transactions</h2>
            <span className="">
              <p
                className="button-2"
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
            {transactionItemData.map((item) => (
              <TransactionItem item={item} navigate={navigate} />
            ))}
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-lg ">Quick Links</h2>
        </section>
      </main>
    </div>
  );
};

const TransactionItem = ({ item, navigate }) => {
  return (
    <div
      className="transaction-list-item"
      onClick={() => navigate(`../transactions/${item.id}`)}
    >
      <div className="transaction-list-item-left">
        <img src={loanTransactIcon} alt="" />
        <span>
          <h3>Applied for Loan</h3>
          <p>{item.date}</p>
        </span>
      </div>
      <div className="transaction-list-item-right flex items-center gap-3">
        <p>{item.amount}</p>
        <img src={rightArrow2Icon} alt="" />
      </div>
    </div>
  );
};

export default Home;
