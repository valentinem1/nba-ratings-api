var express = require('express');
const { getAllPlayers, getOnePlayer, createPlayer, updatePlayer, deletePlayer, deleteAllplayers } = require('../controllers/playerController');
var router = express.Router();

// GET/POST Players
router.route('/')
    .get(getAllPlayers)
    .post(createPlayer)

// GET/PUT/DELETE Player
router.route('/:id')
    .get(getOnePlayer)
    .patch(updatePlayer)
    .delete(deletePlayer)

// DELETE all players from DB
router.route('/delete/deleteAll')
    .delete(deleteAllplayers)

module.exports = router;
