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
        if(req.body.OSS<0){
            seller.stars-=1;
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
                sellerGPS:req.body.sellerGPS,
                questions: req.body.questions,
                OSS:req.body.OSS
            });
            newInspection
                .save()
                .then(inspection => {
                    res.json(inspection)
                });
});

router.post('/getInspectionsOperators', function(req, res) {
    Inspection.find({}, function(err, inspections) {
        const inspectionsArr = inspections.map(function (elem) {
            return elem.operatorName
        });

        const uniqueOperatorNameArr = [...new Set(inspectionsArr)];
        console.log(uniqueOperatorNameArr)

        const arr=uniqueOperatorNameArr.map(function (elem) {
            const newElem={};
            newElem.value=elem;
            newElem.label=elem;
            return newElem
        });
        res.send(arr);
    });
});

router.post('/getInspections', function(req, res) {
    Inspection.find(req.body, function(err, inspections) {

        const arr=inspections.map(function (elem) {
            const newElem={};
            newElem.sellerName=elem.sellerName;
            newElem.sellerGPS=elem.sellerGPS;
            newElem.GPS=elem.GPS;
            return newElem
        });
        res.send(arr);
    });
});

module.exports = router;