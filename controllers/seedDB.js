//////// SEED DB WITH XLSX FILES ////////
const Player = require('../models/playerModel');
const XLSX = require('xlsx');

const seedDB = () => {
    for(let year = 2010; year <= 2020; year++){
        const workbook = XLSX.readFile(`${__dirname}/nba-stats-excel/nba-stats-${year}.xlsx`);
        const sheet_name_list = workbook.SheetNames;
    
        const playersData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

        playersData.forEach(player => {
            if(player['Player'] !== 'Player'){
                // Player.create({
                //     first_name: player['Player'].split(' ')[0],
                //     last_name: player['Player'].split(' ')[1],
                //     full_name: player['Player'],
                //     age: player['Age'],
                //     team: player['Tm'],
                //     year: year,
                //     position: player['Pos'],
                //     stats: { 
                //         game: player['G'],
                //         gameStarted: player['GS'],
                //         minutePlayed: player['MP'],
                //         fieldGoal: player['FG'],
                //         fieldGoalAttempt: player['FGA'],
                //         fieldGoalPercentage: player['FG%'],
                //         threePoint: player['3P'],
                //         threePointAttempt: player['3PA'],
                //         threePointPercentage: player['3P%'],
                //         twoPoint: player['2P'],
                //         twoPointAttempt: player['2PA'],
                //         twoPointPercentage: player['2P%'],
                //         effectiveFieldGoalPercentage: player['Effective Field Goal Percentage\nThis statistic adjusts for the fact that a 3-point field goal is worth one more point than a 2-point field goal." >eFG%'],
                //         freeThrow: player['FT'],
                //         freeThrowAttempt: player['FTA'],
                //         freeThrowPercentage: player['FT%'],
                //         offensiveRebounds: player['ORB'],
                //         defensiveRebounds: player['DRB'],
                //         totalRebounds: player['TRB'],
                //         assists: player['AST'],
                //         steals: player['STL'],
                //         blocks: player['BLK'],
                //         personalFouls: player['PF'],
                //         turnovers: player['TOV'],
                //         points: player['PTS']
                //     }
                // })
            }
        })
        console.log(`seeding year: ${year}`);
    };
}

module.exports = seedDB;