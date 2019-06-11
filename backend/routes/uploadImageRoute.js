const express = require('express');
const router = express.Router();
const multer = require("multer");
const Seller = require('../models/SellerModel');
const cloudinary = require('cloudinary').v2;
const fs = require('file-system');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, req.headers.email + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file')

router.post('/upload', (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
            return res.send(err)
        }
        console.log('file uploaded to server');

        cloudinary.config({
            cloud_name: 'hyfjlzwfe',
            api_key: '658525779826169',
            api_secret: 'D1BxJQAGcOVlfJ4_Vr2_iM_-rT0'
        });

        const path = req.file.path;
        const uniqueFilename = req.headers.email + '-' + req.file.originalname;
        const uniqueEmail = req.headers.email;
        const imageType = req.headers.emailuser;

        cloudinary.uploader.upload(
            path,
            {public_id: `sellersPhoto/${uniqueFilename}`, tags: `sellersPhoto`},
            function (err, image) {

                if (err) return res.send(err);
                else {

                        Seller.findOne({
                            email: uniqueEmail
                        }).then(findSeller => {
                            if (imageType === 'imagePhoto') {
                                console.log(image.url)
                                findSeller.photoURL = image.url
                            }
                            if (imageType === 'imagePhotoLicense') {
                                console.log(image.url)
                                findSeller.photoLicenseURL = image.url
                            }
                            findSeller.save();
                            fs.unlinkSync(path);
                            res.json(image);
                        })
                }

            }
        )
    })
});


module.exports = router;