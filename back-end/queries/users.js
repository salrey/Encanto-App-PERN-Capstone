// Import database
const db = require("../db/dbConfig");


// Select all users
const getEveryUser = async () => {
    try{
        const users = await db.any("SELECT * FROM users");
        return users;
    }catch (error) {
        console.log("Error from getEveryUser query ")
    }
}

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

// Get one user by email
const getOneUserByEmail = async (email) => {
    try{
        const oneUser = await db.one("SELECT * FROM users WHERE email=$1", email);
        return oneUser
    }catch (error) {
        console.log("Error from getOneUserByEmail query");
        return error;
    }
};

// Update one user
const updateUser = async (id, user) => {
    const {name, email, food_pref} = user
    console.log(user)
    try {
        const updatedUser = await db.one("UPDATE users SET name=$2, email=$3, food_pref=$4 WHERE id=$1 RETURNING *", [id, name, email, food_pref, id]);
        return updatedUser
    }catch (error) {
        console.log("Error from updateUser query");
        return error;
    }
};

// Create one user
const createUser = async (user, file, hashedPassword) => {
    const {name, email, food_pref} = user

    const photo = `./uploads/${file.filename}`;

    // console.log("query: ", user)
    // console.log("query", hashedPassword)
    try {
        const createdUser = await db.one("INSERT INTO users (name, email, food_pref, photo, password) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, food_pref, photo, hashedPassword]);
        return createdUser;
    }catch (error) {
        console.log("Error from createUser query");
        return error;
    }
};

// Export queries 
module.exports = {
    getEveryUser,
    getAllUsers,
    getOneUser,
    getOneUserByEmail,
    updateUser,
    createUser
};


