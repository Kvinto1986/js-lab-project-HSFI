const express = require('express');
const router = express.Router();
const InspectionQuestion = require('../models/InspectionQuestionModel');
const validateRegisterInput = require('../validation/inspectionQuestionValidation');

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
    InspectionQuestion.find({}, function(err, questions) {
        const arr=questions.map(function (elem) {
            const newElem={};
            newElem.value=elem.question;
            newElem.label=elem.question;
            return newElem
        });
        res.send(arr);
    });
});

router.post('/deleteQuestion', function(req, res) {
    InspectionQuestion.remove(req.body, function(err, question) {
        res.send(question);
    });
});

module.exports = router;