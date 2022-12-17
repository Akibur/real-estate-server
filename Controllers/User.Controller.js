const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.model');

module.exports = {

    createNewUser: async (req, res, next) => {
        try {
            console.log(req.body);
            const user = new User(req.body);

            const result = await user.save();
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

    findUserByEmail: async (req, res, next) => {
        const email = req.params.email;
        try {
            // const user = await User.findById(id);
            const user = await User.findOne({ email: email });
            if (!user) {
                throw createError(404, 'user does not exist.');
            }
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid user id'));
                return;
            }
            next(error);
        }
    },


    updateAUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: false };

            const result = await User.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'User does not exist, Cant update');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid User Id'));
            }
            next(error);
        }
    },
    makeUserAnAdmin: async (req, res, next) => {
        try {
            if (req.decodedEmail) {
                const updates = req.body;
                const options = { new: false };

                const result = await User.findOneAndUpdate({ email: updates.email }, { role: "admin" }, options);
                if (!result) {
                    throw createError(404, 'User does not exist');
                }
                res.send(result);
            } else {
                res.status(401).json({ message: "User not Authorized" });

            }

        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid User'));
            }

            next(error);
        }
    },



};
