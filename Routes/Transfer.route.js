const express = require('express');
const router = express.Router();

const TransferController = require('../Controllers/Transfer.Controller');
const verifyToken = require('../utils/verifyToken');

//get a list of all transfers
router.get('/', verifyToken, TransferController.getAllTransfers);

//get a list of all transfers by email
router.get('/user/:email', verifyToken, TransferController.getAllUserTransfers);

//Create a new transfer
router.post('/', verifyToken, TransferController.createNewTransfer);

//Get a transfer by id
router.get('/:id', verifyToken, TransferController.findTransferById);

//Update a transfer by id
router.patch('/:id', verifyToken, TransferController.updateATransfer);

//Delete a transfer by id
router.delete('/:id', verifyToken, TransferController.deleteATransfer);


module.exports = router;
