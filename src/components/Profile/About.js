import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import backIcon from "../../assets/images/back-icon.png";
import rightArrow2Icon from "../../assets/images/right-arrow-2-icon.png";
import changePasswordIcon from "../../assets/images/change-password-icon.png";
import tfaIcon from "../../assets/images/tfa-icon.png";

const About = () => {
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
          <h2 className="flex-1 text-center text-xl">About</h2>
        </section>
      <main className="px-4 mt-16">
        <h1 className="text-center text-2xl text-bold">UMEMPC Transact</h1>
      </main>
    </div>
  );
};



export default About;
