import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//Firebase
import { db } from "../firebaseConfig";
import { getDocs, collection, where, query } from "@firebase/firestore";
import UmempcLogo from "../assets/images/umempc-transact-logo.png";

import { toast } from "react-toastify";

const Login = ({ setMemberPersonalDetails, setIsLoggedIn }) => {
  const navigate = useNavigate();

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  const [loginText, setLoginText] = useState("Log in");

  const [memberID, setMemberID] = useState("k11937320");
  const [password, setPassword] = useState("");

  const login = async (e) => {
      
    setLoginText("Logging in...");

    const dbref = collection(db, "members");
    const getDetails = query(
      dbref,
      where("member_id", "==", `${memberID}`),
      where("member_password", "==", `${password}`)
    );
    try {
      const querySnapshot = await getDocs(getDetails);
      const allData = querySnapshot.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      
      if (allData.length >= 1) {
        setIsLoggedIn(true);
        sessionStorage.setItem("memberPersonalDetails", JSON.stringify(allData));

        setMemberPersonalDetails(allData);
              
        toast.success("Log in successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/home");
        setLoginText("Log in");

      } else {
        toast.error("Invalid Entry!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("error");
        setLoginText("Log in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper full-screen-100 gradient-bg-2 flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
      </section>
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        <h2 className="text-2xl">Log in and let's start</h2>
        <section className="flex flex-col mt-4 container-with-label">
          <label htmlFor="email" className="text-sm">
            Account ID
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id=""
            className="w-full h-12"
            value={memberID}
            onChange={(e) => setMemberID(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="text-right text-sm opacity-75 mt-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </section>
        <button
          onClick={login}
          className="h-12 mt-4 px-6 py-2 bg-white text-primary rounded-lg w-full text-bold"
        >
          {loginText}
        </button>
      </section>
    </div>
  );
};

export default Login;
