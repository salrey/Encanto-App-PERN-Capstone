// Import database
const db = require("../db/dbConfig");


//  ['japanese', 'american']

// Select all users that chose the same cuisine
const getAllUsers = async (food_pref) => {
    try {
        const allUsers = await db.any("SELECT * FROM users WHERE food_pref=$1", food_pref.toLowerCase());

        return allUsers;
    }catch (error) {
        console.log("Error from getAllUsers query");
        return error;
    }
};

// Get one user
const getOneUser = async (id) => {
    try{
        const oneUser = await db.one("SELECT * FROM users WHERE id=$1", id);

        return oneUser
    }catch (error) {
        console.log("Error from getOneUser query");
        return error;
    }
};

// Update one user
const updateUser = async (id, user) => {
    const {name, email, food_pref} = user
    try {
        const updatedUser = await db.one("UPDATE users SET name=$2, email=$3, food_pref=$4 WHERE id=$1 RETURNING *", [id, name, email, food_pref]);
        return updatedUser
    }catch (error) {
        console.log("Error from updateUser query");
        return error;
    }
};

// Create one user
const createUser = async (user) => {
    const {name, email, food_pref} = user
    try {
        const createdUser = await db.one("INSERT INTO users (name, email, food_pref) VALUES ($1, $2, $3) RETURNING *", [name, email, food_pref]);
        return createdUser;
    }catch (error) {
        console.log("Error from createUser query");
        return error;
    }
};

// Export queries 
module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    createUser
};


