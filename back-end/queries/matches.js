// Import database
const db = require("../db/dbConfig");


// For POST
const requestMatch = async (current_user_id, match_user_id) => {

    try {
        console.log("Hitting requestMatch query")
        console.log("current-user", current_user_id, "match-user", match_user_id);
        const sendMatchRequest = await db.one("INSERT INTO match_requests (request_from, request_to) VALUES ($1, $2) RETURNING *", [current_user_id, match_user_id]);
        return sendMatchRequest;
    } catch (error) {
        console.log("Error from sendMatchRequest query ");
    }
};

// For GET
const receiveMatch = async (request_to, request_from) => {
    try{
        console.log("Hitting receiveMatch query ");
        const getMatch = await db.one("SELECT * FROM match_requests WHERE request_to=$1 AND request_from=$2", [request_to, request_from]);
        return getMatch;
    } catch (error) {
        console.log("Error from receiveMatch query ");
    }
}
// For DELETE
const deleteMatch = async (match_id) => {
    try{
        console.log("Hitting deleteMatch query ");
        console.log("Match id", match_id);
        const deletedMatch = await db.one("DELETE FROM match_requests WHERE id=$1 RETURNING *", match_id);
        return deletedMatch;
    } catch (error) {
        console.log("Error from deleteMatch query ");
    }
};

// For PUT
const updateMatchStatus = async (match, match_id) => {

    const {request_from, request_to, request_status, date_created, date_accepted} = match;
  try{
    console.log("Hitting from updateMatchStatus query ");
    console.log("Match is: ", match);
    console.log("match_id is: ", match_id);

    const updateMatchStatus = await db.one("UPDATE match_requests SET request_from=$1, request_to=$2, request_status=$3, date_created=$4, date_accepted=$5 WHERE id=$6 RETURNING *", [request_from, request_to, request_status, date_created, date_accepted, match_id]);
    return updateMatchStatus;
    
  }catch(err) {
    console.log("Error from updateMatchStatus query ");
  }
}


// Export queries 
module.exports = {
   requestMatch,
   receiveMatch,
   deleteMatch,
   updateMatchStatus
};


