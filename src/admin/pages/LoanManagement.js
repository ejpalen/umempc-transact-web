import { useEffect, useState } from "react";

import Profile from "../components/Profile";

import AreaChartComponent from "../components/AreaChart";
import BarChartComponent from "../components/BarChart";
import LineChartComponent from "../components/LineChart";

import LoanIcon from "../../assets/images/loan-management-icon.png";
import closeIcon from "../../assets/images/search-icon.png";
import dateIcon from "../../assets/images/date-icon.png";
import downArrow from "../../assets/images/down-arrow.png";
import viewIcon from "../../assets/images/view-icon.png";
import reminderIcon from "../../assets/images/reminder-icon.png";

import dashboardIcon from "../../assets/images/dashboard-icon.png";
import dashboardIconActive from "../../assets/images/dashboard-icon-active.png";
import settingsIcon from "../../assets/images/settings-and-configuration-icon.png";
import settingsIconActive from "../../assets/images/settings-and-configuration-icon-active.png";
import memberManagementIcon from "../../assets/images/member-management-icon.png";
import memberManagementIconActive from "../../assets/images/member-management-icon-active.png";
import loanManagementIcon from "../../assets/images/loan-management-icon.png";
import loanManagementIconActive from "../../assets/images/loan-management-icon-active.png";

const LoanManagement = () => {
  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const loanOverviewLinks = [
    {
      text: "Loan Overview",
      icon: settingsIcon,
      activeIcon: settingsIconActive,
      content: (
        <LoanOverview
          selectedFilter={selectedFilter}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
          setSelectedFilter={setSelectedFilter}
          AreaChart={AreaChartComponent}
        />
      ),
    },
  ];

  const loanReportsLinks = [
    {
      text: "Loan Status Report",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
      content: (
        <LoanStatusReport
          selectedFilter={selectedFilter}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
          setSelectedFilter={setSelectedFilter}
        />
      ),
    },
    {
      text: "Loan Aging Report",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
      content: (
        <LoanAgingReport
          selectedFilter={selectedFilter}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
          setSelectedFilter={setSelectedFilter}
        />
      ),
    },
  ];

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

      <section className="flex gap-4 items-start mt-10">
        <nav className="flex flex-col gap-1 flex-none">
          <p className="text-sm opacity-75 mt-2">Loan Overview</p>
          {loanOverviewLinks.map((link, index) => (
            <span
              key={index}
              className={`flex-1  cursor-pointer admin-nav-link flex items-center
          p-3 gap-2 rounded-md
          w-full flex-row justify-start ${
            activeLink === index && "active bg-default"
          }`}
              onClick={() => handleLinkClick(index)} // Only pass the index for overview links
            >
              <img
                className="h-4"
                src={activeLink === index ? link.activeIcon : link.icon}
                alt=""
              />
              <span
                className={`w-max text-sm ${
                  activeLink !== index ? "text-default" : "text-white"
                }`}
              >
                {link.text}
              </span>
            </span>
          ))}

          <p className="text-sm opacity-75 mt-2">Loan Reports</p>
          {loanReportsLinks.map((link, index) => (
            <span
              key={index}
              className={`cursor-pointer admin-nav-link flex items-center
          p-3 gap-2 rounded-lg
          w-full flex-row justify-start ${
            activeLink === index + loanOverviewLinks.length &&
            "active bg-default"
          }`} // Adjust index
              onClick={() => handleLinkClick(index + loanOverviewLinks.length)} // Adjust index
            >
              <img
                className="h-4"
                src={
                  activeLink === index + loanOverviewLinks.length
                    ? link.activeIcon
                    : link.icon
                }
                alt=""
              />
              <span
                className={`text-sm ${
                  activeLink !== index + loanOverviewLinks.length
                    ? "text-default"
                    : "text-white"
                }`}
              >
                {link.text}
              </span>
            </span>
          ))}
        </nav>

        {/* Render content based on active link */}
        {activeLink >= 0 &&
          activeLink < loanOverviewLinks.length &&
          loanOverviewLinks[activeLink].content}
        {activeLink >= loanOverviewLinks.length &&
          activeLink < loanOverviewLinks.length + loanReportsLinks.length &&
          loanReportsLinks[activeLink - loanOverviewLinks.length].content}
      </section>
    </div>
  );
};

