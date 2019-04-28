const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    operatorName: {
        type: String,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerPhoto: {
        default: 'none',
        type: String,
    },
    license: {
        type: String,
        required: true
    },
    cardsCount: {
        type: Number,
        required: true
    },
    cardSerial: {
        type:  Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    foodGroup: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('cards', CardSchema);

module.exports = Card;