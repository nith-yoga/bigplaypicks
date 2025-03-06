import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        // Check user token for login session
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            setIsLoggedIn(true);
            setUser(user);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    // handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="title">Big Play Picks</h1>
                <h3 className="subtitle">Fantasy Football League</h3>
            </div>
            <div className="navbar-center">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/JoinLeague" className="nav-link">Join A League</Link>
                <Link to="/Dashboard" className="nav-link">Team</Link>
            </div>
            <div className="navbar-right">
                {isLoggedIn ? (
                    <div>
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="login-button">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="login-button">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;