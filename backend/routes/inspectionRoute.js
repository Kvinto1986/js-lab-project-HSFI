const express = require('express');
const router = express.Router();
const Inspection = require('../models/InspectionModel');
const Seller = require('../models/SellerModel');

router.post('/registration', function(req, res) {
    Seller.findOne({
        license: req.body.license
    }).then(seller => {

        if(req.body.OSS>0){
            seller.flag='';
            seller.flagCount=0;
            seller.archived="red flagged";
        }
         seller.OSS=seller.OSS+req.body.OSS;
         seller.save()
    });
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