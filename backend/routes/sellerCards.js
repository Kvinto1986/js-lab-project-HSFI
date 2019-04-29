const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/sellerCards');
const Card = require('../models/Card');
const Seller = require('../models/Seller');

router.post('/registration', function(req, res) {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Card.findOne({
        cardSerial: req.body.cardSerial
    }).then(card => {
        if (card) {
            return res.status(400).json({
                cardSerial: 'cardSerial already exists'
            });
        } else {

            Seller.findOne({
                license: req.body.license,
            }).then(seller => {
                seller.cards.push(req.body.cardSerial);
                seller.save()
                console.log(seller)
            });
            if (!isValid) {
                return res.status(400).json(errors);
            }


            const newCard = new Card({
                operatorName: req.body.operatorName,
                sellerName: req.body.sellerName,
                sellerPhoto: req.body.sellerPhoto,
                license: req.body.license,
                cardsCount: req.body.cardsCount,
                cardSerial: req.body.cardSerial,
                cost: req.body.cost,
                currency: req.body.currency,
                foodGroup: req.body.foodGroup
            });
            newCard
                .save()
                .then(card => {
                    res.json(card)
                });

        }

    })
});

router.post('/getCards', function(req, res) {
    Card.find({}, function(err, cards) {
        res.send(cards);
    });
});

module.exports = router;