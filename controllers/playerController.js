const Player = require('../models/playerModel');
const seedDB = require('./seedDB');
const fetchTeams = require('./fetchTeamsApiCall');

// seedDB();
// fetchTeams();


exports.getAllPlayers = async (req, res) => {
    try{
        // ADVANCED FILTERING
        // spread the query to create a new object that can be modify
        const queryObj = { ...req.query };

        // save different query types that we then iterate over to delete them from the query url.
        // delete the query types so we don't pass them in the query to the database
        // with this setup having pagination our queryObj will return {} and not { page: '2 } 
        // as the DB doesn't know about pages
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach(el => delete queryObj[el]);
        
        // stringify the query to be able to the replace method on it
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);

        // find all players in DB.
        // parse the query string to be an object as MongoDB only accept objects
        let query = Player.find(JSON.parse(queryStr));

        // PAGINATION
        // parse page to a number
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // return total amount of players in DB
        // pass the queryStr as argument to count the number of players depending on the request
        // ex: if the request looks like http://localhost:3000/players?[year][eq]=2010
        // passing in the queryStr will pass {"year":{"$eq":"2010"}} as argument to the DB to count players for 2010
        // but if queryStr doesn't have any specification it will count all the players in the DB.
        const totalPlayers = await Player.countDocuments(JSON.parse(queryStr));
        // check if the skip number is bigger than the number of documents in DB
        // if bigger it means the pagination is bigger than the num of docs so throw an error
        if(req.query.page){
            // const numPlayers = await Player.countDocuments();
            if(skip >= totalPlayers) throw new Error('This page does not exist');
        }

        // sort the query by last_name alphabetic order
        query = query.sort('last_name');

        const players = await query;
        // return amount of players per page
        // const playersPerPage = players.length;
        // round up and return the total amount of pages
        const totalPages = Math.ceil(totalPlayers / limit);

        // response
        res.status(200).json({
            status: 'success',
            metadata: {
                current_page: page,
                players_per_page: limit,
                total_pages: totalPages,
                total_players: totalPlayers
            },
            players
        });
    } catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        });
    };
};

// exports.playersPerSeasons = async (req, res) => {
//     const queryObj = { ...req.query }

// }

exports.getOnePlayer = async (req, res) => {
    try{
        const player = await Player.findById(req.params.id);

        // response
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

exports.deleteAllplayers = async (req, res) => {
    try{
        await Player.deleteMany();

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}


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