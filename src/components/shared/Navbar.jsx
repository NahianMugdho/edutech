import React from "react";
import { Link } from "react-router";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {


 const links = <>
       <li>
    <Link to="/" className="mx-2">
      Home
    </Link>
  </li>
  <li>
    <Link to="/dashboard" className="mx-2">
      Dashboard
    </Link>
  </li>
  <li>
    <Link to="/about" className="mx-2">
      About us
    </Link>
  </li>
  <li>
    <Link to="/login" className="mx-2">
      Courses
    </Link>
  </li>
  {/* <li>
    <Link to="/register" className="mx-2">
      Register
    </Link>
  </li> */}
  <li>
    <ThemeSwitcher />
  </li>

     
    
    
    </>


  return (
    
    



<>
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">BornoByte</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn"><Link to="/login" className="mx-2">Login</Link></a>
    <a className="btn"><Link to="/register" className="mx-2">
      Register
    </Link></a>
  </div>
</div>













    </>
  );
};

export default Navbar;
