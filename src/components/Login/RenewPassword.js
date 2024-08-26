import { useNavigate } from "react-router-dom";
import { useState } from "react";

import UmempcLogo from "../../assets/images/umempc-transact-logo.png";

const RenewPassword = () => {
  const navigate = useNavigate();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  return (
    <div className="wrapper full-screen-100 gradient-bg-2 flex items-center justify-center">
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        <h2 className="text-2xl">
          Let's set up a secure password for your account
        </h2>
        <section className="flex flex-col mt-4">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            className="w-full h-12"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-sm mt-2">
            Re-enter Password
          </label>
          <input
            placeholder="Re-enter Password"
            type="password"
            name="new-password"
            id="new-password"
            className="w-full h-12"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />
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
            onClick={() => navigate("/")}
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

export default RenewPassword;
