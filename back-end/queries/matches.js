// Import database
const db = require("../db/dbConfig");

// /request_from, request_to, request_status,

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

// Update an existing artist post
const updateMatchStatus = async (match_id, match) => {
    const {request_status} = match
  try{

    const editedArtist = await db.one("UPDATE match_requests SET request_status=$1 WHERE id=$2 RETURNING *", [request_status, match_id])


    return editedArtist;
    
  }catch(err) {
    return err;
  }
}

// // Select all users
// const getMatch = async (request_from_id, request_to_id, request_status) => {
//     try{
//         const match = await db.one("SELECT * FROM users WHERE request_from=$1 AND request_to=$2", [request_from_id, request_to_id]);
//         return match;
//     }catch (error) {
//         console.log("Error from getEveryUser query ")
//     }
// }

// // Get one user
// const getOneUser = async (id) => {
//     try{
//         const oneUser = await db.one("SELECT * FROM users WHERE id=$1", id);

//         return oneUser
//     }catch (error) {
//         console.log("Error from getOneUser query");
//         return error;
//     }
// };


// Export queries 
module.exports = {
   requestMatch,
   receiveMatch,
   deleteMatch
};


