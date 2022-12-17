const createError = require('http-errors');
const mongoose = require('mongoose');

const Transfer = require('../Models/Transfer.model');
const verifyToken = require('../utils/verifyToken');


module.exports = {
    getAllTransfers: async (req, res, next) => {
        try {
            console.log(req.decodedEmail);
            if (req.decodedEmail) {
                const results = await Transfer.find({});
                res.send(results);
            } else {
                res.status(401).json({ message: "User not Authorized" });
            }

        } catch (error) {
            console.log(error.message);
        }
    },
    getAllUserTransfers: async (req, res, next) => {
        const email = req.params.email;
        try {
            if (email == req.decodedEmail) {
                const filter = {
                    'buyer.email': email,
                    'seller.email': email

                };

                console.log(filter);
                console.log(req.decodedEmail);
                const results = await Transfer.find({ $or: [{ 'buyer.email': email }, { 'seller.email': email }] });




                console.log(results);
                res.send(results);
            } else {
                res.status(401).json({ message: "User not Authorized" });
            }

        } catch (error) {
            console.log(error.message);
        }
    },

    createNewTransfer: async (req, res, next) => {
        try {
            if (req.decodedEmail) {

            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

            const transfer = new Transfer(req.body);
            const result = await transfer.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    findTransferById: async (req, res, next) => {
        const id = req.params.id;
        try {
            if (req.decodedEmail) {
                const transfer = await Transfer.findById(id);
                // const transfer = await transfer.findOne({ _id: id });
                if (!transfer) {
                    throw createError(404, 'transfer does not exist.');
                }
                res.send(transfer);
            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid transfer id'));
                return;
            }
            next(error);
        }
    },

    updateATransfer: async (req, res, next) => {
        try {
            if (req.decodedEmail) {
                const id = req.params.id;
                const updates = req.body;
                const options = { new: false };
                let result = null;
                console.log("inside update", updates);

                if (updates.status.buyerStatus) {
                    result = await Transfer.findByIdAndUpdate(id, { $set: { 'status.buyerStatus': updates.status.buyerStatus } }, options);
                }

                if (updates.status.sellerStatus) {
                    result = await Transfer.findByIdAndUpdate(id, { $set: { 'status.sellerStatus': updates.status.sellerStatus } }, options);
                }

                if (updates.status.adminStatus) {
                    result = await Transfer.findByIdAndUpdate(id, { $set: { 'status.adminStatus': updates.status.adminStatus } }, options);
                }




                if (!result) {
                    throw createError(404, 'Transfer does not exist');
                }
                res.send(result);
            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Transfer Id'));
            }

            next(error);
        }
    },

    deleteATransfer: async (req, res, next) => {
        const id = req.params.id;
        try {
            if (req.decodedEmail) {
                const result = await Transfer.findByIdAndDelete(id);
                if (!result) {
                    throw createError(404, 'Transfer does not exist.');
                }
                res.send(result);
            } else {
                res.status(401).json({ message: "User not Authorized" });

            }



        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Transfer id'));
                return;
            }
            next(error);
        }
    }
};
