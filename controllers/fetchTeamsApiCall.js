/////// FETCH TEAMS FROM EXTERNAL API ////////
const Player = require('../models/playerModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const request = require("request");

const fetchTeams = () => {
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/teams',
        qs: {page: '0'},
        headers: {
            'x-rapidapi-host': 'free-nba.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY,
            useQueryString: true
        }
    };
    
    request(options, async (error, response, body) => {
        if (error) throw new Error(error);
    
        if(response.statusCode === 200){
            const teamData = await JSON.parse(body).data;
            const players = await Player.find();
    
            players.forEach(player => {
                try{
                    // teamData.forEach(async team => {
                    //     if(player.team === team.abbreviation){
                    //         const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team } );
                    //     } else if(player.team === "BRK" && team.abbreviation === "BKN"){
                    //         const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team } );
                    //     } else if(player.team === "CHO" && team.abbreviation === "CHA"){
                    //         const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team } );
                    //     } else if(player.team === "PHO" && team.abbreviation === "PHX"){
                    //         const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: team } );
                    //     } else if(player.team === "TOT"){
                    //         const playerData = await Player.findByIdAndUpdate({ _id: player._id }, { team: "All teams combined" } );
                    //     }
                    // })
                }catch(err){
                    console.log(err);
                }
            })
        }
    });
}

module.exports = fetchTeams;