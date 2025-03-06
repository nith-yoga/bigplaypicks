const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "League",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    players: [
        {
            playerId: String,
            playerName: String
        },
    ],
    record: { type: String, default: "0-0" },
    standing: { type: String, default: "N/A"},
    currentMatchup: { type: String, default: "N/A" }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
