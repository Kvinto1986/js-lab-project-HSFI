const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({

    food: {
        type: String,
        required: true
    }
});

const Food = mongoose.model('foodGroup', FoodSchema);

module.exports = Food;