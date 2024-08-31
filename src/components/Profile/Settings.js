import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import backIcon from "../../assets/images/back-icon.png";
import rightArrow2Icon from "../../assets/images/right-arrow-2-icon.png";
import changePasswordIcon from "../../assets/images/change-password-icon.png";
import tfaIcon from "../../assets/images/tfa-icon.png";

const Settings = () => {
  const navigate = useNavigate();

  const settings = [
    {
      title: "Change Password",
      icon: changePasswordIcon,
      to: "/profile/settings",
    },
    {
      title: "Two Factor Authentication",
      icon: tfaIcon,
      to: "/about-umempc-transact",
    },
  ];

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
        <h2 className="flex-1 text-center text-xl">Settings</h2>
      </section>
      <main className="px-4 mt-14">
        {settings.map((setting, index) => (
          <SettingOption setting={setting} navigate={navigate} key={index} />
        ))}
      </main>
    </div>
  );
};

const SettingOption = ({ setting, navigate }) => {
  return (
    <span className="profile-option" onClick={() => navigate(setting.to)}>
      <span className=" flex gap-2 items-center ">
        <img src={setting.icon} alt="" className="h-4" />
        <p className="text-sm">{setting.title}</p>
      </span>
      <img src={rightArrow2Icon} alt="" className="h-4" />
    </span>
  );
};

export default Settings;
