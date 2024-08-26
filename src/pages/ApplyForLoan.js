import { useNavigate } from "react-router-dom";
import loanScreenImage from "../assets/images/loan-screen.png"
// import loanScreenImage from "../assets/images/loan-screen.jpg"

const ApplyForLoan = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper full-screen text-default loan-screen flex flex-col justify-between gap-4">
      <section className="p-4 header">
        <h2 className="text-2xl text-bold">Apply for Loan</h2>
      </section>
      <main className="px-4 flex-1 flex flex-col">
        <section className="flex flex-col flex-1 justify-center items-center">
          <img src={loanScreenImage} className="h-48 mb-6" />
          <h2 className="text-2xl text-bold mb-4">Ready to Apply?</h2>
          <p className=" px-2 text-center opacity-75">Let's make your loan application quick and easy.</p>
        </section>
        <section className="flex flex-col justify-center items-center">
          
        <span 
        onClick={()=> navigate("/apply-for-loan/loan-details")}
        className={`text-xl text-white text-bold p-2 flex-1 text-center bg-primary w-full mb-4 rounded-lg`}>
              Get Started
            </span>
        </section>
      </main>
    </div>
  );
};

export default ApplyForLoan;
