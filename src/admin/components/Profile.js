import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import profileIcon from "../../assets/images/admin-profile.jpg";

const Profile = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div className="">
    <img src={profileIcon} className="size-9 border-white border-2 rounded-full"/>
    </div>
  );
};

export default Profile;
