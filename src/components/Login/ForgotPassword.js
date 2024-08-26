import { useNavigate } from "react-router-dom";
import { useState } from "react";

import UmempcLogo from "../../assets/images/umempc-transact-logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  return (
    <div className="wrapper full-screen-100 gradient-bg-2 flex items-center justify-center">
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        {!isContinueClicked ? (
          <>
            <h2 className="text-2xl">Enter your email address</h2>
            <p className="mt-1 opacity-75">
              Please make sure that you enter the email address associated with
              your UMEMPC Transact account
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl">Enter the 6-digit OTP</h2>
            <p className="mt-1 opacity-75">
              A One-Time-Password (OTP) was sent to ${forgotPasswordEmail} to
              verify your action.
            </p>
          </>
        )}
        <section className="flex flex-col mt-4">
          {!isContinueClicked ? (
            <>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id=""
                className="w-full h-12"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
            </>
          ) : (
            <>
              <label htmlFor="otp" className="text-sm">
                Email
              </label>
              <input
                placeholder="Email"
                type="text"
                name="otp"
                id="otp"
                className="w-full h-12"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
        </section>
        {!isContinueClicked ? (
          <button
            onClick={() => {
              setIsContinueClicked(true);
            }}
            className="h-12 mt-6 px-6 py-2 bg-white text-primary rounded-lg w-full text-bold"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => navigate("/renew-password")}
            className="h-12 mt-6 px-6 py-2 bg-white text-primary rounded-lg w-full text-bold"
          >
            Verify
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="button-secondary h-12 mt-2 px-6 py-2 text-white rounded-lg w-full text-bold"
        >
          Return to login
        </button>
      </section>
    </div>
  );
};

export default ForgotPassword;
