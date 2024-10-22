import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import backIcon from "../../assets/images/back-icon.png";
import loanIcon from "../../assets/images/loan-transact-icon.png";

const Transaction = ({ loans }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  const [transactionItem, setTransactionItem] = useState({});

  useEffect(() => {
    const findTransactionItem = loans.find(
      (item) => item.id === id
    );

    setTransactionItem(findTransactionItem);
  }, [loans]);

  return (
    transactionItem && (
      <div className="wrapper text-default full-screen-100">
        <section className="header p-4 flex justify-between items-center gap-2">
          <img
            src={backIcon}
            alt=""
            className="h-6 p-1 cursor-pointer absolute"
            onClick={() => {
              navigate("/transactions");
            }}
          />
          <h2 className="flex-1 text-center text-xl">Transaction Details</h2>
        </section>
        <main className=" flex-1 flex flex-col mt-14 px-4">
          <section className="flex flex-col gap-1  items-center mt-6">
            <img src={loanIcon} alt="" className="h-14 w-14" />
            <h1 className="text-2xl text-bold mt-1">{transactionItem.loan_type}</h1>

            {/* <p className="opacity-75 ">Reference No. {transactionItem.id}</p> */}
          </section>
          <section className="bg-hoverBg p-4 rounded-lg mt-6">
            <span className="transaction-details-data">
              <p>Amount</p>
              <p>₱{Intl.NumberFormat().format(transactionItem.loanAmount)}</p>
            </span>
            <span className="transaction-details-data">
              <p>Status</p>
              <p>{transactionItem.loan_status}</p>
            </span>
            <span className="transaction-details-data">
              <p>Date</p>
              <p>
              {moment(transactionItem.issued_date.toDate()).format("DD MMMM YYYY")}</p>
            </span>
            <span className="transaction-details-data">
              <p>Time</p>
              <p>{moment(transactionItem.issued_date.toDate()).format('hh:mm A')}</p>
            </span>
          </section>
        </main>
      </div>
    )
  );
};

export default Transaction;
