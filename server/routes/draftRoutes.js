const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Team = require("../models/Team");

// Draft player route
router.post('/:userId/:leagueId', async (req, res) => {
    const { userId, leagueId } = req.params;
    const { playerId } = req.body;  // User ID comes from the request body

    try {
        // Fetch player data from external API
        const playerResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`);
        const playerData = await playerResponse.json();
        // console.log("API Response:", playerData);
        const player = playerData.players ? playerData.players[0] : null;

        if (!player) {
            return res.status(404).json({ message: 'Player not found in external API' });
        }

        // Find the user and add the player to their team
        // console.log("User ID from request:", userId);
        const team = await Team.findOne({ userId, leagueId });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        if (!team.players) {
            team.players = [];
        }

        team.players.push({ playerId, playerName: player.strPlayer });
        await team.save();

        res.status(200).json({ message: 'Player drafted successfully', player });
    } catch (error) {
        console.error("Draft Error:", error);
        res.status(500).json({ message: 'Error drafting player' });
    }
});

module.exports = router;