const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    position: String,
    age: Number,
    team: Object,
    game: Number,
    gameStarted: Number,
    minutePlayed: Number,
    fieldGoal: Number,
    fieldGoalAttempt: Number,
    fieldGoalPercentage: Number,
    threePoint: Number,
    threePointAttempt: Number,
    threePointPercentage: Number,
    twoPoint: Number,
    twoPointAttempt: Number,
    twoPointPercentage: Number,
    effectiveFieldGoalPercentage: Number,
    freeThrow: Number,
    freeThrowAttempt: Number,
    freeThrowPercentage: Number,
    offensiveRebouds: Number,
    defensiveRebounds: Number,
    totalRebounds: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    personalFouls: Number,
    turnovers: Number,
    points: Number
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;