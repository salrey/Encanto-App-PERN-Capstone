const express = require("express");
const bcrypt = require("bcrypt");

const users = express.Router();

const {
    getAllUsers,
    getOneUser,
    updateUser,
    createUser,
 
} = require("../queries/users");

//Get all filtered users based on food preference -> (Done in queries)
users.get('/', async (req, res) => {
    console.log("GET all filtered users / from users");
    try {
        const allFilteredUsers = await getAllUsers(req.query.food_pref);
        allFilteredUsers ? 
        res.json({
            success: true,
            payload: allFilteredUsers
        }) : res.status(404).send({
            success: false,
            payload: "/No users with same preferences found"
        })
    }catch (err){
        throw err
    }
});

//Get one user
users.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("GET /:id from filtered users");
    try{
        const oneUser = await getOneUser(id);
        oneUser.result ? 
        res.status(404).send({
            success: false,
            payload: `/User ${id} not found`
        }) : res.json({
            success: true,
            payload: oneUser
        })
    } catch (err) {
        throw err
    }
});

//Update user
users.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("Update user information ");
    try {
        const updatedUser = await updateUser(id, body);
        updatedUser.id && updatedUser.name ?
        res.json({
            success: true,
            payload: updatedUser
        }) : res.status(404).send({
            success: false,
            payload: "/User not found"
        })
    } catch (err) {
        throw err
    }
})

// Register new user 
users.post('/register', async (req, res) => {
    const { body } = req;
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const user = await createUser(body, hashedPassword)
        console.log("hashedPW: ", hashedPassword)
        console.log("user: ", user)
        user ? res.status(200).json({ 
            success: true, 
            payload: user 
        }) : res.status(404).send({
            success: false,
            payload: "/user not found" });
    } catch(err) {
        throw err
    }
});


module.exports = users;