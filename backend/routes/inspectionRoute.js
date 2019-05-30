const express = require('express');
const router = express.Router();
const Inspection = require('../models/InspectionModel');

router.post('/registration', function(req, res) {

            const newInspection = new Inspection({
                operatorName: req.body.operatorName,
                sellerName: req.body.sellerName,
                sellerPhoto: req.body.sellerPhoto,
                license: req.body.license,
                foodGroup: req.body.foodGroup,
                GPS:req.body.GPS,
                questions: req.body.questions,
                OSS:req.body.OSS
            });
            newInspection
                .save()
                .then(inspection => {
                    res.json(inspection)
                });
});
module.exports = router;