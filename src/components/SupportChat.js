import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import backIcon from "../assets/images/back-icon.png";
import sendIcon from "../assets/images/send-icon.png";
import sendActiveIcon from "../assets/images/send-active-icon.png";

//Firebase
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const SupportChat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  const [chats, setChats] = useState([]); // Initialize as an empty array
  const [message, setMessage] = useState("");
  const element = useRef();

  let chatRef = query(
    collection(db, "chats"),
    orderBy("chat_start"),
    where("member_id", "==", JSON.parse(sessionStorage.getItem("memberPersonalDetails"))[0].member_id)
  );

  // Fetch chats from database
  useEffect(() => {
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const chatData = snapshot.docs.map((val) => ({
        ...val.data(),
        id: val.id,
      }));
      setChats(chatData);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Send message request
  const handleSendMessage = async () => {
    const chatRef = doc(db, "chats", chats && chats[0].id); // Ensure chatData is defined
    const currentDate = new Date();

    // Create the new chat message object
    const newChatMessage = {
      message: message,
      time: currentDate,
      user: "member",
    };

    // Update the document by adding the new message to the chats array
    await updateDoc(chatRef, {
      chats: arrayUnion(newChatMessage), // Use arrayUnion to add the new message
    });

    // Clear the message input after sending
    setMessage("");
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, chat) => {
      const date = moment(chat.time.toDate()).format("DD MMMM YYYY");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(chat);
      return acc;
    }, {});
  };

  const groupedChats = groupMessagesByDate(chats.length > 0 ? chats[0].chats : []);

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
            onClick={handleSendMessage}
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
          <div className="chat-wrapper flex flex-col gap-4 justify-center px-4 flex-1">
            {Object.keys(groupedChats).map((date, dateIndex) => (
              <div key={dateIndex} className="flex flex-col">
                <span className="text-center text-sm">{date}</span>
                <div className="flex flex-col gap-2">
                {groupedChats[date].map((chat, index) => (
                  <div
                    key={index}
                    className={`chat-message flex flex-1 ${
                      chat.user === "member" && "items-end justify-end"
                    }`}
                  >
                    <span
                      className={`w-fit flex gap-0 flex-col items-end ${
                        chat.user === "member" ? "chat-user" : "chat-admin"
                      }`}
                    >
                      <p className="text-base">{chat.message}</p>
                      <p className="text-xs opacity-50">
                        {moment(chat.time.toDate()).format("hh:mm A")}
                      </p>
                    </span>
                  </div>
                ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportChat;
