const express = require('express');
const router = express.Router();
const InspectionQuestion = require('../models/InspectionQuestions');
const validateRegisterInput = require('../validation/inspectionQuestions');

router.post('/registration', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    InspectionQuestion.findOne({
        question: req.body.question
    }).then(question => {
        if(question) {
            return res.status(400).json({
                question: 'Question already exists'
            });
        }
        else {
            const newQuestion = new InspectionQuestion({
                question: req.body.question,
            });
            newQuestion
                .save()
                .then(question => {
                    res.json(question)
                });
        }
    });
});

router.post('/getQuestions', function(req, res) {
    InspectionQuestion.find({}, function(err, country) {
        res.send(country);
    });
});

module.exports = router;