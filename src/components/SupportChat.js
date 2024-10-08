import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/back-icon.png";
import sendIcon from "../assets/images/send-icon.png";
import sendActiveIcon from "../assets/images/send-active-icon.png";

const SupportChat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

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
  ];

  const [message, setMessage] = useState("");
  const element = useRef();

  return (
    <div className="wrapper text-default">
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-3 px-0 z-10 h-16 flex ">
        <nav className="flex flex-1 justify-around items-center px-4 gap-2">
          <textarea
            type="text"
            className="flex-1"
            ref={element}
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
      </div>
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/support");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Support</h2>
      </section>
      <main className="mt-16 h-full">
        <section className="pb-2">
          <div className="chat-wrapper flex flex-col gap-1 justify-center px-4 flex-1">
            <span className="text-center text-sm">August 21</span>
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`chat-message flex  flex-1 ${
                  chat.user === "user" && "items-end justify-end"
                }`}
              >
                <span
                  className={`w-fit flex gap-0 flex-col items-end  ${
                    chat.user === "user" ? "chat-user" : "chat-admin"
                  }`}
                >
                  <p className="text-base">{chat.message}</p>
                  <p className="text-xs opacity-50">{chat.time}</p>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportChat;
