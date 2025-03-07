import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate.push("/login");
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get("https://bigplaypicks-production.up.railway.app/api/user/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (error) {
                    setError("Unable to fetch user data");
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            <h1>Welcome, {userData?.email}</h1>
            <p>User ID: {userData?._id}</p>
            <p>Email: {userData?.email}</p>
        </div>
    );
}

export default Profile;