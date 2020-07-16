const Player = require('../models/playerModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const request = require("request");
const fs = require('fs');
const neatCsv = require('neat-csv');

/////// FETCH TEAMS FROM EXTERNAL API ////////
// const options = {
//     method: 'GET',
//     url: 'https://free-nba.p.rapidapi.com/teams',
//     qs: {page: '0'},
//     headers: {
//         'x-rapidapi-host': 'free-nba.p.rapidapi.com',
//         'x-rapidapi-key': process.env.API_KEY,
//         useQueryString: true
//     }
// };

// request(options, async (error, response, body) => {
// 	if (error) throw new Error(error);

//     if(response.statusCode === 200){
//         const teamData = await JSON.parse(body).data;
//         const players = await Player.find();

//         players.forEach(player => {
        
//             try{
//                 teamData.forEach(async team => {
//                     if(player.team === team.abbreviation){
//                         // const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team });
//                         // playerData.update({ team: team });
//                         // const updated = await Player.updateOne({ _id: player._id }, { team: team });
//                     } else if(player.team === "BRK" && team.abbreviation === "BKN"){
//                         // const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team });
//                     } else if(player.team === "CHO" && team.abbreviation === "CHA"){
//                         // const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team });
//                     } else if(player.team === "PHO" && team.abbreviation === "PHX"){
//                         // const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team });
//                     } else if(player.team === "TOT"){
//                         // const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: "All teams combined" });
//                     }
//                 })
//             }catch(err){
//                 console.log(err);
//             }
//         })
//     }
// });

//////// FETCH DATA FROM CSV FILE /////////
// const data = fs.readFile(`${__dirname}/nbadata.csv`, async (error, data) => {
//     if (error) throw new Error(error);

//     const parsedData = await neatCsv(data);
//     parsedData.forEach(player => {
//             Player.create({
//                 first_name: player['﻿Player'].split(' ')[0],
//                 last_name: player['﻿Player'].split(' ')[1],
//                 position: player['Pos'],
//                 age: player['Age'],
//                 team: player['Tm'],
//                 game: player['G'],
//                 gameStarted: player['GS'],
//                 minutePlayed: player['MP'],
//                 fieldGoal: player['FG'],
//                 fieldGoalAttempt: player['FGA'],
//                 fieldGoalPercentage: player['FG%'],
//                 threePoint: player['3P'],
//                 threePointAttempt: player['3PA'],
//                 threePointPercentage: player['3P%'],
//                 twoPoint: player['2P'],
//                 twoPointAttempt: player['2PA'],
//                 twoPointPercentage: player['2P%'],
//                 effectiveFieldGoalPercentage: player['eFG%'],
//                 freeThrow: player['FT'],
//                 freeThrowAttempt: player['FTA'],
//                 freeThrowPercentage: player['FT%'],
//                 offensiveRebouds: player['ORB'],
//                 defensiveRebounds: player['DRB'],
//                 totalRebounds: player['TRB'],
//                 assists: player['AST'],
//                 steals: player['STL'],
//                 blocks: player['BLK'],
//                 personalFouls: player['PF'],
//                 turnovers: player['TOV'],
//                 points: player['PTS']
//             });
//     })
// });

exports.getAllPlayers = async (req, res) => {
    try{
        // ADVANCED FILTERING
        // spread the query to create a new object that can be modify
        const queryObj = { ...req.query };
        // save different query types that we then iterate over to delete them from the query url.
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
        const totalPlayers = await Player.countDocuments();
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
        const playersPerPage = players.length;
        // round up and return the total amount of pages
        const totalPages = Math.ceil(totalPlayers / limit);

        // response
        res.status(200).json({
            status: 'success',
            metadata: {
                current_page: page,
                players_per_page: playersPerPage,
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