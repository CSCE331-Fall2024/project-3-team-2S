import './ManagerHeader.css';
import Logo from "../../assets/images/logo.png";
import ManagerProfileDropdown from '../../components/ManagerProfileDropdown/ManagerProfileDropdown';
import { useNavigate } from 'react-router-dom';

function ManagerHeader({ activePage }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="manager-header-container">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Manager</h1>
        <div className="bar"></div>

        {/* Manager Navigation */}
        <div className="manager-nav">
          <span
            onClick={() => navigate("/orderhistory")}
            className={activePage === "Order History" ? "active-nav" : ""}
          >
            Order History
          </span>
          <span
            onClick={() => navigate("/inventory")}
            className={activePage === "Inventory" ? "active-nav" : ""}
          >
            Inventory
          </span>
          <span
            onClick={() => navigate("/fooditems")}
            className={activePage === "Food Items" ? "active-nav" : ""}
          >
            Food Items
          </span>
          <span
            onClick={() => navigate("/employees")}
            className={activePage === "Employees" ? "active-nav" : ""}
          >
            Employees
          </span>

          {/* Reports Dropdown */}
          <div className="reports-dropdown-container">
            <span
              className={`reports-span ${activePage.includes("Report") ? "active-nav" : ""}`}
            >
              Reports ▼
            </span>
            <div className="reports-dropdown">
              <span 
                onClick={() => navigate("/reports/xreport")}
                className={activePage === "X Report" ? "active-nav" : ""}
              >
                X-Report
              </span>
              <span 
                onClick={() => navigate("/reports/zreport")}
                className={activePage === "Z Report" ? "active-nav" : ""}
              >
                Z-Report
              </span>
              <span 
                onClick={() => navigate("/reports/totalsales")}
                className={activePage === "Total Sales" ? "active-nav" : ""}
              >
                Total Sales
              </span>
              <span 
                onClick={() => navigate("/reports/grossrevenue")}
                className={activePage === "Gross Revenue" ? "active-nav" : ""}
              >
                Gross Revenue
              </span>
              <span 
                onClick={() => navigate("/reports/employeeproductivity")}
                className={activePage === "Employee Productivity" ? "active-nav" : ""}
              >
                Employee Productivity
              </span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="manager-profile-dropdown">
            <ManagerProfileDropdown />
          </div>
          <button className="sign-out-button" onClick={() => navigate("/")}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerHeader;