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


            let sampleFile = req.file.photo;

            sampleFile.mv(__dirname+'files/filename.jpg', function(err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });

            const newSeller = new Seller({

                operatorName: req.body.operatorName,
                name: req.body.name,
                country: req.body.country,
                photo: req.body.name,
                license: req.body.license,
                photoLicense: req.body.photoLicense,
                location: req.body.location,
                schedule: req.body.schedule,
                phone: req.body.phone,
                email: req.body.email,
                ingredients: req.body.ingredients,
                foodGroup: req.body.foodGroup,

            });
            newSeller
                .save()
                .then(seller => {
                    res.json(seller)
                });

        }

    })
});
module.exports = router;