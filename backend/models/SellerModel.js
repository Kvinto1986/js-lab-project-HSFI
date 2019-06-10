const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    city: {
        type: String,
        required: true
    },
    archived: '',

    date: {
        type: Date,
        default: Date.now
    }
});

SellerSchema.plugin(mongoosePaginate);

const Seller = mongoose.model('sellers', SellerSchema);

module.exports = Seller;