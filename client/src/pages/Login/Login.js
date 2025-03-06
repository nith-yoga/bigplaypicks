import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Login Handler
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage("Email and password are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error.response?.data || error);
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Pasword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <div className="register-link">
                <p>Don't have an account? <button onClick={() => navigate("/register")}>Register here</button></p>
            </div>
        </div>
    );
}

export default Login;