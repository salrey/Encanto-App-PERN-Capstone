const express = require("express");
const bcrypt = require("bcrypt");
const multer = require('multer')
const path = require('path');

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

// CREATE USER

// config multer
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        //use path and __dirname to access your folder from root directory of your project
      next(null, path.join(__dirname, '../../front-end/src/Components/uploads'));
    },
    filename: function (req, file, next) {
      next(null, `${file.fieldname}-${Date.now()}${file.originalname.match(/\..*$/)[0]}`);
    },
});

const fileUpload = multer({
    storage: storage,
    fileFilter: (req, file, next) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg'
      ) {
        next(null, true);
      } else {
        next(null, false);
        const err = new Error('Only .jpg .jpeg .png images are supported!');
        err.name = 'ExtensionError';
        return next(err);
      }
    },
})

// Register new user w. photo 
users.post('/register', fileUpload.single("photo"), (req, res, next) => {

    const { body, file } = req;
    fileUpload.fileFilter(req, file, async function(err) {

        if (err instanceof multer.MulterError) {
            //multer error
            res.status(500).json({
                error: `multer uploading error: ${err.message}`
            })
            return;
        } else if (err) {
            //unknown error
            if (err.name === 'ExtensionError') {
                res.status(413).json({
                    error: `${err.message}`
                })
            } else {
                res.status(500).json({
                    error: `unknown uploading error: ${err.message}`
                })
            }
            return;
        }

        console.log("Create new user");
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const user = await createUser(body, file, hashedPassword)
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
    })
});


module.exports = users;