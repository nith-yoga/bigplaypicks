const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        commissioner: { type: String, required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
        matchups: [
            {
                team1: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
                team2: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
                week: { type: Number, required: true }
            }
        ]
    },
    { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

module.exports = League;