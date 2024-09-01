import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";
import bankTransferIcon from "../../assets/images/bank-transfer-icon.png";
import cashIcon from "../../assets/images/cash-icon.png";

const WithdrawDetails = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [withdrawItem, setWithdrawItem] = useState();
  const [activeOption, setActiveOption] = useState(0);
  const [selectedWithdrawOption, setSelectedWithdrawOption] =
    useState("OTC Cash");

  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  useEffect(() => {
    if (isConfirmClicked) {
      document.querySelector("meta[name='theme-color']").content = "#0051FF";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [isConfirmClicked]);

  const withdrawItemData = [
    {
      date: "23 April 2024",
      time: "08:11 pm",
      amount: "₱10,000.00",
      id: "1a1a1a",
      status: "Approved",
      type: "Prepaid Cash",
    },
    {
      date: "01 April 2024",
      time: "03:45 pm",
      amount: "₱45,000.00",
      id: "2b2b2b",
      status: "Approved",
      type: "Add-on Cash",
    },
  ];

  useEffect(() => {
    const findWithdrawItem = withdrawItemData.find((item) => item.id === id);
    setWithdrawItem(findWithdrawItem);
  }, []);

  const withdrawOptions = [
    {
      name: "OTC Cash",
      icon: cashIcon,
      description: "Visit our branch to collect your cash in person.",
    },
    {
      name: "Bank Transfer",
      icon: bankTransferIcon,
      description: "Receive the funds directly into your bank account.",
    },
  ];

  return (
    withdrawItem && (
      <div className="wrapper text-default full-screen-100">
        {isConfirmClicked && (
          <WithdrawConfirmation
            withdrawItem={withdrawItem}
            selectedWithdrawOption={selectedWithdrawOption}
            navigate={navigate}
          />
        )}
        <section className="header p-4 flex justify-between items-center gap-2">
          <img
            src={backIcon}
            alt=""
            className="h-6 p-1 cursor-pointer absolute"
            onClick={() => {
              navigate("/withdraw");
            }}
          />
          <h2 className="flex-1 text-center text-xl">Withdraw</h2>
        </section>
        <main className=" flex-1 flex flex-col px-4 justify-center h-full ">
          <section className="flex flex-col gap-1  text-center ">
            <p className="opacity-75">Amount</p>
            <h1 className="text-5xl text-bold">{withdrawItem.amount}</h1>
          </section>
          <section className="bg-hoverBg p-4 rounded-lg mt-12">
            <span className="transaction-details-data">
              <p>Status</p>
              <p>{withdrawItem.status}</p>
            </span>
            <span className="transaction-details-data">
              <p>Type</p>
              <p>{withdrawItem.type}</p>
            </span>
          </section>
          <p className="mt-12 opacity-75">Withdrawal Method</p>
          <section className="flex flex-col gap-2 mt-2">
            {withdrawOptions.map((option, index) => (
              <span
                key={index}
                className={`
                flex gap-4 items-center 
                text-base p-4 rounded-lg flex-1 ${
                  activeOption === index
                    ? "button-1"
                    : "button-2 withdraw-item bg-white"
                }`}
                onClick={() => {
                  setActiveOption(index);
                  setSelectedWithdrawOption(option.name);
                }}
              >
                <img
                  src={option.icon}
                  alt=""
                  className={`h-5 w-5
                  ${
                    activeOption === index &&
                    "invert grayscale-100 brightness-0"
                  }
                `}
                />
                <span>
                  <p className="">{option.name}</p>
                  <p className="text-sm opacity-75">{option.description}</p>
                </span>
              </span>
            ))}
          </section>
          <section className="fixed right-0 left-0 bottom-0 p-4">
            <span
              onClick={() => setIsConfirmClicked(true)}
              className={`
                flex gap-2 items-center justify-center p-4 rounded-full flex-1 text-center bg-primary text-white text-bold`}
            >
              <p className="text-bold">Proceed with Withdrawal</p>
            </span>
          </section>
        </main>
      </div>
    )
  );
};

const WithdrawConfirmation = ({
  withdrawItem,
  selectedWithdrawOption,
  navigate,
}) => {
  return (
    <div className="gradient-bg-2 h-full w-[100vw] absolute top-0 right-0 left-0 z-30 text-white flex">
      <section className="flex-1 flex justify-center items-center flex-col px-4">
        <section className="">
          <h1 className="text-2xl text-center">
            Withdrawal request submitted successfully.
          </h1>
        </section>
        <section className="bg-hoverBg bg-opacity-10 p-4 rounded-lg mt-12 w-full">
          <span className="transaction-details-data">
            <p>Amount</p>
            <p>{withdrawItem.amount}</p>
          </span>
          <span className="transaction-details-data">
            <p>Method</p>
            <p>{selectedWithdrawOption}</p>
          </span>
        </section>
        <section className="bg-white text-primary p-4 rounded-lg mt-6">
          {selectedWithdrawOption === "OTC Cash" ? (
            <span>
              The admin has been notified. Visit the branch to collect your
              cash.
            </span>
          ) : (
            <span>
              The admin has been notified. Expect the transfer within 24 hours.
            </span>
          )}
        </section>
        <span
          onClick={() => navigate("/home")}
          className={`
                flex gap-2 items-center justify-center p-4 rounded-full mt-12 text-center w-full border-white text-white text-bold`}
        >
          <p>Back to Home</p>
        </span>
      </section>
    </div>
  );
};

export default WithdrawDetails;
