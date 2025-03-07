require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ 
    origin: "https://bigplaypicks-20dk4k064-nith-yogas-projects.vercel.app", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}));

app.use((req, res, next) => {
    // console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

//Import Routes
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const leagueRoutes = require("./routes/leagueRoutes");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const draftRoutes = require("./routes/draftRoutes");

//Use Routes
app.use("/api/user", userRoutes);
app.use("/api", apiRoutes);
app.use("/api/league", leagueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/draft", draftRoutes);

//Root Route
app.get("/", (req, res) => {
    res.send("Big Play Picks API is running...");
})

// Test Route
// app.get("/api/test", (req, res) => {
//     res.send("Test route working!");
// });

//404 Handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

