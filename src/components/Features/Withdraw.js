import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/feature-back-icon.png";
import loanTransactIcon from "../../assets/images/loan-transact-icon.png";
import button4Icon from "../../assets/images/button-4-icon.png";

const Withdraw = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#198df9";
  }, []);

  const withdrawItemData = [
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
  ];

  return (
    <div className="wrapper text-default full-screen-100">
      <section className="header p-4 flex flex-col gradient-bg-3 h-32 gap-4 justify-center text-white">
        <section className="flex justify-start items-center gap-3">
          <img
            src={backIcon}
            alt=""
            className="h-7 p-1 cursor-pointer"
            onClick={() => {
              navigate("/home");
            }}
          />
          <h2 className="flex-1 text-2xl text-bold">Withdraw</h2>
        </section>
        <span className="">Approved Loans Available for Withdrawal</span>
      </section>
      <main className=" flex-1 flex flex-col mt-32 px-4">
        <h1 className="text-2xl text-bold mt-6">Pending</h1>
        <section className="flex flex-col gap-2 mt-4">
          {withdrawItemData.slice(0, 1).map((item) => (
            <WithdrawItem item={item} navigate={navigate} />
          ))}
        </section>
        <h1 className="text-2xl text-bold mt-6">Completed</h1>
        <section className="flex flex-col gap-2 mt-4">
          {withdrawItemData.map((item) => (
            <CompletedWithdrawItem item={item} navigate={navigate} />
          ))}
        </section>
      </main>
    </div>
  );
};

const WithdrawItem = ({ item, navigate }) => {
  return (
    <div
      className="withdraw-item flex justify-between gap-2 p-4 rounded-lg"
      onClick={() => navigate(`../withdraw/${item.id}`)}
    >
      <div className="flex gap-2">
        <img src={loanTransactIcon} alt="" className="h-8 w-8" />
        <div className="gap-2 flex flex-col">
          <span>
            <h3 className="opacity-80 t">{item.type}</h3>
            <p className="text-sm mt-2 opacity-70">{item.date}</p>
          </span>
          <span className="button-4">
            <p className="text-bold">Withdraw</p>
            <img src={button4Icon} alt="" />
          </span>
        </div>
      </div>
      <div className="">
        <p>{item.amount}</p>
      </div>
    </div>
  );
};

const CompletedWithdrawItem = ({ item, navigate }) => {
  return (
    <div
      className="withdraw-item flex justify-between gap-2 p-4 rounded-lg"
      onClick={() => navigate(`../transactions/${item.id}`)}
    >
      <div className="flex gap-2">
        <img src={loanTransactIcon} alt="" className="h-8 w-8" />
        <div className="gap-2 flex flex-col">
          <span>
            <h3 className="opacity-80 t">{item.type}</h3>
            <p className="text-sm mt-2 opacity-70">{item.date}</p>
          </span>
          <p className="text-sm text-[#39AD7F] mt-2">
            Withdrawn on 23 Aug 2024
          </p>
        </div>
      </div>
      <div className="">
        <p>{item.amount}</p>
      </div>
    </div>
  );
};

export default Withdraw;
