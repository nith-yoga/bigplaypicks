import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
    const [team, setTeam] = useState(null);
    const userId = localStorage.getItem("userId");
    const currentLeagueId = localStorage.getItem("currentLeagueId");

    useEffect(() => {
        // console.log("Fetching team for user:", userId, currentLeagueId);
        const url = `https://bigplaypicks-production.up.railway.app/api/team/${userId}/${currentLeagueId}`;
        // console.log("Request URL:", url);
    
        // Display Team Information
        if (userId && currentLeagueId) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.team) {
                        setTeam(data.team);
                    } else {
                        console.error("No team found in this league");
                    }
                })
                .catch((error) => console.error("Error fetching team:", error));
        }
    }, [userId, currentLeagueId]);

    return (
        <div className="team-container">
            {team ? (
                <>
                    {/* Team Dashboard */}
                    <div className="team-dashboard">
                        <h1>{team.name}</h1>
                        <p>Record: {team.record}</p>
                        <p>Standing: {team.standing}</p>
                        <p>Current Matchup: {team.currentMatchup}</p>
                    </div>
    
                    {/* Team Roster */}
                    <div className="roster">
                        <h2>Your Roster</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Position</th>
                                    <th>Projected Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {team.players && team.players.length > 0 ? (
                                    team.players.map((player, index) => (
                                        <tr key={index}>
                                            <td>{player.name}</td>
                                            <td>{player.position}</td>
                                            <td>{player.projectedPoints ?? "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No players drafted yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="loading-container">
                    <h2>Loading your team...</h2>
                    <p>Please wait while we fetch your team data.</p>
                </div>
            )}
        </div>
    );    
}

export default Dashboard;