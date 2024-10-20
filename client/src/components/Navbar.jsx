import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Dropdown } from "antd"; // Import Dropdown from Ant Design
import logo from "../assets/logo.jpeg";
import avatar from "../assets/login.png"; // Ensure avatar image is imported
import { getUserDetails } from "../util/GetUser";// Import getUserDetails from your utils
import "./Navbar.css";

function Navbar({ active }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate(); // Use navigate inside the component

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("toDoAppUser");
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <header>
      <nav className="navbar">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
          <h4>ToDo</h4>
        </div>

        <ul className="navigation-menu">
          <li>
            <Link to="/" className={active === "home" ? "activeNav" : ""}>
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/to-do-list"
                className={active === "myTask" ? "activeNav" : ""}
              >
                My Tasks
              </Link>
            </li>
          )}
          {user ? (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <div className="userInfoNav">
                <img src={avatar} alt="User Avatar" />
                <span>
                  {user?.firstName
                    ? `Hello, ${user?.firstName} ${user?.lastName}`
                    : user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
