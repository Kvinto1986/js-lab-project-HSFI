const express = require('express');
const router = express.Router();
const Country = require('../models/CountryModel');
const validateRegisterInput = require('../validation/countryValidation');

router.post('/registration', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Country.findOne({
        country: req.body.country
    }).then(country => {
        if(country) {
            return res.status(400).json({
                country: 'Organization already exists'
            });
        }
        else {
            const newCountry = new Country({
                country: req.body.country,
            });
            newCountry
                .save()
                .then(country => {
                    res.json(country)
                });
        }
    });
});

router.post('/getCountry', function(req, res) {
    Country.find({}, function(err, country) {
        const arr=country.map(function (elem) {
            const newElem={};
            newElem.value=elem.country;
            newElem.label=elem.country;
            return newElem
        });
        res.send(arr);
    });
});

router.post('/deleteCountry', function(req, res) {
    Country.remove(req.body, function(err, country) {
        res.send(country);
    });
});


module.exports = router;