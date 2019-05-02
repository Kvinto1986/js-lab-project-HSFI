const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/inspectionValidation');
const Inspection = require('../models/InspectionModel');

router.post('/registration', function(req, res) {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Inspection.findOne({
        license: req.body.license
    }).then(inspection => {
        if (inspection) {
            return res.status(400).json({
                license: 'Inspection already exists'
            });
        } else {

            if (!isValid) {
                return res.status(400).json(errors);
            }


            const newInspection = new Inspection({
                operatorName: req.body.operatorName,
                sellerName: req.body.sellerName,
                sellerPhoto: req.body.sellerPhoto,
                license: req.body.license,
                location: req.body.location,
                foodGroup: req.body.foodGroup,
                questions: req.body.questions,

            });
            newInspection
                .save()
                .then(inspection => {
                    res.json(inspection)
                });

        }

    })
});

router.post('/getInspection', function(req, res) {
    Inspection.find({}, function(err, inspection) {
        res.send(inspection);
    });
});

module.exports = router;