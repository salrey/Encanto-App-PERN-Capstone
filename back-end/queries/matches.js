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
const receiveMatches = async () => {

    try{
        const getAllMatches = await db.any("SELECT * FROM match_requests");
        return getAllMatches;
    } catch (error) {
        console.log("Error from receiveMatches query ");
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
   receiveMatches,
};


