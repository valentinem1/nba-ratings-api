//////// SCRAPE HTML FROM WEBSITE AND SAVE IT INTO EXCEL FILE //////////
const fs = require('fs');

// const webScraping = () => {
    // for(let year = 2004; year <= 2020; year++){
    //     const nbaUrl = `https://www.basketball-reference.com/leagues/NBA_${year}_totals.html`;
        
    //     request(nbaUrl, async (error, response, body) => {
    //     	if (error) throw new Error(error);
        
    //         if(response.statusCode === 200){
    //             let statsTable = body.slice(body.indexOf('<table class="sortable stats_table" id="totals_stats" data-cols-to-freeze="2" data-non-qual="1" data-qual-text="" data-qual-label=" When table is sorted, hide non-qualifiers for rate stats">'), body.indexOf('</table>'));
                
    //             statsTable+='</table>'
        
    //          fs.writeFile(`${__dirname}/nba-stats-excel/nba-stats-${year}.xlsx`, statsTable, (error) => {
    //                 if(error) throw new Error(error);
        
    //                 console.log('file saved! 🤩');
    //             });
    //         }
    //     });
    // }
// }