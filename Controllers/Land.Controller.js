const createError = require('http-errors');
const mongoose = require('mongoose');

const Land = require('../Models/Land.model');

module.exports = {
    getAllLands: async (req, res, next) => {
        try {
            const results = await Land.find({});
            res.send(results);
        } catch (error) {
            res.send(error.message);
            console.log(error.message);
        }
    },
    createNewLand: async (req, res, next) => {

        try {
            if (req.decodedEmail) {
                const land = new Land(req.body);
                const result = await land.save();
                res.send({ message: "Land added successfully" });
            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    findLandById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const land = await Land.findById(id);
            // const land = await land.findOne({ _id: id });
            if (!land) {
                throw createError(404, 'land does not exist.');
            }
            res.send(land);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid land id'));
                return;
            }
            next(error);
        }
    },

    findLandsByCategory: async (req, res, next) => {
        const category = req.params.category;
        try {
            const land = await Land.find({ category: [category] });
            if (!land) {
                throw createError(404, 'No Lands of this category found');
            }
            res.send(land);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid land category'));
                return;
            }
            next(error);
        }
    },

    updateALand: async (req, res, next) => {
        try {
            if (req.decodedEmail) {
                const id = req.params.id;
                const updates = req.body;
                const options = { new: true };
                const result = await Land.findByIdAndUpdate(id, updates, options);
                if (!result) {
                    throw createError(404, 'Land does not exist');
                }
                res.send(result);

            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Land Id'));
            }

            next(error);
        }
    },

    deleteALand: async (req, res, next) => {
        const id = req.params.id;
        try {
            if (req.decodedEmail) {
                const result = await Land.findByIdAndDelete(id);
                if (!result) {
                    throw createError(404, 'Land does not exist.');
                }
                res.send(result);

            } else {
                res.status(401).json({ message: "User not Authorized" });

            }
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Land id'));
                return;
            }
            next(error);
        }
    }
};
