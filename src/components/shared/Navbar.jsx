import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Corrected import for react-router-dom
import AuthContext from '../Auth/AuthContext'; // Assuming AuthContext is correctly located
import ThemeSwitcher from "./ThemeSwitcher"; // Assuming ThemeSwitcher is in the same directory as Navbar

const Navbar = () => {
    // Destructure user and logOut from AuthContext
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Sign-out successful');
                // Optional: You might want to navigate to a different page after logout
                // For example: navigate('/'); if you use useNavigate hook
            })
            .catch((error) => {
                console.error('An error occurred during sign-out:', error);
            });
    };

    // Define the navigation links
    const links = (
        <>
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
            {/* Conditional rendering for Courses or Login/Register in the main menu */}
            {user ? (
                // If user is logged in, show Courses link
                <li>
                    <Link to="/courses" className="mx-2">
                        Courses
                    </Link>
                </li>
            ) : (
                // If user is NOT logged in, show Login/Register as separate links in the main menu
                <>
                    <li>
                        <Link to="/login" className="mx-2">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="mx-2">
                            Register
                        </Link>
                    </li>
                </>
            )}
            <li>
                <ThemeSwitcher />
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                {/* Logo and Website Name */}
                <a className="btn btn-ghost text-xl">BornoByte</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-2"> {/* Added gap for spacing between elements */}
                {/* User Profile Dropdown or Login/Register Buttons */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden border">
                                <img
                                    alt="User Profile"
                                    src={
                                        user.photoURL ||
                                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // Default image if no photoURL
                                    }
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                {/* Display user's name or email */}
                                <span className="text-sm font-bold">{user.displayName || user.email}</span>
                            </li>
                            <li>
                                <Link to="/queries">Dashboard</Link> {/* Changed from "myqueries" to "queries" as per your first Navbar */}
                            </li>
                            <li>
                                <button onClick={handleLogOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // If not logged in, show Login and Register buttons
                    <>
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/register" className="btn">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;