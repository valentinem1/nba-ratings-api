const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'A player must have a first name.'],
        // removes white space
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'A player must have a last name.'],
        trim: true
    },
    position: {
        type: String,
        require: [true, 'A played must have a position'],
        trim: true
    },
    team: {
        type: String,
        trim: true
    }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;