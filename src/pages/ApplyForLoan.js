import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loanScreenImage from "../assets/images/loan-screen.png";
// import loanScreenImage from "../assets/images/loan-screen.jpg"

const ApplyForLoan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  return (
    <div className="wrapper text-default flex flex-col justify-between gap-4 apply-for-loan-screen">
      <section className="p-4 header">
        <h2 className="text-2xl text-bold">Apply for Loan</h2>
      </section>
      <main className="px-4 flex-1 flex flex-col justify-center gap-6">
        <section className="flex flex-col justify-center items-center">
          <img src={loanScreenImage} className="h-48 mb-6" />
          <h2 className="text-2xl text-bold mb-2">Ready to Apply?</h2>
          <p className=" px-2 text-center opacity-75">
            Let's make your loan application quick and easy.
          </p>
        </section>
        <section className="flex flex-col justify-center items-center">
          <span
            onClick={() => navigate("/apply-for-loan/loan-details")}
            className={` text-white text-bold p-4 px-16 flex-1 text-center bg-primary rounded-full`}
          >
            Get Started
          </span>
        </section>
      </main>
    </div>
  );
};

export default ApplyForLoan;
