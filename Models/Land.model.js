const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandSchema = new Schema({
    owner: {
        type: {},
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // previousOwners: {
    //     type: [],
    //     required: false
    // },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isForSale: {
        type: Boolean,
        required: true,
        default: false
    }

});

const Land = mongoose.model('Lands', LandSchema);
module.exports = Land;
