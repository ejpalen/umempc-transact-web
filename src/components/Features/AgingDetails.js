import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";
import selectedIcon from "../../assets/images/selected-icon.png";
import notSelectedIcon from "../../assets/images/not-selected-icon.png";
import dropdownIcon from "../../assets/images/drowdown-icon.png";

const AgingDetails = ({ agingData }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  const [selectedItem, setSelectedItem] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const findAgingItem = agingData.find((item) => item.id === id);

    setSelectedItem(findAgingItem);
  }, [agingData, selectedItem]);

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState("None");

  useEffect(() => {
    if (openModal || isFilterClicked) {
      document.querySelector("meta[name='theme-color']").content = "#ADADAD";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [openModal, isFilterClicked]);

  const filters = [
    {
      name: `Date${
        selectedDateFilter !== "None" ? `: ${selectedDateFilter}` : ""
      }`,
      content: (
        <DateFilterContent
          setIsFilterClicked={setIsFilterClicked}
          agingData={agingData}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
        />
      ),
    },
  ];

  return (
    <div className="wrapper text-default full-screen-100 overflow-x-hidden">
      {isFilterClicked && (
        <div className="modal">
          <div
            className="modal-overlay"
            onClick={() => {
              setIsFilterClicked(false);
            }}
          ></div>
          <div className="modal-content">{filters[filterIndex]?.content}</div>
        </div>
      )}
      {openModal && (
        <div className="modal">
          <div
            className="modal-overlay"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <div className="modal-content">
            <LoanDetail
              selectedItem={selectedItem}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      )}
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/aging");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Loan Details</h2>
      </section>
      <main className=" flex-1 flex flex-col mt-14">
        <section className="bg-hoverBg p-4 rounded-lg  mb-6 mx-4">
          <span className="transaction-details-data">
            <p>CV No.</p>
            <p>{selectedItem && selectedItem.cv}</p>
          </span>
          <span className="transaction-details-data">
            <p>Loan Type</p>
            <p>{selectedItem && selectedItem.loanType}</p>
          </span>
          <span className="transaction-details-data">
            <p>Loan Date</p>
            <p>{selectedItem && selectedItem.loanDate}</p>
          </span>
          <span className="transaction-details-data">
            <p>Loan Terms</p>
            <p>{selectedItem && selectedItem.loanTerms}</p>
          </span>
          <span className="transaction-details-data">
            <p>Payment Method</p>
            <p>{selectedItem && selectedItem.modeOfPayment}</p>
          </span>
          <span className="transaction-details-data">
            <p>Amortization</p>
            <p>{selectedItem && selectedItem.amortization}</p>
          </span>
          <span className="transaction-details-data">
            <p>Loan Amount</p>
            <p>{selectedItem && selectedItem.loanAmount}</p>
          </span>
        </section>
        <section className="flex flex-row gap-1 overflow-y-scroll pb-2 px-4">
          {filters.map((filter, index) => (
            <span
              key={index}
              className={`
                ${
                  index === 0 && selectedDateFilter === "None"
                    ? "opacity-75 grayscale"
                    : ""
                }
                button-3 text-nowrap text-sm py-1 px-6 text-left`}
              onClick={() => {
                setIsFilterClicked(true);
                setFilterIndex(index);
              }}
            >
              <span className="flex gap-2 items-center">
                <p>{filter.name}</p>
                <img src={dropdownIcon} alt="" className="size-3" />
              </span>
            </span>
          ))}
        </section>
        <section className="flex flex-col gap-1 overflow-x-scroll px-4 mt-2">
          <LedgerTable
            selectedItem={selectedItem}
            setOpenModal={setOpenModal}
          />
        </section>
      </main>
    </div>
  );
};

const LoanDetail = ({ selectedItem, setOpenModal }) => {
  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setOpenModal(false)}
      ></span>
      <section className="flex flex-col gap-1  items-center mt-4">
        <h1 className="text-2xl text-bold mt-1">Loan Details</h1>
        {/* <p className="opacity-75 ">Reference</p> */}
      </section>
      {selectedItem.deductions.map((data, index) => (
        <section className="bg-hoverBg p-4 rounded-lg mt-6" key={index}>
          <span className="transaction-details-data">
            <p>Deduction Periods</p>
            <p>{data.period}</p>
          </span>
          <span className="transaction-details-data">
            <p>Salary</p>
            <p>{data.salary}</p>
          </span>
          <span className="transaction-details-data">
            <p>OTC</p>
            <p>{data.otc}</p>
          </span>
          <span className="transaction-details-data">
            <p>Other Payroll</p>
            <p>{data.otherPayroll}</p>
          </span>
          <span className="transaction-details-data">
            <p>Reconstruction/Others</p>
            <p>{data.reconstructionOthers}</p>
          </span>
          <span className="transaction-details-data">
            <p>Balance</p>
            <p>{data.balance}</p>
          </span>
        </section>
      ))}
    </div>
  );
};

const LedgerTable = ({ setOpenModal, selectedItem }) => {
  return (
    <table>
      <tr>
        <th>Deduction Periods</th>
        <th>Salary</th>
        <th>OTC</th>
        <th>Other Payroll</th>
        <th>Reconstruction/Others</th>
        <th>Balance</th>
        <th>Action</th>
      </tr>
      {selectedItem &&
        selectedItem.deductions.map((data, index) => (
          <tr key={index}>
            <td>{data.period}</td>
            <td>{data.salary}</td>
            <td>{data.otc}</td>
            <td>{data.otherPayroll}</td>
            <td>{data.reconstructionOthers}</td>
            <td>{data.balance}</td>
            <td
              className="sticky-td"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <span className="text-xs">OPEN</span>
            </td>
          </tr>
        ))}
    </table>
  );
};

const DateFilterContent = ({
  setIsFilterClicked,
  selectedDateFilter,
  setSelectedDateFilter,
}) => {
  const dateFilters = ["This Week", "This Month", "This Year", "None"];

  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setIsFilterClicked(false)}
      ></span>
      <h2 className="text-xl text-bold mb-4 mt-4 text-center">Date</h2>
      <section className="flex flex-col gap-1">
        {dateFilters.map((filter, index) => (
          <span
            className="flex items-center justify-between hover:bg-hoverBg"
            onClick={() => {
              setIsFilterClicked(false);
              setSelectedDateFilter(filter);
            }}
            key={index}
          >
            <span className=" py-2 ">{filter}</span>
            <img
              src={
                selectedDateFilter === filter ? selectedIcon : notSelectedIcon
              }
              alt=""
              className="h-5"
            />
          </span>
        ))}
      </section>
    </div>
  );
};

export default AgingDetails;
