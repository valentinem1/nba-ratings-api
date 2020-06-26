const Player = require('../models/playerModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const request = require('request');

const options = {
    method: 'GET',
    url: 'https://free-nba.p.rapidapi.com/players',
    qs: {page: '0', per_page: '25'},
    headers: {
        'x-rapidapi-host': 'free-nba.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY,
        useQueryString: true
    }
};

const playersData = request(options, async (error, response, body) => {
    try{
        const parsedResponse = await JSON.parse(body);
        console.log(parsedResponse);
    } catch(err){
        console.log(err);
    }
})

exports.getAllPlayers = async (req, res) => {
    try{
        // 2) ADVANCED FILTERING
        // spread the query to create a new object that can be modify
        const queryObj = { ...req.query };
        // save different query types that we then iterate over to delete them from the query url.
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach(el => delete queryObj[el]);

        // stringify the query to be able to the replace method on it
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);
        // Mongodb query
        // parse it to be an object as mongodb query takes objects as arguments
        const query = JSON.parse(queryStr)
        const players = await Player.find(query);
        
        res.status(200).json({
            status: 'success',
            players
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



// exports.pgPlayers = async (req, res) => {
//     try{
//         const players = await Player.find({ position: { $eq: "PG"}})

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 players
//             }
//         })
//     } catch (err){
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     };
// };