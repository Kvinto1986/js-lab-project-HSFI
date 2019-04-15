const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    operatorName:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    license:{
        type: String,
        required: true
    },
    photoLicense:{
        type: String,
        required: true
    },

    location: {
        type: Object,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ingredients: {
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

const Seller = mongoose.model('sellers', SellerSchema);

module.exports = Seller;