const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

router.post('/getCountry', function(req, res) {
    Country.find({}, function(err, country) {
        const arr=country.map(function (elem) {
            const newElem={}
            newElem.value=elem.country;
            newElem.label=elem.country;
            return newElem
        });
        res.send(country);
    });
});

module.exports = router;