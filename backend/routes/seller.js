const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../validation/register');

const Seller = require('../models/Seller');

router.post('/registerSeller', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }


            const newUser = new Seller({
                operatorName:req.body.operatorName,
                name: req.name.country,
                country: req.country.name,
                photo:req.name.photo,
                license: req.body.license,
                photoLicense: req.body.photoLicense,
                location: req.body.location,
                schedule: req.body.schedule,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                ingredients: req.body.ingredients,
                foodGroup: req.body.foodGroup,
                data: req.body.data
            });


        });

module.exports = router;