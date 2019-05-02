const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/callValidation');
const Call = require('../models/CallModel');
const Seller = require('../models/SellerModel');

router.post('/registration', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Call.findOne({
        cardSerial:req.body.serial
    }).then(call => {
        if(call) {
            return res.status(400).json({
                call: 'Call already exists',
            });
        }
        else {
            Seller.find({
            }).then(sellers => {
             for(let i=0;i<sellers.length;i++){
                 if(sellers[i].cards.includes(req.body.serial)){
                     sellers[i].flagCount+=1;
                     if(sellers[i].flagCount>=3){
                         sellers[i].flag='red flagged'
                     }
                     else sellers[i].flag='is flagged';
                     sellers[i].save()
                 }
             }


            });
            const newCall = new Call({
                operatorName:req.body.operatorName,
                ID: req.body.ID,
                cardSerial: req.body.serial,
            });
            newCall
                .save()
                .then(call => {
                    res.json(call)
                });
        }
    });
});

module.exports = router;