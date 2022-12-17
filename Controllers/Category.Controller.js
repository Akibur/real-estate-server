const createError = require('http-errors');
const mongoose = require('mongoose');

const Category = require('../Models/Category.model');

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            const results = await Category.find({});
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewCategory: async (req, res, next) => {
        try {
            const category = new Category(req.body);
            const result = await category.save();
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

    findCategoryById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const category = await Category.findById(id);
            if (!category) {
                throw createError(404, 'category does not exist.');
            }
            res.send(category);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid category id'));
                return;
            }
            next(error);
        }
    },

    updateACategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await Category.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'Category does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Category Id'));
            }

            next(error);
        }
    },

    deleteACategory: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Category.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'Category does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Category id'));
                return;
            }
            next(error);
        }
    }
};