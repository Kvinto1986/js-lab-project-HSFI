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
    schedule: {
        type: Array,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    ingredientSuppliers: {
        type: Array,
        required: true
    },
    foodGroup: {
        type: String,
        required: true
    },
    flag: {
        type: String,
    },
    flagCount: {
        type: Number,
    },
    cards: {
        type: Array,
    },
    OSS: {
        type: Number,
    },
    stars: {
        type: Number,
    },
    sity: {
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