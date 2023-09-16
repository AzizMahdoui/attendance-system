import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import avatar from "../../assets/avatar.png";
import Profile from "../Profile/Profile";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFilePersonFill } from "react-icons/bs";
import { BiSolidTimeFive } from 'react-icons/bi';
import {AiFillSchedule} from "react-icons/ai"

export default function Navbar() {
  const profileSnippet = {
    firstName: "Michael Jackson",
    role: "Manager",
    avatar: avatar
  };

  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <ul className="links-list">
          <li>
            <Link
              to="/dashboard"
              className={`link-item ${location.pathname === "/dashboard" ? "active-link" : ""}`}
            >
              <LuLayoutDashboard size={26} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className={`link-item ${location.pathname === "/employees" ? "active-link" : ""}`}
            >
              <BsFilePersonFill size={26} />
              Employees
            </Link>
          </li>
          <li>
            <Link
              to="/attendance"
              className={`link-item ${location.pathname === "/attendance" ? "active-link" : ""}`}
            >
              <BiSolidTimeFive size={26} />
              Attendance
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className={`link-item ${location.pathname === "/schedule" ? "active-link" : ""}`}
            >
              <AiFillSchedule size={26} />
              Scheduling
            </Link>
          </li>
        </ul>
        <div className="profile">
          <Profile
            firstName={profileSnippet.firstName}
            role={profileSnippet.role}
            avatar={profileSnippet.avatar}
          />
        </div >
      </div>

      <hr style={{ width: "100%" }}></hr>
    </div>
  );
}
