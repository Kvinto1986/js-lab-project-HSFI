const express = require('express');
const router = express.Router();
const multer = require("multer");
const Seller = require('../models/SellerModel');
const cloudinary = require('cloudinary').v2;
const fs = require('file-system');

router.post('/upload', (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public')
        },
        filename: function (req, file, cb) {
            cb(null, req.headers.email + '-' + file.originalname)
        }
    });

    const upload = multer({storage}).single('file');

    const uniqueEmail = req.headers.email;

    Seller.findOne({
        email: uniqueEmail
    }).then(findSeller => {

            upload(req, res, function (err) {

                const path = req.file.path;
                const uniqueFilename = req.headers.email + '-' + req.file.originalname;
                const imageType = req.headers.user;

                if (err) {
                    return res.send(err)
                }
                console.log('file uploaded to server');

                cloudinary.config({
                    cloud_name: 'hyfjlzwfe',
                    api_key: '658525779826169',
                    api_secret: 'D1BxJQAGcOVlfJ4_Vr2_iM_-rT0'
                });

                cloudinary.uploader.upload(
                    path,
                    {public_id: `${uniqueFilename}`},
                    function (err, image) {

                        if (err) return res.send(err);

                        if (imageType === 'imagePhoto') {
                            findSeller.photo = image.url;
                            findSeller.save().then(seller => {
                                res.json(seller)
                            });
                        }
                        if (imageType === 'imagePhotoLicense') {
                            findSeller.photoLicense = image.url;
                            findSeller.save().then(seller => {
                                res.json(seller)
                            });
                        }
                        fs.unlinkSync(path);
                    })
            })
        });
});


module.exports = router;