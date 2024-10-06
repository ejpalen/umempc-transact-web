import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";

import closeIcon from "../../assets/images/search-icon.png";
import downArrow from "../../assets/images/down-arrow.png";
import dateIcon from "../../assets/images/date-icon.png";

import dashboardIcon from "../../assets/images/dashboard-icon.png";
import dashboardIconActive from "../../assets/images/dashboard-icon-active.png";
import settingsIcon from "../../assets/images/settings-and-configuration-icon.png";
import settingsIconActive from "../../assets/images/settings-and-configuration-icon-active.png";
import memberManagementIcon from "../../assets/images/member-management-icon.png";
import memberManagementIconActive from "../../assets/images/member-management-icon-active.png";
import loanManagementIcon from "../../assets/images/loan-management-icon.png";
import loanManagementIconActive from "../../assets/images/loan-management-icon-active.png";
import reportAnalyticsIcon from "../../assets/images/report-analytics-icon.png";
import reportAnalyticsIconActive from "../../assets/images/report-analytics-icon-active.png";


const ReportAndAnalytics = () => {
  const [selectedNav, setSelectedNav] = useState(0);

  
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const navLinks = ["All Members", "Regular", "Casual", "Part-time", "Retire"];


  const generalLedgerData = [
    { recordMonth: "31/01/2024", books: "BB", dr: 5884808.66, cr: 2080.90, balance: 5882727.76 },
    { recordMonth: "31/01/2024", books: "CDB", dr: null, cr: 38162.00, balance: 5844565.76 },
    { recordMonth: "31/01/2024", books: "CRB", dr: null, cr: 600.00, balance: 5843965.76 },
    { recordMonth: "31/01/2024", books: "GJ", dr: null, cr: 377868.10, balance: 5466097.66 },
    { recordMonth: "29/02/2024", books: "CDB", dr: 7114.00, cr: 119770.18, balance: 5353441.48 },
    { recordMonth: "29/02/2024", books: "CRB", dr: null, cr: 8700.00, balance: 5344741.48 },
    { recordMonth: "29/02/2024", books: "GJ", dr: 30457.73, cr: 408950.81, balance: 4966248.40 },
    { recordMonth: "31/03/2024", books: "CDB", dr: null, cr: 29227.42, balance: null },
    { recordMonth: "31/03/2024", books: "CRB", dr: null, cr: 26100.00, balance: null },
    { recordMonth: "31/03/2024", books: "GJ", dr: null, cr: 393805.66, balance: 393805.66 },
    { recordMonth: "30/04/2024", books: "CDB", dr: 42806.00, cr: 16919.69, balance: 367919.35 },
    { recordMonth: "30/04/2024", books: "GJ", dr: null, cr: 395788.93, balance: 763708.28 },
    { recordMonth: "31/05/2024", books: "GJ", dr: 436186.60, cr: 393238.06, balance: 720759.74 },
    { recordMonth: "30/06/2024", books: "CDB", dr: 92500.00, cr: 1300.00, balance: 629559.74 },
    { recordMonth: "30/06/2024", books: "GJ", dr: null, cr: 362800.77, balance: 993360.51 },
    { recordMonth: "31/07/2024", books: "CDB", dr: 800.00, cr: 2400.00, balance: 993960.51 },
    { recordMonth: "31/08/2024", books: "CDB", dr: null, cr: 1000.00, balance: null }
  ];

  const accountTitles = [
    "All",
    "Accounts Receivable - non trade",
    "Accumulated Depreciation - Linens and Uniforms",
    "Accumulated Depreciation - Machineries, Tools and Equipment",
    "Accumulated Depreciation FFE",
    "Bank Charges",
    "Cash in Bank - Bank of the Philippine Island (BPI)",
    "Cash in Bank - Landbank (LB)",
    "Cash in Bank - Metrobank (MB)",
    "Cash in Bank - Philippine National Bank (PNB)",
    "Cash in Bank - Philippine National Bank (PNB), Calzada Taguig Branch (CASA)",
    "Cash in Bank - Philippine Savings Bank (PSB)",
    "Cash in Bank- BPI (UMak Fund)",
    "Cash in Bank - Unionbank",
    "Cash in Bank- One Coop Bank",
    "Cash in Bank- RCBC",
    "Cash in Bank - Philippine National Bank (PNB), Guadalupe Branch (CASA)",
    "Collection & Management Services",
    "Commission Income",
    "Communication",
    "Community Development Fund",
    "Coop. Education & Training Fund (CETF)",
    "Deposit from Concessionaire",
    "Deposit to Suppliers",
    "Due to Non-Members",
    "Due to Union/Federation",
    "Financial Assets - PAMI Mutual Funds",
    "Financial Assets - Sun Life of Canada, Inc.",
    "Financial Assets at Cost- CLIMBS",
    "Financial Assets at Cost- Metro South Cooperative Bank",
    "Financial Assets at Cost- SIDC",
    "Financial Assets at Cost-NCMF",
    "Financial Assets- H&P Bukid ni Tatay",
    "Financial Assets- Manulife Peso Secure Investment",
    "Fund -in-trust:Computer Lab Fund",
    "Fund-in-Trust: UMAK ID Fund",
    "Fund-in-trust: Umak Grad Fund",
    "Fund-in-trust: Umak Special Purpose Fund",
    "Fund-in-trust: Tiangge Fund",
    "Fund-in-trust: IOA Lecture Series",
    "Furniture, Fixtures & Equipment (FFE)",
    "General Assembly Expenses",
    "Income from Consumers Operations-Sale of Documentary Stamp",
    "Income from Consumer Operations",
    "Income from Other Business",
    "Income from Uniforms",
    "Income from Books",
    "Insurance",
    "Interest Income from Loans",
    "Interest on Share Capital Payable",
    "Inventory - ID Lace- Umak- NEW PRICE",
    "Inventory-Documentary Stamps",
    "Inventory-Scantron Paper",
    "Inventory - College Uniform",
    "Inventory - P. E Uniform",
    "Linens and Uniforms",
    "Loans Receivable - Interest Receivable",
    "Loans Receivable - Past Due",
    "Loans Receivable - Current",
    "Machineries, Tools and Equipment",
    "Meetings and Conferences",
    "Membership Fee",
    "Miscellaneous Income",
    "Office Supplies",
    "Optional Fund",
    "Other Current Liabilities",
    "Other Current Liabilities -Electric Deposit",
    "Other Current Liabilities -UMAK Electric Charges",
    "Other Income-Kiosk Rental",
    "Other Non-Current Liabilities-Loan Protection Plan",
    "Other Non-Current Liabilities-Members Benefits Fund",
    "Other Payables-(Unearned Interest)",
    "Paid-up Share Capital",
    "Patronage Refund Payable",
    "Photo Service Income",
    "PPE-Vendo Corp",
    "Professional Fees",
    "Receivables- Canteen",
    "Receivables- CGMakati, Cashier (Payroll Collection)",
    "Representation",
    "Reserve Fund",
    "Retirement Payable",
    "Revolving Fund- Cash Advance Loan",
    "Revolving Fund-True Money",
    "Revolving Fund-BDO- JPRizal TD",
    "Salaries & Wages",
    "Savings Deposit",
    "School Program Support",
    "Service Fees",
    "Service Income",
    "SSS,Philhealth, ECC, Pag-ibig Premium Contributions",
    "SSS/ECC/ Philhealth/Pag-ibig Premium Contributions Payable",
    "Taxes, Fees and Charges",
    "Toga Rental Income",
    "Trainings & Seminar",
    "Travel & Transportation",
    "Unused Supplies",
    "Withholding Tax Payable"
  ];

  const commulativeMonths = [
    "31/01/2024",
    "29/02/2024",
    "31/03/2024",
    "30/04/2024",
    "31/05/2024",
    "30/06/2024",
    "31/07/2024",
    "31/08/2024"
  ];

  const financialReportLinks = [
    {
      path: "/admin/dashboard",
      text: "General Ledger",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
      content: <GeneralLedger
      generalLedgerData={generalLedgerData}
      accountTitles={accountTitles}
      commulativeMonths={commulativeMonths}
      
      />
    },
    
  ];

  const loanReportLinks = [

    {
      path: "/admin/settings-and-configurations",
      text: "Loan Status Report",
      icon: settingsIcon,
      activeIcon: settingsIconActive,
      content: <LoanStatusReport
      generalLedgerData={generalLedgerData}
      accountTitles={accountTitles}
      commulativeMonths={commulativeMonths}
      
      />
    },
    {
      path: "/admin/dashboard",
      text: "Loan Aging Report",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Loan Repayment Report",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
  
    
  ];
  
  const analyticsLinks = [
    {
      path: "/admin/dashboard",
      text: "Loan Performance",
      icon: dashboardIcon,
      activeIcon: dashboardIconActive,
    },
    {
      path: "/admin/loan-management",
      text: "Cash Flow",
      icon: loanManagementIcon,
      activeIcon: loanManagementIconActive,
    },
    {
      path: "/admin/member-management",
      text: "Member Engagement",
      icon: memberManagementIcon,
      activeIcon: memberManagementIconActive,
    },
    
  ];
  

  return (
    <div className="dashboard">
        <section className="flex gap-2 justify-between items-start">
        <span>
          <h1 className="text-2xl text-bold">Report & Analytics</h1>
          <p className="opacity-75">
          Generate, review, and analyze key financial and operational reports for the loan management system.
          </p>
        </span>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center button-1 rounded-lg h-9">
            {/* <img src={LoanIcon} className="size-5 invert brightness-0" /> */}
            <p>Export Report</p>
          </span>
          <Profile />
        </div>
      </section>
      <section className="flex gap-8 items-start mt-10">
      <nav className="flex flex-col gap-1">
         <p className="text-sm opacity-75 mt-2">Loan Reports</p>
        {loanReportLinks.map((link, index) => (
          <span
            to={link.path}
            className={`cursor-pointer admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index  && "active bg-default"
            }`}
            onClick={() => handleLinkClick(index)}
          >
              <img className="h-4"
                src={activeLink === index ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index ? "text-default" : "text-white"}`}>{link.text}</span>
          </span>
        ))}
           <p className="text-sm opacity-75 mt-2">Analytics</p>
        {analyticsLinks.map((link, index) => (
          <span
            to={link.path}
            className={`cursor-pointer admin-nav-link flex items-center
              p-3 gap-2 rounded-lg
              w-full flex-row justify-start ${index === -1 && "nav-link-loan"} ${
              activeLink === index + 10 && "active bg-default"
            }`}
            onClick={() => handleLinkClick(index + 10)}
          >
              <img className="h-4"
                src={activeLink === index + 10 ? link.activeIcon : link.icon}
                alt=""
              />
            <span className={`text-sm ${activeLink !== index + 10 ? "text-default" : "text-white"}`}>{link.text}</span>
          </span>
        ))}
      </nav>
      
      {activeLink >= 0 && activeLink < loanReportLinks.length && loanReportLinks[activeLink].content}

      </section>
    </div>
  );
};

export default ReportAndAnalytics;


const GeneralLedger = ({generalLedgerData, accountTitles,commulativeMonths}) => {

const [selectedAccountTitle, setSelectedAccountTitle] = useState("");
const [selectedCommulativeDate, setSelectedCommulativeDate] = useState("");

  return(
    <main className="p-4 bg-white rounded-lg flex-1">
        <section className="flex gap-4 mb-4 border-bottom pb-4">
        <span className="bg-secondary p-4 rounded-lg">
        <p className="opacity-75">Account Code</p>
        <h1 className="text-2xl text-bold">11340</h1>
        </span>
        <span className="p-4">
        <p className="opacity-75">Total Debit (Dr.)</p>
        <h1 className="text-2xl text-bold">₱6,494,672.99</h1>
        </span>
        <span className="p-4">
        <p className="opacity-75">Total Credit  (Dr.)</p>
        <h1 className="text-2xl text-bold">₱62,578,712.52         </h1>
        </span>
        
        
        </section>
        <section className=" flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
          <div
                className="dropdown  w20rem dropdown-select search-container text-sm "
              >
                <button className="dropbtn hover-1 gap-2 w-full" title={selectedAccountTitle}>
                  <div className=" overflow-hidden" >
                  <p className={`${"opacity-50"} w-max`}>
                  {!selectedAccountTitle
                      ? "Account Title"
                      : selectedAccountTitle}
                  </p>
                  </div>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
  <div className="search-container flex gap-1 items-center overflow-hidden mb-2">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search Account Title"
              />
            </div>
    {accountTitles.map((account) => (
       <a
       href="#"
       className="dropdown-sublist-link hover-1"
       onClick={() => {
        setSelectedAccountTitle(account)
       }}
     >
       {account}
     </a>
    ))}
  </div>
</div>
</div>
<div
                className="dropdown w18rem dropdown-select search-container text-sm "
              >
                <button className="dropbtn hover-1 gap-2 w-full" title={selectedCommulativeDate}>
                  <div className=" overflow-hidden">
                  <p className={`${"opacity-50"} w-max`}>
                  {!selectedCommulativeDate
                      ? "Commulative Date"
                      : selectedCommulativeDate}
                  </p>
                  </div>
                  <img src={downArrow} alt="" className="h-1.5 w-auto" />
                </button>
          <div className="dropdown-content-container mt-1">
  <div className="dropdown-content">
    {commulativeMonths.map((month) => (
       <a
       href="#"
       className="dropdown-sublist-link hover-1"
       onClick={() => {
        setSelectedCommulativeDate(month)
       }}
     >
       {month}
     </a>
    ))}
  </div>
</div>
</div>
            <span>
              <p className="text-primary text-sm cursor-pointer" onClick={() =>{
                setSelectedAccountTitle("")
                setSelectedCommulativeDate("")
              }}>Clear</p>
            </span>
            
          </div>
          <div>
          <span className="search-container ml-4 flex gap-1 items-center overflow-hidden">
              <img src={closeIcon} alt="" className="size-4" />
              <input
                type="text"
                name="search"
                id=""
                className="border-none text-sm"
                placeholder="Search"
              />
            </span>
          </div>
        </section>
        <section className="mt-4">
          <table>
            <tr>
              <th>Record Month</th>
              <th>Books</th>
              <th>Dr.</th>
              <th>Cr.</th>
              <th>Balance</th>
            </tr>
            {generalLedgerData.map((ledger) => (
              <tr>
                <td>{ledger.recordMonth}</td>
                <td>{ledger.books}</td>
                <td>₱{ledger.dr}</td>
                <td>₱{ledger.cr}</td>
                <td>₱{ledger.balance}</td>
              </tr>
            ))}
          </table>
        </section>
      </main>
  )
}

const LoanStatusReport = ({generalLedgerData, accountTitles,commulativeMonths}) => {

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

  
    return(
      <main className=" p-4 bg-white rounded-lg flex-1">
      <section className="mt-4 flex gap-2 items-center justify-between">
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
    )
  }
