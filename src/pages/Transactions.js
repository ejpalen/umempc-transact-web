import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";

const Transactions = ({ loans }) => {
  const navigate = useNavigate();
  const dateFilters = ["This Week", "This Month", "This Year"];
  const [activeFilter, setActiveFilter] = useState(dateFilters[0]); // Default to "This Week"

  // Function to filter loans based on the selected date filter
  const filterLoans = (filter) => {
    const now = moment();
    switch (filter) {
      case "This Week":
        return loans.filter(loan => moment(loan.date).isSame(now, 'week'));
      case "This Month":
        return loans.filter(loan => moment(loan.date).isSame(now, 'month'));
      case "This Year":
        return loans.filter(loan => moment(loan.date).isSame(now, 'year'));
      default:
        return loans;
    }
  };

  // Function to group loans by month for "This Year"
  const groupLoansByMonth = (loans) => {
    const grouped = {};
    loans.forEach(loan => {
      const month = moment(loan.date).format('MMMM'); // Get the month name
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(loan);
    });
    return grouped;
  };

  // Get filtered loans based on the active filter
  const filteredLoans = filterLoans(activeFilter);
  const groupedLoans = activeFilter === "This Year" ? groupLoansByMonth(filteredLoans) : null;

  return (
    <div className="wrapper text-default">
      <section className="p-4">
        <h2 className="text-2xl text-bold">Transactions</h2>
        <section className="flex flex-row gap-1 mt-4">
          {dateFilters.map((filter, index) => (
            <span
              key={index}
              className={`text-base p-2 flex-1 text-center ${activeFilter === filter ? "button-1" : "button-2"}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </span>
          ))}
        </section>
      </section>
      <main className="px-4 pb-40">
        {activeFilter === "This Year" ? (
          Object.keys(groupedLoans).map(month => (
            <div key={month} className="transaction-list-container">
              <h2 className="text-lg">{month}</h2>
              <div className="transaction-list">
                {groupedLoans[month].map(loan => (
                  <TransactionItem key={loan.id} item={loan} navigate={navigate} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="transaction-list">
            {filteredLoans.map(loan => (
              <TransactionItem key={loan.id} item={loan} navigate={navigate} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const TransactionItem = ({ item, navigate }) => {
  return (
    <div className="transaction-list-item" onClick={() => navigate(`${item.id}`)}>
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
