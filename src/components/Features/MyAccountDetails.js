import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/feature-back-icon.png";
import selectedIcon from "../../assets/images/selected-icon.png";
import notSelectedIcon from "../../assets/images/not-selected-icon.png";
import dropdownIcon from "../../assets/images/drowdown-icon.png";

const MyAccountDetails = ({ accountData }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  const [selectedItem, setSelectedItem] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const findAgingItem = accountData.find((item) => item.id === id);

    setSelectedItem(findAgingItem);
  }, [accountData, selectedItem]);

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState("None");

  const [selectedAmortizationPeriod, setSelectedAmortizationPeriod] = useState()

  useEffect(() => {
    if (openModal || isFilterClicked) {
      document.querySelector("meta[name='theme-color']").content = "#2267A9";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#198df9";
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
          selectedAmortizationPeriod={selectedAmortizationPeriod}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
        />
      ),
    },
  ];

  useEffect(() =>{
    console.log(selectedAmortizationPeriod)
  },[selectedAmortizationPeriod])

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
              selectedAmortizationPeriod={selectedAmortizationPeriod}
            />
          </div>
        </div>
      )}
      <section className="header p-4 flex flex-col gradient-bg-3 h-32 gap-4 justify-center text-white">
        <section className="flex justify-start items-center gap-3">
          <img
            src={backIcon}
            alt=""
            className="h-7 p-1 cursor-pointer"
            onClick={() => {
              navigate("/my-account");
            }}
          />
          <h2 className="flex-1 text-2xl text-bold">{(selectedItem && selectedItem.reference)}</h2>
        </section>
        <span className=""> Transaction Details</span>
      </section>
      <main className=" flex-1 flex flex-col mt-32">
      <section className="bg-hoverBg p-4 rounded-lg  mb-6 mx-4 mt-6">
      <span className="transaction-details-data">
          <p>Loan Date</p>
          <p>{selectedItem && selectedItem.date}</p>
        </span>
        <span className="transaction-details-data">
          <p>CV No.</p>
          <p>{selectedItem && selectedItem.cvNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Check No.</p>
          <p>{selectedItem && selectedItem.checkNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loan Terms</p>
          <p>{selectedItem && selectedItem.loanTerms}</p>
        </span>
        <span className="transaction-details-data">
          <p>OR No.</p>
          <p>{selectedItem && selectedItem.orNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>GJ No.</p>
          <p>{selectedItem && selectedItem.gjNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Share Capital</p>
          <p>{selectedItem && selectedItem.shareCapital}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loans</p>
          <p>{selectedItem && selectedItem.loans}</p>
        </span>
        <span className="transaction-details-data">
          <p>Accounts</p>
          <p>{selectedItem &&  selectedItem.accounts}</p>
        </span>
        <span className="transaction-details-data">
          <p>Interest</p>
          <p>{selectedItem && selectedItem.interest}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loan Balance</p>
          <p>{selectedItem && selectedItem.loanBalance}</p>
        </span>
      </section>
      {selectedItem && selectedItem.type  === "loan" && (
        <section className="bg-hoverBg p-4 rounded-lg  mb-6 mx-4">
          <span className="transaction-details-data">
            <p>Loan Type</p>
            <p>{selectedItem && selectedItem.loanType}</p>
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
    )}
        {selectedItem && selectedItem.type  === "loan" && (
         <>
            <h1 className="text-xl px-4 mb-2">Schedule of Account's Amortizations</h1>
        <section className="flex flex-row gap-1 overflow-y-scroll pb-2 px-4">
            
          {filters.map((filter, index) => (
            <span
              key={index}
              className={`
                ${
                  index === 0 && selectedDateFilter === "None"
                    ? "filter-inactive"
                    : "bg-secondary"
                }
                button-2 text-nowrap text-sm py-1 px-6 text-left`}
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
        </>
        )}
        <section className="flex flex-col gap-1 overflow-x-scroll px-4 mt-2">
         {selectedItem && selectedItem.type  === "loan" && (
             <LedgerTable
             selectedItem={selectedItem}
             setOpenModal={setOpenModal}
             setSelectedAmortizationPeriod={setSelectedAmortizationPeriod}
           />
         )}
        </section>
      </main>
    </div>
  );
};

const LoanDetail = ({ selectedAmortizationPeriod, setOpenModal }) => {
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
        <section className="bg-hoverBg p-4 rounded-lg mt-6">
          <span className="transaction-details-data">
            <p>Deduction Periods</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.period}</p>
          </span>
          <span className="transaction-details-data">
            <p>Salary</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.salary}</p>
          </span>
          <span className="transaction-details-data">
            <p>OTC</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.otc}</p>
          </span>
          <span className="transaction-details-data">
            <p>Other Payroll</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.otherPayroll}</p>
          </span>
          <span className="transaction-details-data">
            <p>Reconstruction/Others</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.reconstructionOthers}</p>
          </span>
          <span className="transaction-details-data">
            <p>Balance</p>
            <p>{selectedAmortizationPeriod && selectedAmortizationPeriod.balance}</p>
          </span>
        </section>
    </div>
  );
};

const LedgerTable = ({setSelectedAmortizationPeriod, setOpenModal, selectedItem }) => {
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
                setSelectedAmortizationPeriod(data);
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

export default MyAccountDetails;
