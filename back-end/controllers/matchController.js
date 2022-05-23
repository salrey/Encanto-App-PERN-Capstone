const express = require("express");

const match = express.Router();

const {
    requestMatch,
    receiveMatch,
    deleteMatch
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
    const getMatch = await receiveMatch(request_to, request_from);
    getMatch ? 
    res.json({ 
        success: true,
        payload: getMatch}) : 
    res.status(404).send({ 
        success: false,
        payload: "/page not found/"});
});


match.delete("/", async (req, res) => {
    console.log("DELETE a match from our matches table")
    const { id } = req.body;
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

module.exports = match;