import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";

const LoanDetails = ({
  loanAmount,
  setLoanAmount,
  selectedLoanTerm,
  setSelectedLoanTerm,
  selectedLoanType,
  setSelectedLoanType,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  loanTerms,
  loanTypes,
  paymentMethod,
  setLoanTerm,
}) => {
  const navigate = useNavigate();

  const [numberLoanTerm, setNumberLoanTerm] = useState(5);
  const [isLoanTermOthers, setIsLoanTermOthers] = useState(false);

  useEffect(() => {
    if (selectedLoanTerm === "Others") {
      setIsLoanTermOthers(true);
    } else {
      setIsLoanTermOthers(false);
    }
  }, [selectedLoanTerm]);

  useEffect(() => {
    setLoanTerm(`${numberLoanTerm} ${numberLoanTerm > 1 ? "months" : "month"}`);
  }, [numberLoanTerm]);

  return (
    <div className="wrapper text-default full-screen">
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-3 px-0 pt-0 z-10">
        <nav className="flex pt-3 pb-3 items-center px-4 gap-2 flex-col">
          <section className="flex gap-2 bg-pink-50 flex-1 w-full">
            <span className="h-1 flex-1 w-full bg-primary rounded-full">-</span>
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full">
              -
            </span>
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full">
              -
            </span>
          </section>
          <span
            onClick={() => navigate("/apply-for-loan/personal-details")}
            className={`text-white h-12 text-bold p-2 flex-1 text-center bg-primary w-full mb-2 rounded-lg`}
          >
            Next
          </span>
        </nav>
      </div>
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/apply-for-loan");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Loan Details</h2>
      </section>
      <main className=" flex-1 flex flex-col mt-14 container-with-label">
        <section className="flex flex-col gap-1">
          <section className="px-4 flex flex-col">
            <label className="mb-1" htmlFor="loanAmount">
              Loan Amount
            </label>
            <input
              type="tel"
              id="loanAmount"
              name="loanAmount"
              placeholder="Type amount here"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <label className="mb-1 mt-6" htmlFor="loanTerms">
              Loan Term
            </label>
            <select
              name="loanTerms"
              id="loanTerms"
              onChange={(e) => {
                setSelectedLoanTerm(e.target.value);
                setLoanTerm(e.target.value);
              }}
            >
              {loanTerms.map((term, index) => (
                <option key={index} value={term}>
                  {term}
                </option>
              ))}
            </select>
            {isLoanTermOthers && (
              <>
                <label className="mb-1 mt-6" htmlFor="specificLoanTerm">
                  Specific Loan Term (in months)
                </label>
                <input
                  type="tel"
                  id="specificLoanTerm"
                  name="specificLoanTerm"
                  placeholder="Type loan term here"
                  value={numberLoanTerm}
                  onChange={(e) => setNumberLoanTerm(e.target.value)}
                />
              </>
            )}
          </section>
          <section className="px-4 flex flex-col">
            <label className="mb-1 mt-6">Loan Type</label>
            <section className="flex flex-row gap-1">
              {loanTypes.map((type, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base rounded-lg py-1.5 px-6  text-center ${
                    selectedLoanType === type ? "button-1" : "button-2"
                  }`}
                  onClick={() => setSelectedLoanType(type)}
                >
                  {type}
                </span>
              ))}
            </section>
          </section>
          <section className=" flex flex-col">
            <label className="pl-4 mb-1 mt-6">Payment Method</label>
            <section className="flex flex-row gap-1 overflow-y-scroll pb-1.5 px-4">
              {paymentMethod.map((method, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base rounded-lg py-1.5 px-6 flex-1 text-center ${
                    selectedPaymentMethod === method ? "button-1" : "button-2"
                  }`}
                  onClick={() => setSelectedPaymentMethod(method)}
                >
                  {method}
                </span>
              ))}
            </section>
          </section>
        </section>
      </main>
    </div>
  );
};

export default LoanDetails;
