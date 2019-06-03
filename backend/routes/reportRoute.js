const express = require('express');
const router = express.Router();
const Seller = require('../models/SellerModel');

router.post('/getReport', function (req, res) {
    console.log(req.body);

    const report={
        date: {$gte: new Date(req.body.startDate), $lt: new Date(req.body.endDate)}
    };
    Seller.find(report, function (err, reportResult) {
        console.log(report);
        res.send(reportResult);
    });
});

module.exports = router;