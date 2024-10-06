import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import LoanIcon from "../../assets/images/loan-management-icon.png";
import closeIcon from "../../assets/images/search-icon.png";
import dateIcon from "../../assets/images/date-icon.png";
import downArrow from "../../assets/images/down-arrow.png";

const LoanManagement = () => {
  const moment = require("moment");

  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const actions = ["View Details", "Edit Details", "Send Reminder"];

  //Date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const currentDate = new Date();
  const [minDate, setMinDate] = useState();

  const navLinks = [
    "All Loans",
    "Approved",
    "Pending",
    "Declined",
    "Overdue",
    "Payment Schedules",
  ];

  const loans = [
    {
      id: "12345",
      member: "Nomar Maestro",
      loanAmount: 35600.0,
      loanTerm: "5",
      loanType: "Prepaid Cash",
      kindOfLoan: "Salary Loan",
      loanStartDate: "08-12-2024",
      loanDueDate: "04-12-2024",
      paymentMethod: "Salary Deduction",
      repaymentStatus: "On Track",
      remainingBalance: 12000.0,
    },
    {
      id: "67890",
      member: "Ellaine Cervantes",
      loanAmount: 35600.0,
      loanTerm: "5",
      loanType: "Prepaid Cash",
      kindOfLoan: "Salary Loan",
      loanStartDate: "08-12-2024",
      loanDueDate: "04-12-2024",
      paymentMethod: "Salary Deduction",
      repaymentStatus: "On Track",
      remainingBalance: 12000.0,
    },
  ];

  //Date
  //default values
  useEffect(() => {
    setStartDate(moment().format("YYYY-MM-DD"));
    setEndDate(moment().format("YYYY-MM-DD"));
    getOrdersToday();

    // const dateObjectsArray = filteredLogs.map(
    //   (dateString) => new Date(dateString.DateFormat.toDate())
    // );

    // const earliestDate = new Date(Math.min(...dateObjectsArray));

    // setMinDate(
    //   `${earliestDate.getFullYear()}-0${
    //     earliestDate.getMonth() + 1
    //   }-${earliestDate.getDate()}`
    // );
  }, []);

  //Controller
  //Change Start Date
  const handleStartDateChange = (event) => {
    // const selectedStartDate = new Date(event);
    // if (selectedStartDate > endDate) {
    //   ErrorPopup("Start date cannot be later than end date.");
    //   return;
    // } else {
    //   setStartDate(event);
    //   const filteredData = filteredLogs.filter((order) => {
    //     const orderDate = new Date(order.DateFormat.toDate());
    //     return selectedStartDate <= orderDate && orderDate <= new Date(endDate);
    //   });
    //   setNewLogData(filteredData);
    // }
  };

  //Change End Date
  const handleEndDateChange = (event) => {
    // const selectedEndDate = new Date(event);
    // if (selectedEndDate < startDate) {
    //   ErrorPopup("End date cannot be earlier than start date.");
    //   return;
    // } else {
    //   setEndDate(event);
    //   const filteredData = filteredLogs.filter((order) => {
    //     const orderDate = order.DateFormat.toDate();
    //     return new Date(startDate) <= orderDate && orderDate <= selectedEndDate;
    //   });
    //   setNewLogData(filteredData);
    // }
  };

  // Function to handle date range selection
  const handleDateRangeSelection = (range) => {
    switch (range) {
      case "Today":
        getOrdersToday();
        setSelectedDate("Today");
        setStartDate(moment().format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case "This Month":
        getOrdersThisMonth();
        setSelectedDate("This Month");
        setStartDate(
          `${moment().year()}` + "-" + `0${moment().month() + 1}` + "-" + `01`
        );
        setEndDate(
          `${moment().year()}` +
            "-" +
            `0${moment().month() + 1}` +
            "-" +
            `${moment().daysInMonth()}`
        );
        break;
      case "This Year":
        getOrdersThisYear();
        setSelectedDate("This Year");
        setStartDate(`${moment().year()}` + "-" + `01` + "-" + `01`);
        setEndDate(
          `${moment().year()}` +
            "-" +
            `0${moment().month() + 1}` +
            "-" +
            `${moment().daysInMonth()}`
        );
        break;
      case "All Time":
        setSelectedFilter("All");
        // if (selectedFilter === "All") {
        //   // If selectedFilter is "All", display all data
        //   setNewLogData(filteredLogs);
        // } else {
        //   // If selectedFilter is not "All", filter data based on selectedFilter
        //   const allTimeFilteredData = filteredLogs.filter(
        //     (order) =>
        //       order.userID === selectedLogsUser ||
        //       order.action === selectedLogsAction
        //   );
        //   setNewLogData(allTimeFilteredData);
        // }
        // setSelectedDate("All Time");
        // setStartDate(minDate);
        // setEndDate(moment().format("YYYY-MM-DD"));
        break;

      default:
        getOrdersToday();
        setSelectedDate("Today");
        setStartDate(moment().format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
    }
  };

  //Fetch orders today
  const getOrdersToday = () => {
    // const filteredProducts = filteredLogs.filter((order) => {
    //   if (!(order.DateFormat instanceof Timestamp)) {
    //     console.error(
    //       "order.DateFormat is not a valid Firebase timestamp",
    //       order.DateFormat
    //     );
    //     return false;
    //   }
    //   const orderDate = order.DateFormat.toDate();
    //   const isToday =
    //     orderDate.getDate() === currentDate.getDate() &&
    //     orderDate.getMonth() === currentDate.getMonth() &&
    //     orderDate.getFullYear() === currentDate.getFullYear();
    //   const includesUser =
    //     selectedFilter === "All" ||
    //     order.userID === selectedLogsUser ||
    //     order.action === selectedFilter;
    //   return isToday && includesUser;
    // });
    // setNewLogData(filteredProducts);
  };

  //Fetch orders this month
  const getOrdersThisMonth = () => {
    // const filteredProducts = filteredLogs.filter((order) => {
    //   if (!(order.DateFormat instanceof Timestamp)) {
    //     console.error(
    //       "order.DateFormat is not a valid Firebase timestamp:",
    //       order.DateFormat
    //     );
    //     return false;
    //   }
    //   const orderDate = order.DateFormat.toDate();
    //   const isThisMonth =
    //     orderDate.getMonth() === currentDate.getMonth() &&
    //     orderDate.getFullYear() === currentDate.getFullYear();
    //   if (selectedFilter === "All") {
    //     return isThisMonth;
    //   } else {
    //     const includesUser =
    //       order.userID === selectedLogsUser || order.action === selectedFilter;
    //     return isThisMonth && includesUser;
    //   }
    // });
    // setNewLogData(filteredProducts);
  };

  //Fetch orders this year
  const getOrdersThisYear = () => {
    // const filteredProducts = filteredLogs.filter((order) => {
    //   if (!(order.DateFormat instanceof Timestamp)) {
    //     console.error(
    //       "order.DateFormat is not a valid Firebase timestamp:",
    //       order.DateFormat
    //     );
    //     return false;
    //   }
    //   const orderDate = order.DateFormat.toDate();
    //   const isThisYear = orderDate.getFullYear() === currentDate.getFullYear();
    //   if (selectedFilter === "All") {
    //     return isThisYear;
    //   } else {
    //     const includesUser =
    //       order.userID === selectedLogsUser || order.action === selectedFilter;
    //     return isThisYear && includesUser;
    //   }
    // });
    // setNewLogData(filteredProducts);
  };

  //Change orders based on filter with date range selection
  // useEffect(() => {
  //   handleDateRangeSelection(selectedDate);
  // }, [selectedFilter, selectedLogsUser, filteredLogs]);


  const loanOptions = {
    loanType: {
      label: "Loan Type",
      options: [
        { value: "Prepaid Cash", label: "Prepaid Cash" },
        { value: "Add-on Cash", label: "Add-on Cash" }
      ]
    },
    kindOfLoan: {
      label: "Kind of Loan",
      options: [
        { value: "Salary Loan", label: "Salary Loan" },
        { value: "Benefits Loan", label: "Benefits Loan" },
        { value: "Merchandise Loan", label: "Merchandise Loan" },
        { value: "Others", label: "Others" }
      ]
    },
    paymentMethod: {
      label: "Payment Method",
      options: [
        { value: "Salary Deduction", label: "Salary Deduction" },
        { value: "Over-the-counter", label: "Over-the-counter" },
        { value: "Post Dated Check", label: "Post Dated Check" }
      ]
    }
  };
  

  return (
    <div className="dashboard">
      <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Loan Management</h1>
          <p className="opacity-75">
            Monitor and control active loans, pending requests, and repayment
            schedules.
          </p>
        </span>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center button-1 rounded-lg h-9">
            <img src={LoanIcon} className="size-5 invert brightness-0" />
            <p>Add New Loan</p>
          </span>
          <Profile />
        </div>
      </section>
      <main className="mt-10 p-4 bg-white rounded-lg">
        <section className="flex items-center gap-1 border-bottom pb-4">
          {navLinks.map((link, index) => (
            <span
              onClick={() => setSelectedNav(index)}
              key={link}
              className={`cursor-pointer hover:bg-hoverBg rounded-md py-2 px-4 ${
                selectedNav === index
                  ? "bg-secondary text-primary text-bold"
                  : "bg-white"
              }`}
            >
              {link}
            </span>
          ))}
        </section>
        <section className="mt-4 flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
          <div
                className="dropdown dropdown-select search-container text-sm"
              >
                <button className="dropbtn hover-1 gap-2 w-full">
                  <p className={`${selectedFilter === "Filter" && "opacity-50"}`}>
                    {!selectedFilter
                      ? "Filter"
                      : selectedFilter}
                  </p>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
    {Object.keys(loanOptions).map((key) => (
      <div key={key}>
        <h2 className="dropdown-label text-bold">{loanOptions[key].label}</h2>
        {loanOptions[key].options.map((option) => (
          <a
            href="#"
            className="dropdown-sublist-link hover-1"
            key={option.value}
            onClick={() => {
              // You can define your custom action here
              setSelectedFilter(option.value)
              console.log(`Selected: ${option.value}`);
            }}
          >
            {option.label}
          </a>
        ))}
      </div>
    ))}
  </div>
</div>
</div>
          
     

            <span>
              <p className="text-primary text-sm cursor-pointer"
              onClick={() => setSelectedFilter("Filter")}
              >Clear</p>
            </span>
          </div>
          <div className="flex gap-2">
          <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search by Books"
              />
            </span>
          <div className="search-container date-container">
            <div
              className="flex w-64 cursor-pointer gap-2 justify-between"
              onClick={() => {
                setIsDatePickerOpen(!isDatePickerOpen);
              }}
            >
              <div
                className="date-text"
              >
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <img src={dateIcon} alt="Date Icon" className="h-4" />
                  <p className="text-sm">
                    {selectedDate}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <img
                  src={downArrow}
                  alt="Add Icon"
                  className={`h-1.5 bottom-arrow ${isDatePickerOpen && "active"}`}
                />
              </div>
            </div>
            {isDatePickerOpen && (
              <div className="date-picker text-sm">
                <div className="from-to-date">
                  <div className="date-input">
                    <label htmlFor="" className="mr-2">
                      From
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => {
                        handleStartDateChange(e.target.value);
                        setSelectedDate(
                          `${moment(e.target.value).format(
                            "MMM DD, YYYY"
                          )} up to ${moment(endDate).format("MMM DD, YYYY")}`
                        );
                      }}
                      value={startDate}
                      max={moment().format("YYYY-MM-DD")}
                      min={minDate}
                    />
                  </div>
                  <div className="date-input">
                    <label htmlFor="" className="mr-2">
                      To
                    </label>
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => {
                        handleEndDateChange(e.target.value);
                        setSelectedDate(
                          `${moment(startDate).format(
                            "MMM DD, YYYY"
                          )} up to ${moment(e.target.value).format(
                            "MMM DD, YYYY"
                          )}`
                        );
                      }}
                      value={endDate}
                      max={moment().format("YYYY-MM-DD")}
                      min={minDate}
                    />
                  </div>
                </div>
                <div className="date-options">
                  <button
                    className={
                      selectedDate === "Today"
                        ? "bg-primary text-white"
                        : "hover-1"
                    }
                    onClick={() => handleDateRangeSelection("Today")}
                  >
                    Today
                  </button>
                  <button
                    className={
                      selectedDate === "This Month" ? "active" : "hover-1"
                    }
                    onClick={() => {
                      setSelectedDate("This Month");
                      handleDateRangeSelection("This Month");
                    }}
                  >
                    This Month
                  </button>
                  <button
                    className={
                      selectedDate === "This Year" ? "active" : "hover-1"
                    }
                    onClick={() => {
                      setSelectedDate("This Year");
                      handleDateRangeSelection("This Year");
                    }}
                  >
                    This Year
                  </button>
                  <button
                    className={`show-all-date hover-1`}
                    onClick={() => handleDateRangeSelection("All Time")}
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </section>
        <section className="mt-4">
          <table>
            <tr>
              <th>Member</th>
              <th>Loan Amount</th>
              <th>Loan Term</th>
              <th>Loan Type</th>
              <th>Kind of Loan</th>
              <th>Loan Start Date</th>
              <th>Due Date</th>
              <th>Repayment Status</th>
              <th>Actions</th>
            </tr>
            {loans.map((loan) => (
              <tr>
                <td>{loan.member}</td>
                <td>₱{loan.loanAmount.toFixed()}</td>
                <td>{loan.loanTerm} months</td>
                <td>{loan.loanType}</td>
                <td>{loan.kindOfLoan}</td>
                <td>{loan.loanStartDate}</td>
                <td>{loan.loanDueDate}</td>
                <td>{loan.repaymentStatus}</td>
                <td>
                <div
                className="dropdown dropdown-select search-container text-sm"
              >
                <button className="dropbtn hover-1 gap-2 w-full">
                  <p className={`${"opacity-50"}`}>
                  Select Action
                  </p>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
    {actions.map((action) => (
       <a
       href="#"
       className="dropdown-sublist-link hover-1"
       key={action}
       onClick={() => {
         setSelectedFilter(action)
       }}
     >
       {action}
     </a>
    ))}
  </div>
</div>
</div>
                </td>
              </tr>
            ))}
          </table>
        </section>
      </main>
    </div>
  );
};

export default LoanManagement;
