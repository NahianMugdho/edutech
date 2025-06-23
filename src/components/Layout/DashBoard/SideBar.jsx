import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-64 p-4">
      <h1 className="text-xl mb-4">Dashboard Sidebar</h1>
      <ul>
        <li className="mb-2">
          <Link to="/">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/">others route for dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/">others route for dashboard</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
