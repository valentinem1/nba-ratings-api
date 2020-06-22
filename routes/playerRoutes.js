var express = require('express');
const { getAllPlayers, getOnePlayer, createPlayer } = require('../controllers/playerController');
var router = express.Router();

// GET/POST Players
router.route('/')
    .get(getAllPlayers)
    .post(createPlayer)

// GET/PUT/DELETE Player
router.route('/:id')
    .get(getOnePlayer)

module.exports = router;
