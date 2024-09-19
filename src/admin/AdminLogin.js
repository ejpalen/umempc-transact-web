import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebaseConfig";
import { getDocs, collection, where, query } from "@firebase/firestore";

import UmempcLogo from "../assets/images/umempc-transact-logo.png";

import { toast } from "react-toastify";

const AdminLogin = ({ setAdminPersonalDetails }) => {
  const navigate = useNavigate();

  document.querySelector("meta[name='theme-color']").content = "#0051FF";

  const [loginText, setLoginText] = useState("Log in");

  const [adminEmail, setAdminEmail] = useState("umempc_admin@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");

  const login = async () => {
    const dbref = collection(db, "admin");
    const getDetails = query(
      dbref,
      where("email", "==", `${adminEmail}`),
      where("password", "==", `${adminPassword}`)
    );
    try {
      const querySnapshot = await getDocs(getDetails);
      const allData = querySnapshot.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setAdminPersonalDetails(allData);

      if (allData.length >= 1) {
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
        setLoginText("Logging in...");
        navigate("/admin/dashboard/");
        setLoginText("Log in");
      } else {
        toast.error("Invalid Email or Password!", {
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
      <section className="login text-white w-full p-4">
        <img src={UmempcLogo} alt="" className="h-20 mb-4" />
        <h2 className="text-2xl">Log in to your admin account</h2>
        <section className="flex flex-col mt-4 container-with-label">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id=""
            className="w-full h-12"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
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
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
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

export default AdminLogin;
