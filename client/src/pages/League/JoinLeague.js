import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JoinLeague.css";

const JoinLeague = () => {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState([]);

    // Fetch leagues from the server
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/league/leagues");
                const data = await response.json();
                setLeagues(data);
                // console.log("Fetched leagues:", data);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchLeagues();
    }, []);

    // Handle Select League
    const handleSelectLeague = async (league) => {
        // console.log("Selected league object:", league); 
        // console.log("Selected league ID:", league._id);
    
        // Get token and user info from localStorage
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!token || !user) {
            console.error("User is not authenticated");
            return;
        }
    
        // Send token with the request to join the league
        try {
            const response = await axios.post(
                "http://localhost:5000/api/league/join", 
                { leagueId: league._id, userId: user.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log("Joined league response:", response.data);
            navigate("/create-team");  // Navigate to Team Creation
        } catch (error) {
            console.error("Error joining league:", error.response?.data || error);
        }
    };      

    return (
        <div className="join-league-container">
            <h1>Join a League</h1>
            <p>Select a league to join and start playing!</p>

            <div className="league-list">
                {leagues.length > 0 ? (
                    leagues.map((league) => (
                        <div key={league._id} className="league-item">
                            <h3>{league.name}</h3>
                            <p>{league.members?.length || 0} members</p>
                            <button className="join-button" onClick={() => handleSelectLeague(league)}>
                                Join
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading leagues...</p>
                )}
            </div>

            <div className="create-league">
                <p>Can't find the right league?</p>
                <button className="create-button" onClick={() => navigate("/CreateLeague")}>
                    Create a League
                </button>
            </div>
        </div>
    );
};

export default JoinLeague;
