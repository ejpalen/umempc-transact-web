import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import backIcon from "../../assets/images/back-icon.png";
import checkIcon from "../../assets/images/check-icon.png";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  return (
    <div className="wrapper text-default full-screen-100">
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Change Password</h2>
      </section>
      <main className="px-4 mt-16">
        <section>
          <h1 className="text-2xl text-bold">Set a new and secure password</h1>
          <p className="opacity-75">
            Please enter your new and current password
          </p>
        </section>
        <section className="flex flex-col mt-6 container-with-label">
          <label htmlFor="password" className="text-sm mb-2">
            Current Password
          </label>
          <input
            placeholder="Current Password"
            type="password"
            name="password"
            id="password"
            className="w-full h-12"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label htmlFor="password" className="text-sm mt-6 mb-2">
            New Password
          </label>
          <input
            placeholder="New Password"
            type="password"
            name="new-password"
            id="new-password"
            className="w-full h-12"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <section className="mt-6 flex flex-col gap-2">
            <span className="flex gap-2 items-center">
              <img src={checkIcon} alt="" className="h-5" />
              <p>Minimum of alphanumeric characters</p>
            </span>
            <span className="flex gap-2 items-center">
              <img src={checkIcon} alt="" className="h-5" />
              <p>At least one upper case letter</p>
            </span>
            <span className="flex gap-2 items-center">
              <img
                src={checkIcon}
                alt=""
                className="h-5 opacity-25 brightness-0"
              />
              <p className="opacity-50">At least one lower case letter</p>
            </span>
            <span className="flex gap-2 items-center">
              <img
                src={checkIcon}
                alt=""
                className="h-5 opacity-25 brightness-0"
              />
              <p className="opacity-50">At least one number</p>
            </span>
            <span className="flex gap-2 items-center">
              <img
                src={checkIcon}
                alt=""
                className="h-5 opacity-25 brightness-0"
              />
              <p className="opacity-50">
                At least one special character <br></br>
                {"("}&, %, *, @, !, ?, #, $, +, -, =, {"<"}, {">"}, etc.{")"}
              </p>
            </span>
          </section>
          <label htmlFor="password" className="text-sm mt-6 mb-2">
            Re-enter New Password
          </label>
          <input
            placeholder="Re-enter New Password"
            type="password"
            name="new-password"
            id="new-password"
            className="w-full h-12"
            value={reEnterNewPassword}
            onChange={(e) => setReEnterNewPassword(e.target.value)}
          />
        </section>
        <section className="fixed bottom-4 right-4 left-4">
          <span
            onClick={() => navigate("/profile/settings")}
            className={`
            
                flex gap-4 items-center justify-center rounded-full mt-12 p-4 text-center w-full  bg-primary text-white text-bold`}
          >
            <p>Save</p>
          </span>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
