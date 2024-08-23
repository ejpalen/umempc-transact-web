import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import customerServiceIcon from "../assets/images/customer-service-icon.png";
import approvedLoanIcon from "../assets/images/approved-loan-icon.png";

const Support = () => {
  const navigate = useNavigate();

  const messagesFilters = ["Chats", "Notifications"];
  const [activeFilter, setActiveFilter] = useState(1);

  return (
    <div className="wrapper text-default">
      <section className="p-4">
        <h2 className="text-2xl text-bold">Messages</h2>
      </section>
      <main className="px-4">
        <section className="flex flex-row gap-1">
          {messagesFilters.map((filter, index) => (
            <span
              key={index}
              className={`text-base p-1.5 flex-1 text-center ${
                activeFilter === index ? "button-1" : "button-2"
              }`}
              onClick={() => setActiveFilter(index)}
            >
              {filter}
            </span>
          ))}
        </section>
        <section className="mt-4">
          {activeFilter === 0 ? <Chat navigate={navigate} /> : <Notification />}
        </section>
      </main>
    </div>
  );
};

const Notification = () => {
  return (
    <div className="mt-4 flex gap-3 items-center cursor-pointer">
      <img src={approvedLoanIcon} alt="" className="h-12" />
      <span className="flex-1">
        <span className="flex justify-between gap-2 items-center flex-1">
          <h3 className="text-base">Approved Loan</h3>
          <p className="text-xs opacity-75">12:30 am</p>
        </span>
        <p className="text-sm opacity-75">
          Loan ID 345568 has been approved by t...
        </p>
      </span>
    </div>
  );
};

const Chat = ({ navigate }) => {
  return (
    <div
      className="bg-secondary flex gap-3 items-center p-4 rounded-xl cursor-pointer"
      onClick={() => navigate("/support-chat")}
    >
      <img src={customerServiceIcon} alt="" className="h-12" />
      <span>
        <h3 className="text-base">Chat to get help</h3>
        <p className="text-sm opacity-75">Focused on your exact issues</p>
      </span>
    </div>
  );
};

export default Support;
