import { Link } from "react-router-dom";
import { useEffect } from "react";


import profileIconActive from "../assets/images/profile-icon-active.png";

import logo from "../assets/images/umempc-logo.png";
import dropdownIcon from "../assets/images/drowdown-icon.png";

import dashboardIcon from "../assets/images/dashboard-icon.png";
import dashboardIconActive from "../assets/images/dashboard-icon-active.png";
import settingsIcon from "../assets/images/settings-and-configuration-icon.png";
import settingsIconActive from "../assets/images/settings-and-configuration-icon-active.png";
import memberManagementIcon from "../assets/images/member-management-icon.png";
import memberManagementIconActive from "../assets/images/member-management-icon-active.png";
import loanManagementIcon from "../assets/images/loan-management-icon.png";
import loanManagementIconActive from "../assets/images/loan-management-icon-active.png";
import reportAnalyticsIcon from "../assets/images/report-analytics-icon.png";
import reportAnalyticsIconActive from "../assets/images/report-analytics-icon-active.png";

const Nav = ({ activeLink, setActiveLink }) => {
  const links = [
    {
      path: "/admin/dashboard",
      text: "Dashboard",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Loan Management",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
    {
      path: "/admin/member-management",
      text: "Member Management",
      icon: memberManagementIcon,
      activeIcon: memberManagementIconActive,
    },
    {
      path: "/admin/report-and-analytics",
      text: "Report & Analytics",
      icon: reportAnalyticsIcon,
      activeIcon: reportAnalyticsIconActive,
    },
    {
      path: "/admin/settings-and-configurations",
      text: "Settings & Configurations",
      icon: settingsIcon,
      activeIcon: settingsIconActive,
    },
    
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    document.title = `${links[activeLink].text} - UMEMPC Transact`
 }, [links]);

  useEffect(() => {
    if (activeLink === 0 || activeLink === 4) {
      document.querySelector("meta[name='theme-color']").content = "#8788EF";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [activeLink]);

  return (
    // <div className="fixed bottom-0 left-0 p-4 bg-primary z-10 h-screen flex items-start justify-between flex-col">
      <div className=" min-w-max p-2 bg-white z-10 h-screen flex items-start justify-between flex-col shadow-md">
      <div>
      <section className="mx-auto mb-4 mt-2 w-full ">
      <img src={logo} className="h-10 w-auto scale-[80%]"/>
      </section>
      <nav className="flex flex-col gap-1">
        {links.map((link, index) => (
          <Link
            to={link.path}
            className={` admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index && "active bg-primary"
            }`}
            onClick={() => handleLinkClick(index)}
          >
              <img className="h-4"
                src={activeLink === index ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index ? "text-primary" : "text-white"}`}>{link.text}</span>
          </Link>
        ))}
      </nav>
      </div>
      {/* <div className="flex gap-2 bg-white rounded-full w-full px-4 py-2 items-center justify-between">
        <span className="flex gap-2 items-center">
        <img src={profileIconActive} className="size-4"/>
        <p className="text-primary">Admin</p>
        </span>
        <img src={dropdownIcon} className="size-4"/>
      </div> */}
    </div>
  );
};

export default Nav;