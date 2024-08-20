import calculatorIcon from "../assets/images/calculator-icon.png";
import ledgerIcon from "../assets/images/ledger-icon.png";
import agingIcon from "../assets/images/aging-icon.png";
import loanTransactIcon from "../assets/images/loan-transact-icon.png";
import transactionFeatureIcon from "../assets/images/transaction-feature-icon.png";
import allIcon from "../assets/images/all-feature-icon.png";
import rightArrowIcon from "../assets/images/right-arrow-icon.png";
import eyeActiveIcon from "../assets/images/eye-active-icon.png";

const Home = () => {
  return (
    <div className="wrapper">
      <section className="text-white p-4 pb-14 gradient-bg">
        <h2 className="text-xl">Hi Edgar,</h2>
        <p className="text-sm opacity-75">Good evening</p>
      </section>
      <main className=" relative top-[-3.5rem] p-4 mb-20 text-default">
        <section className="shadow-lg p-4 rounded-lg bg-white flex justify-between items-center">
          <span>
            <p className="text-sm opacity-50">Balance</p>
            <h1 className="text-2xl ">₱97,463.25</h1>
          </span>
          <img src={eyeActiveIcon} alt="" className="h-6" />
        </section>
        <section className="mt-6 flex gap-2 container">
          <div className="feature-link">
            <img src={calculatorIcon} alt="" />
            <p>Calculator</p>
          </div>
          <div className="feature-link">
            <img src={ledgerIcon} alt="" />
            <p>Ledger</p>
          </div>
          <div className="feature-link">
            <img src={agingIcon} alt="" />
            <p>Aging</p>
          </div>
          <div className="feature-link">
            <img src={transactionFeatureIcon} alt="" />
            <p>Transactions</p>
          </div>
          <div className="feature-link">
            <img src={allIcon} alt="" />
            <p>Other</p>
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-between gap-2 items-center">
            <h2 className="text-lg">Recent Transactions</h2>
            <span className="">
              <img src={rightArrowIcon} alt="" className="h-6" />
            </span>
          </div>
          <div className="transaction-list">
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
            <div className="transaction-list-item">
              <div className="transaction-list-item-left">
                <img src={loanTransactIcon} alt="" />
                <span>
                  <h3>Applied for Loan</h3>
                  <p>23 April 2024</p>
                </span>
              </div>
              <p>₱97,463.25</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
