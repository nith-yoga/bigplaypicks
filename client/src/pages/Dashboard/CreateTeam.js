import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [error, setError] = useState(null);
    const [currentLeagueId, setCurrentLeagueId] = useState(null);

    const navigate = useNavigate();

    /* const user = JSON.parse(localStorage.getItem("user") || "{}");
       console.log(user); */
    /* const userId = user ? user.id : null;
       console.log("Extracted userId:", userId); */

    useEffect(() => {
        const storedLeagueId = localStorage.getItem("currentLeagueId");
        // console.log("Extracted leagueId:", storedLeagueId);
        if (storedLeagueId) {
            setCurrentLeagueId(storedLeagueId);
        } else {
            navigate("/join-league");
        }
    }, [navigate]);

    // Handling Team Creation
    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setError(null);
    
        const userString = localStorage.getItem("user");
        // console.log("User data from localStorage:", userString);
    
        let user = {};
        try {
            user = JSON.parse(userString);
        } catch (error) {
            console.error("Error parsing user JSON:", error);
        }
    
        // console.log("Parsed user object:", user);
        const userId = user ? user.id : null;  // Make sure userId is just the string
    
        // console.log("Extracted userId:", userId);
        // console.log("Current leagueId:", currentLeagueId);

        if (!userId || !currentLeagueId || !teamName) {
            setError("Missing required fields.");
            return;
        }
        console.log("Current leagueId:", currentLeagueId);
    
        // Posting Created Team
        try {
            const response = await fetch("http://localhost:5000/api/team/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: teamName,
                    userId: userId, 
                    leagueId: currentLeagueId 
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // console.log("Team created:", data.team);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                localStorage.setItem("userId", userId);
                localStorage.setItem("teamId", data.team._id);
                navigate(`/draft/${currentLeagueId}`);
            } else {
                setError(data.message || "Failed to create team.");
            }
        } catch (error) {
            console.error("Error creating team:", error);
            setError("Server error. Please try again later.");
        }
    };    

    return (
        <div className="create-team-container">
            <h2>Create Your Team</h2>
            <form onSubmit={handleCreateTeam}>
                <label>Team Name:</label>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Create Team</button>
            </form>
        </div>
    )

};

export default CreateTeam;