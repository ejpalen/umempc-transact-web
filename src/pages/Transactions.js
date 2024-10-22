import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";

const Transactions = ({ loans }) => {
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
              className={`text-base p-2 flex-1 text-center ${
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
              {loans.map((item) => (
                <TransactionItem item={item} navigate={navigate} />
              ))}
            </div>
          </div>
          <div className="transaction-list-container">
            <h2 className="text-lg ">July</h2>
            <div className="transaction-list">
              {loans.map((item) => (
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

export default Transactions;
