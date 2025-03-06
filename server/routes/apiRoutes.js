const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// TheSportsDB API URL
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

// GET Players
router.get('/players/:name', async (req, res) => {
    try {
        const playerName = req.params.name.replace(/\s/g, '_');
        const apiUrl = `${API_BASE_URL}/searchplayers.php?p=${playerName}`;
        // console.log(`Making API request to: ${apiUrl}`);

        const response = await axios.get(apiUrl);
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching player data:", error.message);
        res.status(500).json({ error: "Error fetching player data" });
    }
});

// GET Teams
router.get('/teams/:league', async (req, res) => {
    try {
        const leagueName = req.params.league;
        const response = await axios.get(`${API_BASE_URL}/search_all_teams.php?l=${leagueName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching team data" });
    }
});

// Draft Handling | ADD player to team
router.post("/draft/:playerId", async (req, res) => {
    try {
        const userId = req.user.id;
        const { playerId } = req.params;

        const response = await axios.get(`${API_BASE_URL}/searchplayers.php?p=${playerId}`);
        const player = response.data.players[0];

        const userTeam = await Team.findOne({ userId });

        if (userTeam.players.includes(playerId)) {
            return res.status(400).json({ error: 'Player already drafted' });
        }

        userTeam.players.push(playerId);
        await userTeam.save();

        res.status(200).json({ message: "Player drafted successfully", player});
    } catch (error) {
        console.error("Error drafting player:", error.message);
        res.status(500).json({ error: "Error drafting player" });
    }
});

// FETCH Drafted Players
router.get("/team/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const userTeam = await Team.findOne({ userId }).populate("players");

        if (!userTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ team: userTeam });
    } catch (error) {
        console.error("Error fetching team data:", error.message);
        res.status(500).json({ error: "Error fetching team data" });
    }
});

module.exports = router;