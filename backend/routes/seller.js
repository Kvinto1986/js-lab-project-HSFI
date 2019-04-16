const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/sellerRegister');
const Seller = require('../models/Seller');

router.post('/sellerRegister', function(req, res) {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Seller.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newUser = new Seller({
                operatorName: req.body.operatorName,
                name: req.body.name,
                country: req.body.country,
                photo: req.body.photo,
                license: req.body.license,
                photoLicense: req.body.photoLicense,
                location: req.body.location,
                schedule: req.body.schedule,
                phone: req.body.phone,
                email: req.body.email,
                ingredients: req.body.ingredients,
                foodGroup: req.body.foodGroup,

            });
            newUser
                .save()
                .then(user => {
                    res.json(user)
                });

        }

    })
});
module.exports = router;