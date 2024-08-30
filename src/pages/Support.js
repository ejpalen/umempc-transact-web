import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import customerServiceIcon from "../assets/images/customer-service-icon.png";
import approvedLoanIcon from "../assets/images/approved-loan-icon.png";

const Support = () => {
  const navigate = useNavigate();

  const messagesFilters = ["Chats", "Notifications"];
  const [activeFilter, setActiveFilter] = useState(1);

  const [selectedItem, setSelectedItem] = useState({});
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (openNotification) {
      document.querySelector("meta[name='theme-color']").content = "#ADADAD";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [openNotification]);

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
          {activeFilter === 0 ? (
            <Chat navigate={navigate} />
          ) : (
            <NotificationContainer
              setSelectedItem={setSelectedItem}
              setOpenNotification={setOpenNotification}
            />
          )}
          {openNotification && (
            <div className="modal">
              <div
                className="modal-overlay"
                onClick={() => {
                  setOpenNotification(false);
                }}
              ></div>
              <div className="modal-content">
                <NotificationContent
                  selectedItem={selectedItem}
                  setOpenNotification={setOpenNotification}
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const NotificationContainer = ({ setSelectedItem, setOpenNotification }) => {
  const notifications = [
    {
      header: "Approved Loan",
      description: " Loan ID 345568 has been approved by t...",
      date: "2022-01-01",
      time: "12:30 am",
    },
    {
      header: "Approved Loan",
      description: " Loan ID 345568 has been approved by t...",
      date: "2022-01-01",
      time: "12:30 am",
    },
    {
      header: "Approved Loan",
      description: " Loan ID 345568 has been approved by t...",
      date: "2022-01-01",
      time: "12:30 am",
    },
  ];

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          notification={notification}
          setOpenNotification={setOpenNotification}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </div>
  );
};

const Notification = ({
  notification,
  setSelectedItem,
  setOpenNotification,
}) => {
  return (
    <div
      className="mt-4 flex gap-3 items-center cursor-pointer hover:bg-hoverBg"
      onClick={() => {
        setOpenNotification(true);
        setSelectedItem(notification);
      }}
    >
      <img src={approvedLoanIcon} alt="" className="h-12" />
      <span className="flex-1">
        <span className="flex justify-between gap-2 items-center flex-1">
          <h3 className="text-base">{notification.header}</h3>
          <p className="text-xs opacity-75">{notification.time}</p>
        </span>
        <p className="text-sm opacity-75">{notification.description}</p>
      </span>
    </div>
  );
};

const NotificationContent = ({ selectedItem, setOpenNotification }) => {
  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setOpenNotification(false)}
      ></span>
      <section className="flex flex-col gap-1  items-center mt-4">
        <img src={approvedLoanIcon} alt="" className="h-12" />
        <h1 className="text-2xl text-bold mt-1">{selectedItem.header}</h1>
      </section>
      <section className="bg-hoverBg p-4 rounded-lg mt-6">
        <span className="transaction-details-data">
          <p>{selectedItem.description}</p>
        </span>
      </section>
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
