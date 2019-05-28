
const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/sellerValidation');
const Seller = require('../models/SellerModel');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Seller.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            if (!isValid) {
                return res.status(400).json(errors);
            }


            const newSeller = new Seller({

                operatorName: req.body.operatorName,
                name: req.body.name,
                country: req.body.country,
                photo: req.body.photo,
                license: req.body.license,
                photoLicense: req.body.photoLicense,
                location: req.body.location,
                schedule: req.body.schedule,
                phone: req.body.phone,
                email: req.body.email,
                ingredientSuppliers: req.body.ingredientSuppliers,
                foodGroup: req.body.foodGroup,
                flag: req.body.flag,
                flagCount: req.body.flagCount,
                cards: req.body.cards,
                OSS: req.body.OSS,
                stars: req.body.stars,
                city: req.body.city,
                GPS: req.body.GPS,

            });
            newSeller
                .save()
                .then(seller => {
                    res.json(seller)
                });

        }

    })
});

router.post('/getSellersLicenses', function (req, res) {
    Seller.find({}, function (err, seller) {
        const arr = seller.map(function (elem) {
            const newElem = {};
            newElem.value = elem.license;
            newElem.label = elem.license;
            return newElem
        });
        res.send(arr);
    });
});

router.post('/findSeller', function (req, res) {
    Seller.findOne({license: req.body.license})
        .then(user => {
            console.log(req.body);
            res.send(user);
        })
});


router.post('/findSellers', function (req, res) {

    const todayDate = new Date();
    const weekday = new Array(7);
    weekday[0] = "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";

    const nowDay = weekday[todayDate.getDay()];

    const sellers=req.body.sellers;
    const findSellers={
        sellers:{},
        today:nowDay,
        page: req.body.page ,
        status:req.body.status,
    };

    if (sellers.country.length > 0) {
        const countryArr = sellers.country.map((elem) => elem.value);
        findSellers.sellers.country = {$in: countryArr}
    }

    if (sellers.city.length > 0) {
        const cityArr = sellers.city.map((elem) => elem.value);
        findSellers.sellers.city = {$in: cityArr}
    }

    if (sellers.foodGroup.length > 0) {
        const foodArr = sellers.foodGroup.map((elem) => elem.value);
        findSellers.sellers.foodGroup = {$in: foodArr}
    }

    if (sellers.stars) {
        findSellers.sellers.stars = sellers.stars
    }

    if (sellers.flag) {
        findSellers.sellers.flag = "red flagged"
    }

    const options = {
        page: req.body.page,
        limit: 5,
    };

    Seller.find(findSellers.sellers, function (err, result) {
            const sellersArray = result;
            const sellers=[];
            for (let i = 0; i < sellersArray.length; i++) {
                let daysArr = [];
                for (let j = 0; j < sellersArray[i].schedule.length; j++) {
                    daysArr = daysArr.concat(sellersArray[i].schedule[j].workingDays)
                }
                if (findSellers.status) {
                    if (daysArr.includes(findSellers.today)) {
                        sellers.push(sellersArray[i])
                    }
                }
                else {
                    if (!daysArr.includes(findSellers.today)) {
                        sellers.push(sellersArray[i])
                    }
                }
            }

        const idArray=sellers.map(function (elem) {
            return elem._id
        });

        const id={_id:idArray};

        Seller.paginate(id,options, function (err, sellers) {
            res.send(sellers);
        })


    });
});


router.post('/getCities', function (req, res) {
    Seller.find(req.body, function (err, sellers) {

        const cityArr = sellers.map(function (elem) {
            return elem.city
        });

        const uniqueCityArr = [...new Set(cityArr)];

        const resultArr = uniqueCityArr.map(function (elem) {
            const newElem = {};
            newElem.value = elem;
            newElem.label = elem;
            return newElem
        });

        res.send(resultArr);
    });
});

module.exports = router;