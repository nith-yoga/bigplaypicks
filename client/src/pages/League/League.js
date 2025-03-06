import React, { useEffect, useState } from "react";
import "./League.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function League() {
    const { id } = useParams();
    const location = useLocation();
    const selectedLeague = location.state?.league;

    const [leagueData, setLeagueData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch League connected to UserId
        const fetchLeagueData = async () => {
            setLoading(true);

            try {
                if (selectedLeague) {
                    setLeagueData(selectedLeague);
                } else {
                    const response = await axios.get(`http://localhost:5000/api/league/${id}`)
                    setLeagueData(response.data);
                }
            } catch (error) {
                console.error("Error fetching league:", error);
            } finally {
                setLoading(false);
            };
        };

        fetchLeagueData();
    }, [id, selectedLeague]);

    if (loading) {
        return <div className="loading">Loading League Data...</div>;
    }

    if (!leagueData) {
        return <div className="error">League not found</div>
    }

    return (
        <div className="league-container">
            <aside className="team-dashboard">
                <h2>Your Team</h2>
                <p>Record: 3-1</p>
                <p>Points Scored: 500</p>
            </aside>

            <div className="league-main">
                <section className="league-info">
                    <h1>{leagueData.name}</h1>
                    <p>Commissioner: {leagueData.commissioner || "Unknown"}</p>
                    <p>Members: {leagueData.members || 0}</p>
                </section>

                <section className="matchups">
                    <h2>Matchups This Week</h2>
                    {leagueData.matchups?.map((matchup, index) => (
                        <div key={index} className="matchup-card">
                            <p>{matchup.team1} vs {matchup.team2}</p>
                            <p>Projected Score: {matchup.score}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default League;