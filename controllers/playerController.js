const Player = require('../models/playerModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const request = require('request');
// const { query } = require('express');

// FETCH DATA FROM EXTERNAL API
// let i = 1;
// while(i < 33){
//     const options = {
//     method: 'GET',
//     url: 'https://free-nba.p.rapidapi.com/players',
//     qs: {page: `${i.toString()}`, per_page: '200'},
//     headers: {
//         'x-rapidapi-host': 'free-nba.p.rapidapi.com',
//         'x-rapidapi-key': process.env.API_KEY,
//         useQueryString: true
//     }
// }
//     const playersData = request(options, async (error, response, body) => {
//         try{
//             const parsedResponse = await JSON.parse(body);
//             // console.log(parsedResponse);
//             parsedResponse.data.forEach(player => {
//                 // console.log(player.team);
//                 Player.create({
//                     first_name: player.first_name,
//                     last_name: player.last_name,
//                     position: player.position,
//                     team: '',
//                     image: 'https://www.gannett-cdn.com/-mm-/88ad73dcd7f9cf7083fa7d0646d58a6cf78f5734/c=0-0-1023-578/local/-/media/Indianapolis/Indianapolis/2014/11/14/635515695508990009-inidc5-5klnrw8e1gmksld9g1i-original.jpeg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
//                     team: player.team
//                 });
//             });
//         }catch(err){
//             console.log(err);
//         }
//     })
// i++
// }

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
        // console.log(req.query, req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);

        let query = Player.find(JSON.parse(queryStr));

        // SORTING
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     query = query.sort(sortBy);
        // }
        // else{
        //     query = query.sort('-createdAt');
        // };

        // PAGINATION
        const page = parseInt(req.query.page) || 1;
        const limit = 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numPlayers = await Player.countDocuments();
            if(skip >= numPlayers) throw new Error('This page does not exist');
        }

        // sort the query by first_name alphabetic order
        query = query.sort('last_name');

        const players = await query;
        // return amount of players per page
        const playersPerPage = players.length;
        // return total amount of players in DB
        const totalPlayers = await Player.countDocuments();
        // return total amount of pages
        const totalPages = Math.round(totalPlayers / limit);

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