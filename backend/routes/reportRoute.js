const express = require('express');
const router = express.Router();
const Seller = require('../models/SellerModel');
const validateReport = require('../validation/reportValidation');
const Call = require('../models/CallModel');
const Card = require('../models/CardModel');

router.post('/getReport', function (req, res) {

    const {errors, isValid} = validateReport(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const reportResult = {
        startDate:req.body.startDate,
        endDate:req.body.endDate
    };

    const reportSellers = {
        date: {$gte: new Date(req.body.startDate), $lt: new Date(req.body.endDate)}
    };

    const reportDates = {
        date: {$gte: new Date(req.body.startDate), $lt: new Date(req.body.endDate)}
    };


    const reportReq = req.body;

    if (reportReq.country.length > 0) {
        const countryArr = reportReq.country.map((elem) => elem.value);
        reportSellers.country = {$in: countryArr};
        reportResult.country=countryArr
    }

    if (reportReq.city.length > 0) {
        const cityArr = reportReq.city.map((elem) => elem.value);
        reportSellers.city = {$in: cityArr};
        reportResult.city=cityArr

    }

    if (reportReq.foodGroup.length > 0) {
        const foodArr = reportReq.foodGroup.map((elem) => elem.value);
        reportSellers.foodGroup = {$in: foodArr};
        reportResult.foodGroup=foodArr
    }

    Seller.find(reportSellers, (err, sellers) => {

        if (reportReq.regSellers) {
            reportResult.regSellersCount = sellers.length
        }

        if (reportReq.OSSaverage) {
            const sellersOOS = sellers.reduce((sum, current) => {
                return sum + current.OSS;
            }, 0);
            reportResult.OSSaverage = (sellersOOS / sellers.length).toFixed(2)
        }

        if (reportReq.flag) {
            const sellersFlag = sellers.filter((elem) => {
                return elem.flag === 'red flagged';
            });
            reportResult.flag = sellersFlag.length
        }

        if (reportReq.stars) {
            const sellersStars = sellers.reduce((sum, current) => {
                return sum + current.stars;
            }, 0);
            reportResult.stars = (sellersStars / sellers.length).toFixed(2)
        }

    }).then(() => {
        Call.find(reportDates, (err, calls) => {
            if (reportReq.calls) {
                reportResult.calls = calls.length
            }
        }).then(() => {
            Card.find(reportDates, (err, cards) => {
                if (reportReq.cards) {
                    reportResult.cards = cards.length;
                }
                if (reportReq.total) {
                    const totalArr = cards.map((elem) => {
                        return elem.cardsCount * elem.cost
                    });

                    const cardsTotal = totalArr.reduce((sum, current) => {
                        return sum + current;
                    }, 0);
                    reportResult.total = cardsTotal;
                }
                res.send(reportResult)
            });
        })
    })
});

module.exports = router;