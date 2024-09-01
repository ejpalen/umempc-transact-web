import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/feature-back-icon.png";

const Calculator = ({ loanTerms }) => {
  const navigate = useNavigate();

  const [calculatorLoanAmount, setCalculatorLoanAmount] = useState("");
  const [calculatorLoanTerm, setCalculatorLoanTerm] = useState("");
  const [calculatorSelectedLoanTerm, setCalculatorSelectedLoanTerm] =
    useState("");
  const [calculatorMonthlyIncome, setCalculatorMonthlyIncome] = useState("");
  const [calculatorMonthlyAmortization, setCalculatorMonthlyAmortization] =
    useState(10000);
  const [calculatorInterestRate, setCalculatorInterestRate] = useState(1);
  const [revealResult, setRevealResult] = useState(false);
  const [isReadyToCalculate, setIsReadyToCalculate] = useState(false);

  const [loanAmountError, setLoanAmountError] = useState(false);
  const [monthlyIncomeError, setMonthlyIncomeError] = useState(false);
  const [interestRateError, setInterestRateError] = useState(false);

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#198df9";
  }, []);

  const [numberLoanTerm, setNumberLoanTerm] = useState(5);
  const [isLoanTermOthers, setIsLoanTermOthers] = useState(false);

  useEffect(() => {
    if (calculatorSelectedLoanTerm === "Others") {
      setIsLoanTermOthers(true);
    } else {
      setIsLoanTermOthers(false);
    }
  }, [calculatorSelectedLoanTerm]);

  useEffect(() => {
    setCalculatorLoanTerm(
      `${numberLoanTerm} ${numberLoanTerm > 1 ? "months" : "month"}`
    );
  }, [numberLoanTerm]);

  useEffect(() => {
    const isLoanAmountValid =
      calculatorLoanAmount !== "" && calculatorLoanAmount >= 1000;
    const isMonthlyIncomeValid =
      calculatorMonthlyIncome !== "" && calculatorMonthlyIncome >= 1000;
    const isInterestValid =
      calculatorInterestRate !== "" && calculatorInterestRate > 0;

    setLoanAmountError(!isLoanAmountValid && calculatorLoanAmount !== "");
    setMonthlyIncomeError(
      !isMonthlyIncomeValid && calculatorMonthlyIncome !== ""
    );
    setInterestRateError(!isInterestValid && calculatorInterestRate !== "");

    if (isLoanAmountValid && isMonthlyIncomeValid && isInterestValid) {
      setIsReadyToCalculate(true);
    } else {
      setIsReadyToCalculate(false);
    }
  }, [calculatorLoanAmount, calculatorMonthlyIncome, calculatorInterestRate]);

  return (
    <div className="wrapper text-default full-screen">
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-3 px-0 pt-0 z-10">
        <nav className="flex pt-3 pb-3 items-center px-4 gap-2 flex-col">
          <span
            onClick={() => {
              isReadyToCalculate && setRevealResult(true);
            }}
            className={`${
              isReadyToCalculate ? "opacity-100" : "opacity-50"
            } text-white text-bold p-4 flex-1 text-center bg-primary w-full mb-2 rounded-full`}
          >
            Calculate
          </span>
        </nav>
      </div>
      <section className="header p-4 flex flex-col gradient-bg-3 h-32 gap-4 justify-center text-white">
        <section className="flex justify-start items-center gap-3">
          <img
            src={backIcon}
            alt=""
            className="h-8 p-1 cursor-pointer"
            onClick={() => {
              navigate("/home");
            }}
          />
          <h2 className="flex-1 text-3xl text-bold">Calculator</h2>
        </section>
        <span className="">Simplify your loan calculations</span>
      </section>
      <main className=" flex-1 flex flex-col mt-32 px-4">
        <section className="flex flex-col gap-1 mt-6">
          <section className="flex flex-col">
            <label className="mb-1" htmlFor="loanAmount">
              Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              min={1000}
              placeholder="Type amount here"
              value={calculatorLoanAmount}
              onChange={(e) => setCalculatorLoanAmount(e.target.value)}
            />
            {loanAmountError && (
              <p className="mt-1 text-red-600">
                Amount should not be less than ₱1000.00
              </p>
            )}
            <label className="mb-1 mt-6" htmlFor="loanTerms">
              Loan Term
            </label>
            <select
              name="loanTerms"
              id="loanTerms"
              onChange={(e) => {
                setCalculatorSelectedLoanTerm(e.target.value);
                setCalculatorLoanTerm(e.target.value);
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
            <label className="mb-1 mt-6" htmlFor="monthlyIncome">
              Monthly Income
            </label>
            <input
              type="number"
              min={1000}
              id="monthlyIncome"
              name="monthlyIncome"
              placeholder="Type income here"
              value={calculatorMonthlyIncome}
              onChange={(e) => setCalculatorMonthlyIncome(e.target.value)}
            />
            {monthlyIncomeError && (
              <p className="mt-1 text-red-600">
                Monthly income should not be less than ₱1000.00
              </p>
            )}
            <label className="mb-1 mt-6" htmlFor="monthlyIncome">
              Interest Rate
            </label>
            <input
              type="number"
              min={1000}
              id="monthlyIncome"
              name="monthlyIncome"
              placeholder="Type interest rate here"
              value={calculatorInterestRate}
              onChange={(e) => setCalculatorInterestRate(e.target.value)}
            />
            {interestRateError && (
              <p className="mt-1 text-red-600">Interest rate should not be 0</p>
            )}
          </section>
        </section>
        {revealResult && (
          <section className="gradient-bg mt-6 p-4 text-white rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="opacity-75">Monthly Payment</h2>
              <h1 className="text-4xl text-bold">
                ₱{calculatorMonthlyAmortization.toLocaleString()}
              </h1>
            </section>
            <section className="mt-6">
              <span className="py-1 flex justify-between gap-2 border-bottom-opacity-50">
                <p className="opacity-75">Total Principal Paid</p>
                <p>₱{(1000).toLocaleString()}</p>
              </span>
              <span className="py-1 flex justify-between gap-2">
                <p className="opacity-75">Total Interest Paid</p>
                <p>₱{(520).toLocaleString()}</p>
              </span>
            </section>
          </section>
        )}
      </main>
    </div>
  );
};

export default Calculator;
