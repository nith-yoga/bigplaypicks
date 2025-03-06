const express = require("express");
const axios = require("axios");
const Team = require("../models/Team");
const League = require("../models/League");
const mongoose = require("mongoose");
const router = express.Router();

// Create Team
router.post("/create", async (req, res) => {
    try {
        // console.log("Incoming Team Creation Request:", req.body);
        
        const { name, userId, leagueId } = req.body;
        // console.log("Received userId:", userId);
        // console.log("Received leagueId:", leagueId);

        if (!name || !userId || !leagueId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format." });
        }
        if (!mongoose.Types.ObjectId.isValid(leagueId)) {
            return res.status(400).json({ message: "Invalid leagueId format" });
        }

        const validUserId = new mongoose.Types.ObjectId(userId);
        const validLeagueId = new mongoose.Types.ObjectId(leagueId);

        const newTeam = new Team({
            name,
            userId: validUserId,
            leagueId: validLeagueId,
        });

        await newTeam.save();
        res.status(201).json({ message: "Team created successfully!", team: newTeam });
    } catch (error) {
        console.error("Error creating team:", error); // Log actual error
        res.status(500).json({ message: "Server error", error: error.message }); // Send detailed error message in response
    }
});

// Fetch Team
router.get("/:userId/:leagueId", async (req, res) => {
    try {
        const { userId, leagueId } = req.params;

        const team = await Team.findOne({ userId, leagueId });

        if (!team) {
            return res.status(404).json({ message: "No team found for this user in this league" });
        }

        res.status(200).json({ team });
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ message: "Error fetching team", error: error.message });
    }
});

module.exports = router;