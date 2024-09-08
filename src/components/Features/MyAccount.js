import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/feature-back-icon.png";
import dropdownIcon from "../../assets/images/drowdown-icon.png";
import sharesCapitalIcon from "../../assets/images/total-shares-capital-icon.png";
import totalLoansIcon from "../../assets/images/total-loans-icon.png";
import totalAccountsIcon from "../../assets/images/total-aacounts-icon.png";
import totalBalanceIcon from "../../assets/images/total-balance-icon.png";
import selectedIcon from "../../assets/images/selected-icon.png";
import notSelectedIcon from "../../assets/images/not-selected-icon.png";

const MyAccount = ({accountData}) => {
  const navigate = useNavigate();

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [selectedDateFilter, setSelectedDateFilter] = useState("None");
  const [selectedReferenceFilter, setSelectedReferenceFilter] =
    useState("None");
  const [selectedCVNOFilter, setSelectedCVNoFilter] = useState("None");

  useEffect(() => {
    if (openModal || isFilterClicked) {
      document.querySelector("meta[name='theme-color']").content = "#2267A9";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#198df9";
    }
  }, [openModal, isFilterClicked]);

  useEffect(() => {
    document.querySelector("body").classList.toggle("modal-open", openModal);
  }, [openModal]);

  useEffect(() => {
    document
      .querySelector("body")
      .classList.toggle("modal-open", isFilterClicked);
  }, [isFilterClicked]);


  const filters = [
    {
      name: `${
        selectedDateFilter !== "None" ? `${selectedDateFilter}` : "Date"
      }`,
      content: (
        <DateFilterContent
          setIsFilterClicked={setIsFilterClicked}
          accountData={accountData}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
        />
      ),
    },
    {
      name: `${
        selectedReferenceFilter !== "None"
          ? `${selectedReferenceFilter}`
          : "Reference"
      }`,
      content: (
        <ReferenceFilterContent
          setIsFilterClicked={setIsFilterClicked}
          accountData={accountData}
          selectedReferenceFilter={selectedReferenceFilter}
          setSelectedReferenceFilter={setSelectedReferenceFilter}
        />
      ),
    },
    {
      name: `${
        selectedCVNOFilter !== "None" ? `${selectedCVNOFilter}` : "CV No"
      }`,
      content: (
        <CVNoFilterContent
          setIsFilterClicked={setIsFilterClicked}
          accountData={accountData}
          selectedCVNOFilter={selectedCVNOFilter}
          setSelectedCVNoFilter={setSelectedCVNoFilter}
        />
      ),
    },
  ];

  const summary = [
    {
      name: "Total Shares Capital",
      total: 37600.0,
      image: sharesCapitalIcon,
    },
    {
      name: "Total Loans",
      total: 54049.0,
      image: totalLoansIcon,
    },
    {
      name: "Total Accounts",
      total: 800.0,
      image: totalAccountsIcon,
    },
    {
      name: "Total Balance",
      total: 54849.0,
      image: totalBalanceIcon,
    },
  ];

  return (
    <div className="wrapper text-default full-screen-100">
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
            <LedgerDetail
              selectedItem={selectedItem}
              setOpenModal={setOpenModal}
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
              navigate("/home");
            }}
          />
          <h2 className="flex-1 text-2xl text-bold">My Account</h2>
        </section>
        <span className=""> Account Activity and Loan Payments</span>
      </section>
      <main className=" flex-1 flex flex-col mt-32">
        <section className="mb-4 mt-6">
          <div className="gap-2 w-full px-4 grid-cols-2 grid">
            {summary.map((item, index) => (
              <span
                className={`summary-${index + 1} p-4 rounded-lg flex-1 `}
                key={index}
              >
                <img src={item.image} alt="" className="h-8 mb-2" />
                <h2 className=" text-2xl text-bold">
                  ₱{item.total.toLocaleString()}
                </h2>
                <p className="opacity-75 text-sm">{item.name}</p>
              </span>
            ))}
          </div>
        </section>

        <section className=" flex flex-col mt-2">
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
                ${
                  index === 1 && selectedReferenceFilter === "None"
                    ? "filter-inactive"
                    : "bg-secondary"
                }
                ${
                  index === 2 && selectedCVNOFilter === "None"
                    ? "filter-inactive"
                    : "bg-secondary"
                }
                button-2  text-nowrap text-sm py-2 px-6 text-left`}
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
          <section className="table-container overflow-scroll pb-1 mt-4 mr-4">
            <div className="px-4 ">
              <LedgerTable
                accountData={accountData}
                setSelectedItem={setSelectedItem}
                setOpenModal={setOpenModal}
                navigate={navigate}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
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

const ReferenceFilterContent = ({
  setIsFilterClicked,
  accountData,
  selectedReferenceFilter,
  setSelectedReferenceFilter,
}) => {
  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setIsFilterClicked(false)}
      ></span>
      <h2 className="text-xl text-bold mb-4 mt-4 text-center">Reference</h2>
      <section className="flex flex-col gap-1">
        {Array.from(
          new Set(accountData.map((transaction) => transaction.reference))
        )
          .filter((reference) => reference)
          .map((reference, index) => (
            <span
              className="flex items-center justify-between hover:bg-hoverBg"
              onClick={() => {
                setIsFilterClicked(false);
                setSelectedReferenceFilter(reference);
              }}
              key={index}
            >
              <span className=" py-2" key={reference}>
                {reference}
              </span>
              <img
                src={
                  selectedReferenceFilter === reference
                    ? selectedIcon
                    : notSelectedIcon
                }
                alt=""
                className="h-5"
              />
            </span>
          ))}
        <span
          className="flex items-center justify-between hover:bg-hoverBg"
          onClick={() => {
            setIsFilterClicked(false);
            setSelectedReferenceFilter("None");
          }}
        >
          <span className=" py-2 ">None</span>
          <img
            src={
              selectedReferenceFilter === "None"
                ? selectedIcon
                : notSelectedIcon
            }
            alt=""
            className="h-5"
          />
        </span>
      </section>
    </div>
  );
};

const CVNoFilterContent = ({
  setIsFilterClicked,
  accountData,
  selectedCVNOFilter,
  setSelectedCVNoFilter,
}) => {
  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setIsFilterClicked(false)}
      ></span>
      <h2 className="text-xl text-bold mb-4 mt-4 text-center">CV No.</h2>
      <section className="flex flex-col gap-1">
        {Array.from(new Set(accountData.map((transaction) => transaction.cvNo)))
          .filter((cv) => cv)
          .map((cv, index) => (
            <span
              className="flex items-center justify-between hover:bg-hoverBg"
              onClick={() => {
                setIsFilterClicked(false);
                setSelectedCVNoFilter(cv);
              }}
              key={index}
            >
              <span className=" py-2" key={cv}>
                {cv}
              </span>
              <img
                src={selectedCVNOFilter === cv ? selectedIcon : notSelectedIcon}
                alt=""
                className="h-5"
              />
            </span>
          ))}
        <span
          className="flex items-center justify-between hover:bg-hoverBg"
          onClick={() => {
            setIsFilterClicked(false);
            setSelectedCVNoFilter("None");
          }}
        >
          <span className=" py-2 ">None</span>
          <img
            src={selectedCVNOFilter === "None" ? selectedIcon : notSelectedIcon}
            alt=""
            className="h-5"
          />
        </span>
      </section>
    </div>
  );
};

const LedgerTable = ({ accountData, setSelectedItem, navigate }) => {
  return (
    <table>
      <tr>
        <th>Date</th>
        <th>Reference</th>
        <th>CV No.</th>
        <th>Check No.</th>
        <th>Loan Terms</th>
        <th>OR No.</th>
        <th>GJ No.</th>
        <th>Share Capital</th>
        <th>Loans</th>
        <th>Accounts</th>
        <th>Interest</th>
        <th>Loan Balance</th>
        <th>Action</th>
      </tr>
      {accountData.map((data, index) => (
        <tr key={index}>
          <td>{data.date}</td>
          <td>{data.reference}</td>
          <td>{data.cvNo}</td>
          <td>{data.checkNo}</td>
          <td>{data.loanTerms}</td>
          <td>{data.orNo}</td>
          <td>{data.gjNo}</td>
          <td>{data.shareCapital}</td>
          <td>{data.loans}</td>
          <td>{data.accounts}</td>
          <td>{data.interest}</td>
          <td>{data.loanBalance}</td>
          <td
            className="sticky-td"
            onClick={() => {
              setSelectedItem(data);
              navigate(`${data.id}`);
            }}
          >
            <span className="text-xs">OPEN</span>
          </td>
        </tr>
      ))}
    </table>
  );
};

const LedgerDetail = ({ selectedItem, setOpenModal }) => {
  return (
    <div className="pb-2">
      <span
        className="flex justify-center m-auto h-1.5 w-16 bg-[#B5B5B5] rounded-full"
        onClick={() => setOpenModal(false)}
      ></span>
      <section className="flex flex-col gap-1  items-center mt-4">
        <h1 className="text-2xl text-bold mt-1">{selectedItem.reference}</h1>
        {/* <p className="opacity-75 ">Reference</p> */}
      </section>
      <section className="bg-hoverBg p-4 rounded-lg mt-6">
        <span className="transaction-details-data">
          <p>CV No.</p>
          <p>{selectedItem.cvNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Check No.</p>
          <p>{selectedItem.checkNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loan Terms</p>
          <p>{selectedItem.loanTerms}</p>
        </span>
        <span className="transaction-details-data">
          <p>OR No.</p>
          <p>{selectedItem.orNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>GJ No.</p>
          <p>{selectedItem.gjNo}</p>
        </span>
        <span className="transaction-details-data">
          <p>Share Capital</p>
          <p>{selectedItem.shareCapital}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loans</p>
          <p>{selectedItem.loans}</p>
        </span>
        <span className="transaction-details-data">
          <p>Accounts</p>
          <p>{selectedItem.accounts}</p>
        </span>
        <span className="transaction-details-data">
          <p>Interest</p>
          <p>{selectedItem.interest}</p>
        </span>
        <span className="transaction-details-data">
          <p>Loan Balance</p>
          <p>{selectedItem.loanBalance}</p>
        </span>
      </section>
    </div>
  );
};

export default MyAccount;
