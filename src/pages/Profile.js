import { useNavigate } from "react-router-dom";

import editProfileIcon from "../assets/images/edit-profile-icon.png";
import rightArrow2Icon from "../assets/images/right-arrow-2-icon.png";
import settingsIcon from "../assets/images/settings-icon.png";
import aboutIcon from "../assets/images/about-icon.png";
import logoutIcon from "../assets/images/logout-icon.png";

const Profile = () => {
  const navigate = useNavigate();

  const settings = [
    {
      title: "Settings",
      icon: settingsIcon,
      to: "/",
    },
    {
      title: "About UMEMPC Transact",
      icon: aboutIcon,
      to: "/",
    },
    {
      title: "Logout",
      icon: logoutIcon,
      to: "/",
    },
  ];

  return (
    <div className="wrapper text-default">
      <div className=" flex gap-2 items-center justify-between p-4 py-8 gradient-bg">
        <span className="text-white">
          <h2 className="text-2xl text-bold">Edgar Palen</h2>
          <p className="text-xs">K11940758</p>
        </span>
        <span className="profile-icon  bg-secondary rounded-full h-16 w-16 items-center flex relative">
          <img src={editProfileIcon} alt="" />
          <h1 className="text-xl text-bold m-auto flex justify-center">E</h1>
        </span>
      </div>
      <main className="px-4 mt-4">
        {settings.map((setting, index) => (
          <SettingOption setting={setting} navigate={navigate} />
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

export default Profile;