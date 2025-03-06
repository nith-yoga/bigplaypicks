import React, { useEffect, useState } from "react";
import "./Draft.css";
import { useNavigate } from "react-router-dom";

const Draft = () => {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [error, setError] = useState(null);

    // Replace with the leagueId you have in your state
    const leagueId = localStorage.getItem("currentLeagueId");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user ? user.id : null; 

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch players from TheSportsDB API
        const handleFetchPlayers = async () => {
            try {
                const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Jalen Hurts`);
                const data = await response.json();
                // console.log("Fetched Players:", data.player);

                // Check if players are returned
                if (data.player && data.player.length > 0) {
                    setAvailablePlayers(data.player);
                } else {
                    setError("No players found in TheSportsDB.");
                }
            } catch (error) {
                setError("Error fetching players: " + error.message);
            }
        };

        handleFetchPlayers();
    }, []);

    // Handle selecting a player
    const handleSelectPlayer = (player) => {
        setSelectedPlayer(player);
    };

    // Handle drafting a player
    const handleDraftPlayer = async (playerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/draft/${userId}/${leagueId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setSelectedPlayer(data.player);  // Add drafted player to state
                navigate("/dashboard");  // Redirect to dashboard after drafting
            } else {
                console.error("Error drafting:", data.message);
            }
        } catch (error) {
            console.error("Drafting error:", error);
        }
    };    

    return (
        <div className="draft-board">
            <h2>Draft Your Player</h2>
            {error && <p className="error">{error}</p>}

            {/* Display available players */}
            <div className="players-list">
                {availablePlayers.map((player) => (
                    <div key={player.idPlayer} className="player-card" onClick={() => handleSelectPlayer(player)}>
                        <img src={player.strThumb} alt={player.strPlayer} />
                        <h3>{player.strPlayer}</h3>
                        <p>{player.strTeam}</p>
                    </div>
                ))}
            </div>

            {/* Draft Button for Selected Player */}
            {selectedPlayer && (
                <div className="draft-button">
                    <button onClick={() => handleDraftPlayer(selectedPlayer.idPlayer)}>Draft {selectedPlayer.strPlayer}</button>
                </div>
            )}
        </div>
    );
};

export default Draft;
