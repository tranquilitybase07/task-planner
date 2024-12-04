import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/login"; // Redirect to login
  };

  // Function to check if the token is valid
  const isLoggedIn = () => {
    if (!token) return false;
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp > currentTime; // Token is valid if it's not expired
    } catch (error) {
      return false; // Token is invalid
    }
  };

  const handleLogout = () => {
    logout(); // Clear the token and redirect to login
  };

  return (
    <div className="navbar bg-emerald-800 text-white shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl">
          Task Planner
        </Link>
      </div>
      <div className="flex-none">
        {isLoggedIn() ? (
          <ul className="menu menu-horizontal px-1 items-center">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-task">Add Task</Link>
            </li>
            <li>
              <Link to="/time-slots">Manage Time Slots</Link>
            </li>
            <li>
              <Link to="/schedule-tasks">AI Scheduler</Link>
            </li>
            <li>
              <button
                className="btn btn-success text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
