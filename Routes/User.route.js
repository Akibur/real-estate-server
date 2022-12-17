const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');


const UserController = require('../Controllers/User.Controller');

//Create a new user
router.post('/', UserController.createNewUser);

//Get a user by id
router.get('/:email', UserController.findUserByEmail);

//Update a user by id
router.patch('/:id', verifyToken, UserController.updateAUser);

//make admin
router.patch('/', verifyToken, UserController.makeUserAnAdmin);

module.exports = router;
