const express = require("express");

const match = express.Router();

const {
    requestMatch,
    receiveMatches
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
    console.log("GET all matches from our matches table")
    const getAllMatches = await receiveMatches();
    getAllMatches ? 
    res.json({ 
        success: true,
            payload: getAllMatches}) : 
    res.status(404).send({ 
        success: false,
            payload: "/page not found/"});
});




module.exports = match;