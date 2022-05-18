
const express = require("express");

const login = express.Router();

const {getEveryUser} = require("../queries/users");

// Get all users for login 
login.get('/', async (_, res) => {
    console.log("GET all users / from users");
    try {
        const everyUser = await getEveryUser();
        res.status(200).json({
            success: true,
            payload: everyUser
        })
    }catch (err) {
        throw err;
    }
})

module.exports = login