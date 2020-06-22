const Player = require('../models/playerModel');

exports.getAllPlayers = async (req, res) => {
    try{
        const players = await Player.find();

        res.status(200).json({
            status: 'success',
            data: {
                players
            }
        });
    } catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
};

exports.getOnePlayer = async (req, res) => {
    try{
        console.log(req.params.id);
        const player = await Player.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                player
            }
        })
    } catch (err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
};

exports.createPlayer = async (req, res) => {
    try{
        const createdAt = req.requestTime;
        const body = {...req.body, createdAt};
        const newPlayer = await Player.create(body);

        res.status(201).json({
            status: 'success',
            data: {
                player: newPlayer
            }
        });
    } catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
}

exports.updatePlayer = async (req, res) => {
    try{
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            status: 'success',
            data: {
                player: updatedPlayer
            }
        });
    } catch (err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
};

exports.deletePlayer = async (req, res) => {
    try{
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
                deletedPlayer
            }
        });
    } catch (err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
};