const express = require("express");
const mongoose = require("mongoose");
const router =  express.Router();
const League = require ("../models/League");
const verifyToken = require("../middleware/verifyToken");

router.get("/leagues", async (req, res) => {
    try {
        const leagues = await League.find();
        res.status(200).json(leagues);
    } catch (error) {
        console.error("Error fetching leagues:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid League ID format." });
        }

        const league = await League.findById(id);

        if (!league) {
            return res.status(404).json({ message: "League not found" });
        }

        res.json(league);
    } catch (error) {
        console.error("Error fetching league:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/create", verifyToken, async (req, res) => {
    // console.log("Create League route hit");

    // console.log("Request User:", req.user);

    if (!req.user || !req.user.userId) {
        return res.status(400).json({ message: "User authentication failed. No user ID found." });
    }

    const { name, type } = req.body;

    if (!name) {
        return res.status(400).json({ message: "League name is required" });
    }

    try {
        const newLeague = new League({
            name,
            type,
            commissioner: req.user.userId, // Ensure this is a valid user ID
            members: [req.user.userId]
        });

        const savedLeague = await newLeague.save();
        res.status(201).json(savedLeague);
    } catch (err) {
        console.error("Error saving league:", err);
        res.status(500).json({ message: "Server error: Unable to create league" });
    }
});

router.post("/join", verifyToken, async (req, res) => {
    const { leagueId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(leagueId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    try {
        const league = await League.findById(leagueId);
        if (!league) {
            return res.status(404).json({ message: "League not found" });
        }

        if (league.members.includes(userId)) {
            return res.status(400).json({ message: "User is already a member of this league" });
        }

        league.members.push(userId);
        await league.save();
        
        return res.status(200).json({ message: "Successfully joined the league", league });
    } catch (error) {
        console.error("Error joining league:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;