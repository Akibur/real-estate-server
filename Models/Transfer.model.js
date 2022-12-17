const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const TransferSchema = new Schema({
    seller: {
        type: {},
        required: true
    },
    buyer: {
        type: {},
        required: true
    },
    land: {
        type: {},
        required: true
    },
    isTransferable: {
        type: Boolean,
        required: true,
        default: true
    },
    status: {
        type: {
            buyerStatus: {
                type: String,
                default: "pending"
            },
            sellerStatus: {
                type: String,
                default: "pending"
            },
            adminStatus: {
                type: String,
                default: "pending"
            },
        },
        required: true
    },

});

const Transfer = mongoose.model('transfer', TransferSchema);
module.exports = Transfer;