export default LoanManagement;

const LoanOverview = ({ AreaChart }) => {
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

  const loanPerformanceByCategory = [
    {
      category: "Personal Loan",
      totalIssued: 3000000,
      totalRepaid: 2400000,
      outstanding: 600000,
      delinquencyRate: "5%",
      defaultRate: "1%",
      interestEarned: 100000,
    },
    {
      category: "Business Loan",
      totalIssued: 5000000,
      totalRepaid: 3500000,
      outstanding: 1500000,
      delinquencyRate: "15%",
      defaultRate: "4%",
      interestEarned: 250000,
    },
    {
      category: "Education Loan",
      totalIssued: 2000000,
      totalRepaid: 1500000,
      outstanding: 500000,
      delinquencyRate: "10%",
      defaultRate: "2%",
      interestEarned: 50000,
    },
  ];

  const loanRepaymentForecast = [
    {
      borrower: "John Doe",
      loanAmount: 500000,
      nextPaymentDueDate: "2024-10-15",
      outstandingBalance: 250000,
      expectedRepayment: 50000,
    },
    {
      borrower: "Jane Smith",
      loanAmount: 300000,
      nextPaymentDueDate: "2024-10-30",
      outstandingBalance: 100000,
      expectedRepayment: 30000,
    },
    {
      borrower: "Michael Johnson",
      loanAmount: 1000000,
      nextPaymentDueDate: "2024-11-01",
      outstandingBalance: 500000,
      expectedRepayment: 100000,
    },
  ];

  const delinquentLoans = [
    {
      loanID: "L001",
      borrower: "John Doe",
      outstanding: 200000,
      daysOverdue: 45,
      contactInfo: "john.doe@example.com",
    },
    {
      loanID: "L002",
      borrower: "Jane Smith",
      outstanding: 500000,
      daysOverdue: 60,
      contactInfo: "jane.smith@example.com",
    },
  ];

  const topBorrowers = [
    {
      borrower: "Michael Johnson",
      outstanding: 500000,
    },
    {
      borrower: "Jane Smith",
      outstanding: 300000,
    },
  ];

  const historicalLoanPerformance = [
    {
      year: 2023,
      totalLoansIssued: 10000000,
      totalRepaid: 7500000,
      outstanding: 2500000,
      delinquencyRate: "10%",
      defaultRate: "3%",
      interestEarned: 300000,
    },
    {
      year: 2024,
      totalLoansIssued: 12000000,
      totalRepaid: 9000000,
      outstanding: 3000000,
      delinquencyRate: "12%",
      defaultRate: "5%",
      interestEarned: 450000,
    },
  ];

  return (
    <main className=" p-4 bg-white rounded-lg flex-1">
      <section className="">
        <div className="flex gap-2 items-center justify-between">
          <span className="flex gap-2 items-center">
            <span className=" p-2 bg-primary rounded-full size-8 flex items-center justify-center">
              <img src={dashboardIconActive} className="w-auto h-4" />
            </span>
            <h1 className=" text-bold">Loan Overview</h1>
          </span>
          <div className="search-container date-container">
            <div
              className="flex w-56 cursor-pointer gap-2 justify-between"
              onClick={() => {
                setIsDatePickerOpen(!isDatePickerOpen);
              }}
            >
              <div className="date-text">
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <img src={dateIcon} alt="Date Icon" className="h-4" />
                  <p className="text-sm">{selectedDate}</p>
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
                  className={`h-1.5 bottom-arrow ${
                    isDatePickerOpen && "active"
                  }`}
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
        <div className="flex gap-12 border-bottom py-8">
          <span className="rounded-lg ">
            <p className="text-bold">Total Loans Issued</p>
            <h1 className="text-3xl">₱5,000,000</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Outstanding Loan Amount</p>
            <h1 className="text-3xl">₱1,200,000</h1>
          </span>
          <span className="rounded-lg">
            <p className="text-bold">Total Loans Repaid</p>
            <h1 className="text-3xl">₱3,500,000</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Interest Earned</p>
            <h1 className="text-3xl">₱250,000</h1>
          </span>
        </div>
      </section>
      <section>
        <div className="flex h-80 gap-4 mt-8 border-bottom pb-12">
          <div className="w-full">
            <p className="text-center pb-2">Repayment Trend</p>
            <BarChartComponent />
          </div>
          <div className="w-full">
            <p className="text-center pb-2">Delinquent Loans </p>
            <LineChartComponent />
          </div>
        </div>
        <div className="w-full h-80 mt-8 border-bottom pb-12">
          <p className="text-center pb-2">Loan Delinquency Trend</p>
          <AreaChart />
        </div>
      </section>
      <section className="mt-8">
        <div className="flex gap-2 items-center mb-4 justify-between">
          <p className="text-bold text-xl">Loan Performance by Category</p>
        </div>
        <table>
          <tr>
            <th>Category</th>
            <th>Total Issued</th>
            <th>Total Repaid</th>
            <th>Outstanding</th>
            <th>Delinquency Rate</th>
            <th>Default Rate</th>
            <th>Interest Earned</th>
          </tr>
          {loanPerformanceByCategory.map((loan) => (
            <tr>
              <td>{loan.category}</td>
              <td>₱{loan.totalIssued.toFixed()}</td>
              <td>₱{loan.totalRepaid.toFixed()}</td>
              <td>₱{loan.outstanding.toFixed()}</td>
              <td>₱{loan.totalIssued.toFixed()}</td>
              <td>{loan.defaultRate}</td>
              <td>{loan.interestEarned}</td>
            </tr>
          ))}
        </table>
      </section>
      <section className="mt-8">
        <div className="flex gap-2 items-center mb-4 justify-between">
          <p className="text-bold text-xl">Loan Repayment Forecast</p>
        </div>
        <table>
          <tr>
            <th>Borrower</th>
            <th>Loan Amount</th>
            <th>Next Payment Due Date</th>
            <th>Outstanding Balance</th>
            <th>Expected Repayment</th>
          </tr>
          {loanRepaymentForecast.map((loan) => (
            <tr>
              <td>{loan.borrower}</td>
              <td>₱{loan.loanAmount.toFixed()}</td>
              <td>{loan.nextPaymentDueDate}</td>
              <td>₱{loan.outstandingBalance.toFixed()}</td>
              <td>₱{loan.expectedRepayment.toFixed()}</td>
            </tr>
          ))}
        </table>
      </section>
      <section className="mt-8">
        <div className="flex gap-2 items-center mb-4 justify-between">
          <p className="text-bold text-xl">Top Borrowers</p>
        </div>
        <table>
          <tr>
            <th>Borrower</th>
            <th>Outstanding Balance</th>
          </tr>
          {topBorrowers.map((loan) => (
            <tr>
              <td>{loan.borrower}</td>
              <td>₱{loan.outstanding.toFixed()}</td>
            </tr>
          ))}
        </table>
      </section>
    </main>
  );
};

