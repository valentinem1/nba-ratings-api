const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    full_name: String,
    age: Number,
    team: Object,
    position: String,
    year: Number,
    stats: Object
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;