import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import defaultProfile from "../assets/images/profile-icon-active.png";
import editIcon from "../assets/images/edit-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";
import settingsIcon from "../assets/images/settings-icon.png";
import aboutIcon from "../assets/images/about-icon.png";
import logoutIcon from "../assets/images/logout-icon.png";

const Profile = ({ memberPersonalDetails, loanTotal }) => {
  const navigate = useNavigate();

  const settings = [
    {
      title: "Settings",
      icon: settingsIcon,
      to: "/profile/settings",
    },
    {
      title: "About UMEMPC Transact",
      icon: aboutIcon,
      to: "/profile/about-umempc-transact",
    },
    {
      title: "Logout",
      icon: logoutIcon,
      to: "/",
    },
  ];

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#6ED097";
  }, []);

  const [profileImage, setProfileImage] = useState(memberPersonalDetails && memberPersonalDetails[0].member_profile_image || defaultProfile);

  return (
    <div className="wrapper text-default">
      <div className=" flex gap-2 items-center justify-between p-4 pb-12 gradient-bg-4">
        <span className="text-white">
          <span className="flex gap-2 items-center">
            <h2 className="text-2xl text-bold">
              {memberPersonalDetails[0].member_name}
            </h2>
            <img
              src={editIcon}
              alt=""
              className="cursor-pointer h-9 p-2"
              onClick={() => navigate("../profile/edit-profile")}
            />
          </span>
          <p className="">{memberPersonalDetails[0].member_id}</p>
        </span>
        {/* <span className="profile-icon  bg-secondary rounded-full h-16 w-16 items-center flex relative">
          <h1 className="text-xl text-bold m-auto flex justify-center">E</h1>
        </span> */}
        <span>
          <img src={profileImage} alt="" className="h-12 w-12 object-cover rounded-full" />
        </span>
      </div>
      <main className="px-4 mt-4  relative top-[-3rem]">
        <section className="shadow-lg p-6 rounded-lg bg-white flex justify-between items-center mb-6">
          <span className="flex gap-2 justify-between flex-1">
            <p className=" opacity-50">Total Loans</p>
            <p className="text-bold">{loanTotal}</p>
          </span>
        </section>
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
        <img src={setting.icon} alt="" className="h-5" />
        <p className="">{setting.title}</p>
      </span>
      <img src={rightArrow2Icon} alt="" className="h-5" />
    </span>
  );
};

export default Profile;
