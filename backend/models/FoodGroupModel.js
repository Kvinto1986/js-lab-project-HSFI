const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({

    food: {
        type: String,
        required: true
    }
});

const FoodGroupModel = mongoose.model('foodGroup', FoodSchema);

module.exports = FoodGroupModel;