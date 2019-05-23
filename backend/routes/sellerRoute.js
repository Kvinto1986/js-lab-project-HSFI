const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/sellerValidation');
const Seller = require('../models/SellerModel');

router.post('/registration', function(req, res) {

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


            const newSeller = new Seller({

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
                ingredientSuppliers: req.body.ingredientSuppliers,
                foodGroup: req.body.foodGroup,
                flag:req.body.flag,
                flagCount:req.body.flagCount,
                cards:req.body.cards,
                OSS:req.body.OSS,
                stars:req.body.stars,
                sity:req.body.sity,
                GPS:req.body.GPS,

            });
            newSeller
                .save()
                .then(seller => {
                    res.json(seller)
                });

        }

    })
});

router.post('/getSellersLicenses', function(req, res) {
    Seller.find({}, function(err, seller) {
        const arr=seller.map(function (elem) {
            const newElem={};
            newElem.value=elem.license;
            newElem.label=elem.license;
            return newElem
        });
        res.send(arr);
    });
});

router.post('/findSeller', function(req, res) {
    Seller.findOne({license:req.body.license})
        .then(user => {
            console.log(req.body);
            res.send(user);
        })
});

module.exports = router;