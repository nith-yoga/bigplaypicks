import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateLeague.css";

function CreateLeague() {
    const [leagueName, setLeagueName] = useState("");
    const [leagueType, setLeagueType] = useState("public");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
    
        const token = localStorage.getItem("token");
        console.log("Retrieved Token:", token); // ✅ Debugging token
    
        if (!token) {
            setErrorMessage("Authentication error: No token found.");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/league/create",
                { name: leagueName, type: leagueType },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            console.log("Creating league with:", { name: leagueName, type: leagueType });
            console.log("Server Response:", response.data);
    
            if (response.data) {
                localStorage.setItem("currentLeagueId", response.data._id);
                navigate(`/league/${response.data._id}`);
            }
        } catch (error) {
            console.error("League creation error:", error.response?.data || error);
            setErrorMessage("Failed to create league. Please try again.");
        }
    };
    
    return (
        <div className="create-league-container">
            <h1>Create a League</h1>
            <form onSubmit={handleSubmit}>
                <label>League Name:</label>
                <input
                    type="text"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                    required
                />
                <label>League Type:</label>
                <select value={leagueType} onChange={(e) => setLeagueType(e.target.value)}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <button type="submit">Create League</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default CreateLeague;