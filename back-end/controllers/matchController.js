const express = require("express");

const match = express.Router();

const {
    requestMatch,
    receiveMatch,
    deleteMatch,
    updateMatchStatus,
    getAllMatch
} = require('../queries/matches');

match.post('/', async (req, res) => {
    console.log("POST/ you are hitting a match");
    const { body } = req;
    const matchRequest = await requestMatch(body.request_from, body.request_to)
    matchRequest ? res.json({ 
        success: true, 
        payload: matchRequest }) :
    res.status(404).send({
        success: false,
        payload: "/this match is not found/" });
});

match.get('/', async (req, res) => {
    console.log("GET a match from our matches table")
    const { request_to, request_from } = req.query;
    const getMatch = await receiveMatch(request_to, request_from);
    if (getMatch) {
        if (getMatch.result) {
            res.json({
                success: false,
                payload: {}
            })
        } else {
            res.json({ 
                success: true,
                payload: getMatch}) 
        }
    } else {
        res.status(404).send({ 
            success: false,
            payload: "/page not found/"});
    }
});

match.post('/get-match', async (req, res) => {
    const {currentUser_id, request_status} = req.body;
    const statusMatch = await getAllMatch(currentUser_id, request_status);
    console.log("are we getting these?: ", currentUser_id, request_status)
    console.log("from statusMatch controller")
    if (statusMatch) {
        res.json({
            success:true,
            payload: statusMatch
        })
    } else {
        res.status(404).send({
            success:false,
            payload:"/page not found"
        })
    }

})

match.delete("/", async (req, res) => {
    console.log("DELETE a match from our matches table")
    const { id } = req.query;
    // console.log(req)
    const deletedMatch = await deleteMatch(id);
    console.log("DeletedMatch", deletedMatch)
    deletedMatch ?
    res.json({ 
        success: true,
        payload: deletedMatch}) : 
    res.status(404).send({ 
        success: false,
        payload: "/page not found/"});
})

match.put("/", async (req, res) => {
    console.log("UPDATED a match with yes or no")
    const { match, match_id } = req.body;
    const updatedMatch = await updateMatchStatus(match, match_id);
    console.log("Updated Match", updatedMatch)
    updatedMatch ? 
    res.json({ 
        success: true, 
        payload: updatedMatch}) :
        res.status(404).send({
        success: false,
        payload: "/page not found/" });
    });




module.exports = match;