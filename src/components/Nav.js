import { Link } from "react-router-dom";
import { useEffect } from "react";

import homeIcon from "../assets/images/home-icon.png";
import homeIconActive from "../assets/images/home-icon-active.png";
import supportIcon from "../assets/images/support-icon.png";
import supportIconActive from "../assets/images/support-icon-active.png";
import loanIcon from "../assets/images/loan-icon.png";
import loanIconActive from "../assets/images/loan-icon-active.png";
import historyIcon from "../assets/images/history-icon.png";
import historyIconActive from "../assets/images/history-icon-active.png";
import profileIcon from "../assets/images/profile-icon.png";
import profileIconActive from "../assets/images/profile-icon-active.png";

const Nav = ({ activeLink, setActiveLink }) => {
  const links = [
    {
      path: "/home",
      text: "Home",
      icon: homeIcon,
      activeIcon: homeIconActive,
    },
    {
      path: "/transactions",
      text: "Transactions",
      icon: historyIcon,
      activeIcon: historyIconActive,
    },
    {
      path: "/apply-for-loan",
      text: "Apply for Loan",
      icon: loanIcon,
      activeIcon: loanIconActive,
    },

    {
      path: "/support",
      text: "Messages",
      icon: supportIcon,
      activeIcon: supportIconActive,
    },
    {
      path: "/profile",
      text: "Profile",
      icon: profileIcon,
      activeIcon: profileIconActive,
    },
  ];

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    if (activeLink === 0 || activeLink === 4) {
      document.querySelector("meta[name='theme-color']").content = "#8788EF";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [activeLink]);

  return (
    <div className="nav-container fixed bottom-0 left-0 right-0 py-1 px-0 bg-white z-10 h-16 flex items-center">
      <nav className="flex justify-around flex-1">
        {links.map((link, index) => (
          <Link
            to={link.path}
            className={`nav-link ${index === -1 && "nav-link-loan"} ${
              activeLink === index && "active"
            }`}
            onClick={() => handleLinkClick(index)}
          >
            <div
              className={`${
                index === -1 &&
                "absolute top-[-20px] rounded-full bg-primary w-14 h-14 flex"
              }`}
            >
              <img
                src={activeLink === index ? link.activeIcon : link.icon}
                alt=""
              />
            </div>
            <span>{link.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