const LoanStatusReport = ({
  setSelectedFilter,
  selectedFilter,
  setSelectedNav,
  selectedNav,
}) => {
  const [selectedLoanStatus, setSelectedLoanStatus] = useState("Status");
  const [selectedLoanApplicationStatus, setSelectedLoanApplicationStatus] =
    useState("Filter");

  const loanApplicationStatus = [
    "All Loans",
    "Pending",
    "Approved",

    "Declined",
    "Overdue",
  ];

  const loanStatus = ["Active", "Defaulted"];

  const loanOptions = {
    loanType: {
      label: "Loan Type",
      options: [
        { value: "Prepaid Cash", label: "Prepaid Cash" },
        { value: "Add-on Cash", label: "Add-on Cash" },
      ],
    },
    kindOfLoan: {
      label: "Kind of Loan",
      options: [
        { value: "Salary Loan", label: "Salary Loan" },
        { value: "Benefits Loan", label: "Benefits Loan" },
        { value: "Merchandise Loan", label: "Merchandise Loan" },
        { value: "Others", label: "Others" },
      ],
    },
    paymentMethod: {
      label: "Payment Method",
      options: [
        { value: "Salary Deduction", label: "Salary Deduction" },
        { value: "Over-the-counter", label: "Over-the-counter" },
        { value: "Post Dated Check", label: "Post Dated Check" },
      ],
    },
  };

  const moment = require("moment");

  //Date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const currentDate = new Date();
  const [minDate, setMinDate] = useState();

  const loans = [
    {
      id: "12345",
      member: "Nomar Maestro",
      loanAmount: 35600.0,
      loanTerm: "5",
      loanType: "Prepaid Cash",
      kindOfLoan: "Salary Loan",
      loanStartDate: "08-12-2024",
      loanDueDate: "04-12-2025",
      paymentMethod: "Salary Deduction",
      repaymentStatus: "On Track",
      remainingBalance: 12000.0,
      nextPaymentDate: "11-12-2024",
    },
    {
      id: "67890",
      member: "Ellaine Cervantes",
      loanAmount: 35600.0,
      loanTerm: "5",
      loanType: "Prepaid Cash",
      kindOfLoan: "Salary Loan",
      loanStartDate: "08-12-2024",
      loanDueDate: "04-12-2025",
      paymentMethod: "Salary Deduction",
      repaymentStatus: "On Track",
      remainingBalance: 12000.0,
      nextPaymentDate: "11-12-2024",
    },
    {
      id: "11223",
      member: "Rafael Luna",
      loanAmount: 50000.0,
      loanTerm: "3",
      loanType: "Personal Loan",
      kindOfLoan: "Emergency Loan",
      loanStartDate: "07-15-2024",
      loanDueDate: "10-15-2024",
      paymentMethod: "Bank Transfer",
      repaymentStatus: "Overdue",
      remainingBalance: 25000.0,
      nextPaymentDate: "10-15-2024",
    },
    {
      id: "44556",
      member: "Marian delos Santos",
      loanAmount: 45000.0,
      loanTerm: "6",
      loanType: "Installment",
      kindOfLoan: "Business Loan",
      loanStartDate: "06-10-2024",
      loanDueDate: "12-10-2024",
      paymentMethod: "Online Payment",
      repaymentStatus: "Paid",
      remainingBalance: 0.0,
      nextPaymentDate: "-",
    },
    {
      id: "77889",
      member: "Carlos Reyes",
      loanAmount: 30000.0,
      loanTerm: "4",
      loanType: "Prepaid Cash",
      kindOfLoan: "Car Loan",
      loanStartDate: "09-01-2024",
      loanDueDate: "01-01-2025",
      paymentMethod: "Salary Deduction",
      repaymentStatus: "On Track",
      remainingBalance: 12000.0,
      nextPaymentDate: "12-01-2024",
    },
    {
      id: "99887",
      member: "Isabel Cruz",
      loanAmount: 60000.0,
      loanTerm: "6",
      loanType: "Installment",
      kindOfLoan: "Home Loan",
      loanStartDate: "05-01-2024",
      loanDueDate: "11-01-2024",
      paymentMethod: "Online Payment",
      repaymentStatus: "Late Payment",
      remainingBalance: 30000.0,
      nextPaymentDate: "10-31-2024",
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

  return (
    <main className="admin-min-height p-4 bg-white rounded-lg flex-1 overflow-x-scroll">
      <section className="">
        <div className="flex gap-2 items-center justify-between">
          <span className="flex gap-2 items-center">
            <span className=" p-2 bg-primary rounded-full size-8 flex items-center justify-center">
              <img src={dashboardIconActive} className="w-auto h-4" />
            </span>
            <h1 className=" text-bold">Loan Status Report</h1>
          </span>
          <div className="flex gap-2">
            <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search by Member Name"
              />
            </span>
            <div className="search-container date-container">
              <div
                className="flex w-56 cursor-pointer gap-2 justify-between"
                onClick={() => {
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
              >
                <div className="date-text">
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <img src={dateIcon} alt="Date Icon" className="h-4" />
                    <p className="text-sm">{selectedDate}</p>
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
                    className={`h-1.5 bottom-arrow ${
                      isDatePickerOpen && "active"
                    }`}
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
        </div>
        <div className="flex gap-12 border-bottom py-8">
          <span className="rounded-lg ">
            <p className="text-bold">Total Loans</p>
            <h1 className="text-3xl">150</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Total Paid Loans</p>
            <h1 className="text-3xl">30</h1>
          </span>

          <span className="rounded-lg ">
            <p className="text-bold">Total Pending Loans</p>
            <h1 className="text-3xl">60</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Total Approved Loans</p>
            <h1 className="text-3xl">5</h1>
          </span>

          <span className="rounded-lg ">
            <p className="text-bold">Total Loaned Amount</p>
            <h1 className="text-3xl">₱2,500,000</h1>
          </span>
        </div>
      </section>
      <section className="mt-8 border-bottom pb-4 flex gap-2 justify-between items-center">
        <section className="flex items-center gap-1">
          {loanApplicationStatus.map((link, index) => (
            <span
              onClick={() => setSelectedNav(index)}
              key={link}
              className={`text-sm cursor-pointer hover:bg-hoverBg rounded-md py-2 px-4 ${
                selectedNav === index
                  ? "bg-secondary text-primary text-bold"
                  : "bg-white"
              }`}
            >
              {link}
            </span>
          ))}
        </section>
        <div className="flex gap-2 items-center">
          <div className="dropdown dropdown-select search-container text-sm">
            <button className="dropbtn hover-1 gap-2 w-full">
              <p
                className={`${selectedLoanStatus === "Status" && "opacity-50"}`}
              >
                {!selectedLoanStatus ? "Status" : selectedLoanStatus}
              </p>
              <img src={downArrow} alt="" className="h-1.5 w-auto" />
            </button>
            <div className="dropdown-content-container mt-1">
              <div className="dropdown-content">
                {loanStatus.map((status) => (
                  <a
                    href="#"
                    className="dropdown-sublist-link hover-1"
                    onClick={() => {
                      setSelectedLoanStatus(status);
                    }}
                  >
                    {status}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-select search-container text-sm">
            <button className="dropbtn hover-1 gap-2 w-full">
              <p
                className={`${
                  selectedLoanApplicationStatus === "Filter" && "opacity-50"
                }`}
              >
                {!selectedLoanApplicationStatus
                  ? "Filter"
                  : selectedLoanApplicationStatus}
              </p>
              <img src={downArrow} alt="" className="h-1.5 w-auto" />
            </button>
            <div className="dropdown-content-container mt-1">
              <div className="dropdown-content">
                {Object.keys(loanOptions).map((key) => (
                  <div key={key}>
                    <h2 className="dropdown-label text-bold">
                      {loanOptions[key].label}
                    </h2>
                    {loanOptions[key].options.map((option) => (
                      <a
                        href="#"
                        className="dropdown-sublist-link hover-1"
                        key={option.value}
                        onClick={() => {
                          // You can define your custom action here
                          setSelectedLoanApplicationStatus(option.value);
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
            <p
              className="text-primary text-sm cursor-pointer"
              onClick={() => {
                setSelectedLoanApplicationStatus("Filter");
                setSelectedLoanStatus("Status");
              }}
            >
              Clear
            </p>
          </span>
        </div>
      </section>
      <section className="mt-2 pb-4">
        <table>
          <tr>
            {/* <th >
                <span className="pl-8 text-bold">
                Member
                </span>
                </th> */}
            <th>Member</th>
            <th>Loan Amount</th>
            <th>Loan Term</th>
            <th>Loan Type</th>
            <th>Issued Date</th>
            <th>Next Payment Date</th>
            <th>Repayment Status</th>
            <th></th>
          </tr>
          {loans.map((loan) => (
            <tr>
              {/* <td className="flex gap-4">
                <span className="search-container w-2 h-2 flex rounded-sm"></span>
                  <span>{loan.member}</span></td> */}
              <td>{loan.member}</td>
              <td>₱{loan.loanAmount.toFixed()}</td>
              <td>{loan.loanTerm} months</td>
              <td>{loan.loanType}</td>
              <td>{loan.loanStartDate}</td>
              <td>{loan.nextPaymentDate}</td>
              <td>{loan.repaymentStatus}</td>
              <td>
                <span className="flex items-center gap-1 bg-secondary w-max p-2 h-min rounded-md">
                  <img src={viewIcon} className="h-3.5 w-auto " />
                  <p className="">View Details</p>
                </span>
              </td>
            </tr>
          ))}
        </table>
      </section>
    </main>
  );
};

const LoanAgingReport = ({
  setSelectedFilter,
  selectedFilter,
  setSelectedNav,
  selectedNav,
}) => {
  const [selectedLoanStatus, setSelectedLoanStatus] = useState("Status");
  const [selectedLoanApplicationStatus, setSelectedLoanApplicationStatus] =
    useState("Filter");

  const loanStatus = ["All Loans", "Active", "Defaulted"];

  const loanOptions = {
    loanType: {
      label: "Loan Type",
      options: [
        { value: "Prepaid Cash", label: "Prepaid Cash" },
        { value: "Add-on Cash", label: "Add-on Cash" },
      ],
    },
    kindOfLoan: {
      label: "Kind of Loan",
      options: [
        { value: "Salary Loan", label: "Salary Loan" },
        { value: "Benefits Loan", label: "Benefits Loan" },
        { value: "Merchandise Loan", label: "Merchandise Loan" },
        { value: "Others", label: "Others" },
      ],
    },
    paymentMethod: {
      label: "Payment Method",
      options: [
        { value: "Salary Deduction", label: "Salary Deduction" },
        { value: "Over-the-counter", label: "Over-the-counter" },
        { value: "Post Dated Check", label: "Post Dated Check" },
      ],
    },
  };

  const moment = require("moment");

  //Date
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const currentDate = new Date();
  const [minDate, setMinDate] = useState();

  const loanAgingData = [
    {
      loanID: "L001",
      borrowerName: "John Doe",
      loanAmount: 5000,
      dueDate: "2024-09-15",
      overdueDays: 15,
      overdueAmount: 200,
      status: "Late",
      contactInfo: "john.doe@example.com",
    },
    {
      loanID: "L002",
      borrowerName: "Jane Smith",
      loanAmount: 10000,
      dueDate: "2024-07-30",
      overdueDays: 60,
      overdueAmount: 1500,
      status: "Delinquent",
      contactInfo: "jane.smith@example.com",
    },
    {
      loanID: "L003",
      borrowerName: "Michael Johnson",
      loanAmount: 7000,
      dueDate: "2024-08-10",
      overdueDays: 45,
      overdueAmount: 1000,
      status: "Delinquent",
      contactInfo: "michael.johnson@example.com",
    },
    {
      loanID: "L004",
      borrowerName: "Sarah Lee",
      loanAmount: 12000,
      dueDate: "2024-10-01",
      overdueDays: 5,
      overdueAmount: 300,
      status: "On-Time",
      contactInfo: "sarah.lee@example.com",
    },
    {
      loanID: "L005",
      borrowerName: "David Brown",
      loanAmount: 15000,
      dueDate: "2024-06-15",
      overdueDays: 90,
      overdueAmount: 2500,
      status: "Critical",
      contactInfo: "david.brown@example.com",
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

  return (
    <main className="loan-status-report p-4 bg-white rounded-lg flex-1 overflow-x-scroll">
      <section className="">
        <div className="flex gap-2 items-center justify-between">
          <span className="flex gap-2 items-center">
            <span className=" p-2 bg-primary rounded-full size-8 flex items-center justify-center">
              <img src={dashboardIconActive} className="w-auto h-4" />
            </span>
            <h1 className=" text-bold">Loan Aging Report</h1>
          </span>
          <div className="flex gap-2">
            <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search by Member Name"
              />
            </span>
            <div className="search-container date-container">
              <div
                className="flex w-56 cursor-pointer gap-2 justify-between"
                onClick={() => {
                  setIsDatePickerOpen(!isDatePickerOpen);
                }}
              >
                <div className="date-text">
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <img src={dateIcon} alt="Date Icon" className="h-4" />
                    <p className="text-sm">{selectedDate}</p>
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
                    className={`h-1.5 bottom-arrow ${
                      isDatePickerOpen && "active"
                    }`}
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
        </div>
        <div className="flex gap-12 border-bottom py-8">
          <span className="rounded-lg ">
            <p className="text-bold">Total Loans</p>
            <h1 className="text-3xl">150</h1>
          </span>
          <span className="rounded-lg ">
            <span>
              This is another test in the nexus fintech sales This i sthe next
              us just a test in the pan here hehe so many things eme eme thing
              sfdfsfps'fsf
            </span>
            <p className="text-bold">Total Active Loans</p>
            <h1 className="text-3xl">60</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Total Defaulted Loans</p>
            <h1 className="text-3xl">5</h1>
          </span>
          <span className="rounded-lg ">
            <p className="text-bold">Total Outstanding Balance</p>
            <h1 className="text-3xl">₱1,480,000</h1>
          </span>
        </div>
      </section>
      <section className="mt-8 border-bottom pb-4 flex gap-2 justify-between items-center">
        <section className="flex items-center gap-1">
          {loanStatus.map((link, index) => (
            <span
              onClick={() => setSelectedNav(index)}
              key={link}
              className={`text-sm cursor-pointer hover:bg-hoverBg rounded-md py-2 px-4 ${
                selectedNav === index
                  ? "bg-secondary text-primary text-bold"
                  : "bg-white"
              }`}
            >
              {link}
            </span>
          ))}
        </section>
        <div className="flex gap-2 items-center">
          <div className="dropdown dropdown-select search-container text-sm">
            <button className="dropbtn hover-1 gap-2 w-full">
              <p
                className={`${
                  selectedLoanApplicationStatus === "Filter" && "opacity-50"
                }`}
              >
                {!selectedLoanApplicationStatus
                  ? "Filter"
                  : selectedLoanApplicationStatus}
              </p>
              <img src={downArrow} alt="" className="h-1.5 w-auto" />
            </button>
            <div className="dropdown-content-container mt-1">
              <div className="dropdown-content">
                {Object.keys(loanOptions).map((key) => (
                  <div key={key}>
                    <h2 className="dropdown-label text-bold">
                      {loanOptions[key].label}
                    </h2>
                    {loanOptions[key].options.map((option) => (
                      <a
                        href="#"
                        className="dropdown-sublist-link hover-1"
                        key={option.value}
                        onClick={() => {
                          // You can define your custom action here
                          setSelectedLoanApplicationStatus(option.value);
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
            <p
              className="text-primary text-sm cursor-pointer"
              onClick={() => {
                setSelectedLoanApplicationStatus("Filter");
                setSelectedLoanStatus("Status");
              }}
            >
              Clear
            </p>
          </span>
        </div>
      </section>
      <section className="mt-2">
        <table>
          <tr>
            {/* <th >
                  <span className="pl-8 text-bold">
                  Member
                  </span>
                  </th> */}
            <th>Member</th>
            <th>Loan Amount</th>
            <th>Due Date</th>
            <th>Overdue Days</th>
            <th>Overdue Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {loanAgingData.map((loan) => (
            <tr>
              {/* <td className="flex gap-4">
                  <span className="search-container w-2 h-2 flex rounded-sm"></span>
                    <span>{loan.borrowerName}</span></td> */}
              <td>{loan.borrowerName}</td>
              <td>₱{loan.loanAmount.toFixed()}</td>
              <td>{loan.dueDate} months</td>
              <td>{loan.overdueDays}</td>
              <td>₱{loan.overdueAmount.toFixed()}</td>
              <td>{loan.status}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-secondary w-max p-2 h-min rounded-md">
                    <img src={viewIcon} className="h-3.5 w-auto " />
                    <p className="text">View Details</p>
                  </span>
                  <span
                    className="flex items-center gap-1  w-max p-2 h-min rounded-md hover:bg-secondary"
                    title="Send Reminder"
                  >
                    <img src={reminderIcon} className="h-3.5 w-auto " />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </section>
    </main>
  );
};
