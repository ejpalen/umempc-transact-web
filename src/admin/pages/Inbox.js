import { useEffect, useState, useRef } from "react";

import Profile from "../components/Profile.js";

import searchIcon from "../../assets/images/search-icon.png";
import profile from "../../assets/images/admin-profile.jpg";
import closeIcon from "../../assets/images/close-icon.png";
import readIcon from "../../assets/images/read-icon.png";
import contactIcon from "../../assets/images/contact-icon.png";
import deleteIcon from "../../assets/images/remove-icon.png";
import dateJoinedIcon from "../../assets/images/date-joined-icon.png";
import loanAmountIcon from "../../assets/images/loan-amount-icon.png";

import sendIcon from "../../assets/images/send-icon.png";
import sendActiveIcon from "../../assets/images/send-active-icon.png";

const Inbox = () => {
  const chatWrapperRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom on component mount
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Empty dependency array means it runs once, on mount

  const [isProfileOpen, setIsProfileOpen] = useState(true);

    const [message, setMessage] = useState("");
    

    const chats = [
        {
          message: "This is the user",
          user: "user",
          time: "06:11 pm",
        },
        {
          message: "This is the admin",
          user: "admin",
          time: "06:12 pm",
        },
        {
          message: "Hello po kamusta kau?",
          user: "user",
          time: "06:13 pm",
        },
        {
          message: "e2 pu oke lang hehe",
          user: "admin",
          time: "06:14 pm",
        },
        {
          message: "r u true?",
          user: "user",
          time: "06:14 pm",
        },
        {
          message: "yes am a true stone",
          user: "admin",
          time: "06:14 pm",
        },
        {
          message: "mweheheheheh goods",
          user: "user",
          time: "06:15 pm",
        },
        {
          message: "omsssss",
          user: "admin",
          time: "06:17 pm",
        },
        {
          message: "mweheheheheh goods",
          user: "user",
          time: "06:15 pm",
        },
        {
            message: "This is the admin",
            user: "admin",
            time: "06:12 pm",
          },
          {
            message: "Hello po kamusta kau?",
            user: "user",
            time: "06:13 pm",
          },
          {
            message: "e2 pu oke lang hehe",
            user: "admin",
            time: "06:14 pm",
          },
          {
            message: "r u true?",
            user: "user",
            time: "06:14 pm",
          },
          {
            message: "This is the admin",
            user: "admin",
            time: "06:12 pm",
          },
          {
            message: "Hello po kamusta kau?",
            user: "user",
            time: "06:13 pm",
          },
          {
            message: "e2 pu oke lang hehe",
            user: "admin",
            time: "06:14 pm",
          },
          {
            message: "r u true?",
            user: "user",
            time: "06:14 pm",
          },
      ];

  return (
    <div className="dashboard flex gap-5">
        <div className=" flex-1 ">
        <section className="flex gap-2 items-start justify-between ">
        <span>
          <h1 className="text-2xl text-bold">Inbox</h1>
          <p className="opacity-75">
          Respond to messages
          </p>
        </span>
        <Profile/>
        </section>
        <main className="inbox-main mt-10 bg-white rounded-lg">

          <div className="flex h-full">
          <section className="flex-0.5 border-right">
            <div className="p-4 flex-none">
          <span className="search-container flex gap-1 items-center overflow-hidden">
              <img src={searchIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search"
              />
            </span>
          </div>
          <span className="mx-4 mt-0 flex gap-2 items-center bg-hoverBg w-fit py-1 px-2 rounded-sm text-sm">
          <img src={readIcon} alt="" className="size-4" />
          <p>Unread</p>
          </span>
          <div className="mt-4">
          <div className="p-4 flex gap-2 items-center gap-2 w-72 bg-hoverBg">
          <img src={profile} className="size-12 rounded-full"/>
   <div className="flex gap-2 items-start gap-8 justify-between flex-1">
   <span className="">
    <h2 className="text-sm">Nomar Maestro</h2>
    <p className="text-sm opacity-75">Hehehehehe</p>
    </span>
    <p className="text-sm opacity-75">2:56 AM</p>
    </div>
    </div>
          </div>
            </section>
            <section className="flex flex-col  relative flex-1 justify-between overflow-hidden">
            <div className="rounded-lg flex-none w-full bg-white p-4 flex gap-2 items-start gap-8 justify-between flex-1 border-bottom items-center">
   <span className="flex gap-2 items-center">
   <img src={profile} className="size-12 rounded-full"/>
    <h2 className="text-bold">Nomar Maestro</h2>
    </span>
 <div className="flex gap-2">
 <span className="search-container flex gap-1 items-center overflow-hidden cursor-pointer">
              <img src={deleteIcon} alt="" className="size-4" />
            </span>
    <span className={`search-container flex gap-2 items-center overflow-hidden cursor-pointer ${isProfileOpen && "hidden"}`}
    onClick={() => setIsProfileOpen(true)}
    >
              <img src={contactIcon} alt="" className="size-5" />
             <p className="text-sm">See Member</p>
            </span>
 </div>
    </div> <div ref={chatWrapperRef} className=" chat-wrapper flex flex-col  gap-1 p-4 overflow-y-scroll">
            <span className="text-center text-sm">August 21</span>
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`chat-message flex  flex-1 ${
                  chat.user !== "user" && "items-end justify-end"
                }`}
              >
                <span
                  className={`w-fit flex gap-0 flex-col items-end  ${
                    chat.user !== "user" ? "chat-user" : "chat-admin"
                  }`}
                >
                  <p className="text-base">{chat.message}</p>
                  <p className="text-xs opacity-50">{chat.time}</p>
                </span>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
        <nav className="rounded-lg flex flex-none justify-around items-center px-4 gap-2 bg-white w-full h-16 ">
          <textarea
            type="text"
            className="flex-1"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img
            src={message !== "" ? sendActiveIcon : sendIcon}
            alt=""
            className="h-[35px]"
          />
        </nav>
            </section>
            
          </div>
        </main>
        </div>
        <section className={`inbox-profile flex-0.5 bg-white rounded-lg ${!isProfileOpen && "hidden"}`}>
        <div className="flex gap-2 items-center justify-between gap-8 border-bottom p-4">
   <div className="flex gap-2 items-center">
   <img src={profile} className="size-12 rounded-full"/>
    <span className="">
    <h2 className="text-bold">Nomar Maestro</h2>
    <p className="text-primary text-sm">View Member</p>
    </span>
   </div>
    <img src={closeIcon} className="size-4 cursor-pointer"
    onClick={() => setIsProfileOpen(false)}/>
    </div>
    <div className="">
      <div className="border-bottom p-4">
      <h2 className="text-bold text-lg mb-4">About</h2>
      <span className="text-sm opacity-75 flex flex-col gap-4"> 
       <span className="flex gap-2 items-center">
       <img src={dateJoinedIcon} className="size-4 cursor-pointer"/>
        <p className="">Member since August 2018</p>
       </span>
        <span>
        <p className="">Membership Status - Regular</p>
        <p>Employment Status - Casual</p>
        </span>
      </span>
      </div>
      <div className=" p-4">
      <h2 className="text-bold text-lg mb-4">Active Loans</h2>
      <span className="text-sm opacity-75 flex flex-col gap-4 "> 
       <span className="flex gap-2 items-center">
       <img src={loanAmountIcon} className="size-4 cursor-pointer"/>
        <p className="">₱35600</p>
       </span>
        <span>
        <p className="">Loan Term - 5 months</p>
        <p>Loan Type - Prepaid Cash</p>
        <p>Start Date - 	08-12-2024	</p>
        <p>Due Date - 	04-12-2025	</p>
        </span>
      </span>
      </div>
    </div>
            </section>
    </div>
  );
};

export default Inbox;
