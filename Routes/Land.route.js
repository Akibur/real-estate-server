const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');


const LandController = require('../Controllers/Land.Controller');

//get a list of all lands
router.get('/', LandController.getAllLands);

//Create a new land
router.post('/', verifyToken, LandController.createNewLand);

//Get a land by id
router.get('/:id', LandController.findLandById);

//Get lands by category
router.get('/category/:category', LandController.findLandsByCategory);

//Update a land by id
router.patch('/:id', verifyToken, LandController.updateALand);

//Delete a land by id
router.delete('/:id', verifyToken, LandController.deleteALand);


module.exports = router;
