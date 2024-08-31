import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";
import selectedIcon from "../../assets/images/selected-icon.png";
import notSelectedIcon from "../../assets/images/not-selected-icon.png";
import dropdownIcon from "../../assets/images/drowdown-icon.png";

const Aging = ({ agingData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  const [selectedItem, setSelectedItem] = useState({});

  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState("None");
  const [selectedReferenceFilter, setSelectedReferenceFilter] =
    useState("None");
  const [selectedCVNOFilter, setSelectedCVNoFilter] = useState("None");

  useEffect(() => {
    if (isFilterClicked) {
      document.querySelector("meta[name='theme-color']").content = "#ADADAD";
    } else {
      document.querySelector("meta[name='theme-color']").content = "#ffffff";
    }
  }, [isFilterClicked]);

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
    {
      name: `CV No${
        selectedCVNOFilter !== "None" ? `: ${selectedCVNOFilter}` : ""
      }`,
      content: (
        <CVNoFilterContent
          setIsFilterClicked={setIsFilterClicked}
          agingData={agingData}
          selectedCVNOFilter={selectedCVNOFilter}
          setSelectedCVNoFilter={setSelectedCVNoFilter}
        />
      ),
    },
    {
      name: `Loan Type${
        selectedReferenceFilter !== "None" ? `: ${selectedReferenceFilter}` : ""
      }`,
      content: (
        <ReferenceFilterContent
          setIsFilterClicked={setIsFilterClicked}
          agingData={agingData}
          selectedReferenceFilter={selectedReferenceFilter}
          setSelectedReferenceFilter={setSelectedReferenceFilter}
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
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/home");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Aging</h2>
      </section>
      <main className=" flex-1 flex flex-col mt-14">
        <section className="flex flex-row gap-1 overflow-y-scroll pb-2 px-4 mt-2">
          {filters.map((filter, index) => (
            <span
              key={index}
              className={`
                ${
                  index === 0 && selectedDateFilter === "None"
                    ? "opacity-75 grayscale"
                    : ""
                }
                ${
                  index === 2 && selectedReferenceFilter === "None"
                    ? "opacity-75 grayscale"
                    : ""
                }
                ${
                  index === 1 && selectedCVNOFilter === "None"
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
            agingData={agingData}
            setSelectedItem={setSelectedItem}
            navigate={navigate}
          />
        </section>
      </main>
    </div>
  );
};

const LedgerTable = ({ agingData, setSelectedItem, navigate }) => {
  return (
    <table>
      <tr>
        <th>Loan Date</th>
        <th>CV No.</th>
        <th>Loan Type</th>
        <th>Loan Terms</th>
        <th>Payment Method</th>
        <th>Amortization</th>
        <th>Loan Amount</th>
        <th>Action</th>
      </tr>
      {agingData.map((data, index) => (
        <tr key={index}>
          <td>{data.loanDate}</td>
          <td>{data.cv}</td>
          <td>{data.loanType}</td>
          <td>{data.loanTerms}</td>
          <td>{data.modeOfPayment}</td>
          <td>{data.amortization}</td>
          <td>{data.loanAmount}</td>
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
  agingData,
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
        {Array.from(new Set(agingData.map((aging) => aging.loanType)))
          .filter((loanType) => loanType)
          .map((loanType, index) => (
            <span
              className="flex items-center justify-between hover:bg-hoverBg"
              onClick={() => {
                setIsFilterClicked(false);
                setSelectedReferenceFilter(loanType);
              }}
              key={index}
            >
              <span className=" py-2" key={loanType}>
                {loanType}
              </span>
              <img
                src={
                  selectedReferenceFilter === loanType
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
  agingData,
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
        {Array.from(new Set(agingData.map((aging) => aging.cv)))
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

export default Aging;
