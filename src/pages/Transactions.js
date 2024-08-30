import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";

const Transactions = ({ transactionItemData }) => {
  const navigate = useNavigate();

  const dateFilters = ["This Week", "This Month", "This Year"];

  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="wrapper text-default">
      <section className="p-4">
        <h2 className="text-2xl text-bold">Transactions</h2>
      </section>
      <main className="px-4 pb-40">
        <section className="flex flex-row gap-1">
          {dateFilters.map((filter, index) => (
            <span
              key={index}
              className={`text-sm p-1.5 flex-1 text-center ${
                activeFilter === index ? "button-1" : "button-2"
              }`}
              onClick={() => setActiveFilter(index)}
            >
              {filter}
            </span>
          ))}
        </section>
        <div className="transaction-list-wrapper mt-4">
          <div className="transaction-list-container my-4">
            <h2 className="text-lg ">August</h2>
            <div className="transaction-list">
              {transactionItemData.map((item) => (
                <TransactionItem item={item} navigate={navigate} />
              ))}
            </div>
          </div>
          <div className="transaction-list-container">
            <h2 className="text-lg ">July</h2>
            <div className="transaction-list">
              {transactionItemData.map((item) => (
                <TransactionItem item={item} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const TransactionItem = ({ item, navigate }) => {
  return (
    <div
      className="transaction-list-item"
      onClick={() => navigate(`${item.id}`)}
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

export default Transactions;
