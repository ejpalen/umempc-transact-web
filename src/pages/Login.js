import { useNavigate } from "react-router-dom";

import UmempcLogo from "../assets/images/umempc-transact-logo.png";

const Login = () => {
  const navigate = useNavigate();

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  return (
    <div className="wrapper full-screen-100 gradient-bg-2 flex items-center justify-center">
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        <h2 className="text-3xl">Log in and let's start</h2>
        <section className="flex flex-col mt-4">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id=""
            className="w-full h-12"
          />
          <label htmlFor="email" className="text-sm mt-2">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id=""
            className="w-full h-12"
          />
          <span className="text-right text-sm opacity-75 mt-2">
            Forgot Password?
          </span>
        </section>
        <button
          onClick={() => navigate("/home")}
          className="h-12 mt-4 px-6 py-2 bg-white text-primary rounded-lg w-full text-xl text-bold"
        >
          Log in
        </button>
      </section>
    </div>
  );
};

export default Login;