const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require ("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Registration
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        // console.log("User registered successfully:", newUser);
        console.log("User registered successfully:", newUser);
        res.status(201).json({ user: newUser });

    } catch (error) {
        // console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid login attempt" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//Logout
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});

module.exports = router;