const express = require('express');
const router = express.Router();
const Food = require('../models/FoodGroupModel');
const validateRegisterInput = require('../validation/foodGroupValidation');

router.post('/registration', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Food.findOne({
        food: req.body.food
    }).then(food => {
        if(food) {
            return res.status(400).json({
                food: 'Food group already exists'
            });
        }
        else {
            const newFood = new Food({
                food: req.body.food,
            });
            newFood
                .save()
                .then(food => {
                    res.json(food)
                });
        }
    });
});

router.post('/getFood', function(req, res) {
    Food.find({}, function(err, food) {
        const arr=food.map(function (elem) {
            const newElem={};
            newElem.value=elem.food;
            newElem.label=elem.food;
            return newElem
        });
        res.send(arr);
    });
});

module.exports = router;