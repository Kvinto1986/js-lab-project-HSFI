const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/loginValidation');
const validateUserInput = require('../validation/userValidation ');
const validateUserUpdate = require('../validation/updateUserValidation');
const validateUserPassword = require('../validation/userPasswordChange')

const User = require('../models/UserModel');

router.post('/registration', function (req, res) {

    const {errors, isValid} = validateUserInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'managerjohnsnow@gmail.com',
                    pass: 'John1234567890Snow'
                }
            });

            const mailOptions = {
                from: 'managerJohnSnow@gmail.com',
                to: req.body.email,
                subject: 'You have successfully registered with the Healthy Street Food Incentives!',
                text: `Congratulations!
                 You have successfully registered in our system, success in your work!
                 Your login: ${req.body.email}, Your password: ${req.body.password}.
                 All your data can be changed in your personal profile in the web application.
                 Best regards, Healthy Street Food Incentives.`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            function getTasks() {
                if (req.body.role === 'operator') {
                    const arr = req.body.tasks.map(function (elem) {
                        return elem.value
                    });
                    return arr
                } else return ["createNewSeller", "createSellerCard", "getCall", "inspection"]
            }

            const tasks = getTasks();

            const newUser = new User({
                role: req.body.role,
                country: req.body.country,
                name: req.body.name,
                tasks: tasks,
                organization: req.body.organization,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                confirmation: false,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
            res.json(user)
        }
    });
});

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            if (user.confirmation===false) {
                errors.confirmation = 'Need confirmation (contact your supervisor)';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            role: user.role,
                            tasks: user.tasks,
                            country: user.country,
                            confirmation: user.confirmation,
                            organization: user.organization,
                            phone: user.phone,
                            email: user.email,
                            avatar: user.avatar

                        };

                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);

                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.post('/update', function (req, res) {

    const {errors, isValid} = validateUserUpdate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findById(req.body.id)
        .then(user => {

            User.findOne({
                email: req.body.email
            }).then(findUser => {

                if (findUser && user.id !== findUser.id) {
                    return res.status(400).json({
                        email: 'Email already exists'
                    });
                } else {
                    user.country = req.body.country;
                    user.name = req.body.name;
                    user.organization = req.body.organization;
                    user.phone = req.body.phone;
                    user.email = req.body.email;
                    user.save()
                        .then(user => {
                            res.json(user)
                        });
                }
            })
        })

});

router.post('/changePassword', function (req, res) {

    const {errors, isValid} = validateUserPassword(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById(req.body.id)
        .then(user => {
            user.password = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            user.password = hash;
                            user
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            })

        });
});

router.post('/getUsers', function (req, res) {
    const options = {
        page: req.body.page,
        limit: 4,
    };

    const confirmUsers={
        confirmation: false
    };

    if(req.body.country){
        confirmUsers.country=req.body.country
    }


    if (req.body.role === 'manager') {
        confirmUsers.role = 'coordinator'
    }
    if (req.body.role === 'coordinator') {
        confirmUsers.role = 'operator'
    }

    if (req.body.role === 'operator') {
        confirmUsers.role = ''
    }

    User.paginate(confirmUsers, options, function (err, result) {
        console.log(confirmUsers);
        res.send(result);
    });
});

router.post('/confirmUser', function (req, res) {

    User.findById(req.body.id)

        .then(user => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'managerjohnsnow@gmail.com',
                    pass: 'John1234567890Snow'
                }
            });

            const mailOptions = {
                from: 'managerJohnSnow@gmail.com',
                to: user.email,
                subject: 'Your email is confirmed!',
                text: `Congratulations!
                 Your email is confirmed!
                 This means you have access to work with the application.`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            user.confirmation=true;
            user.save()
        })
        .then(user => {
            res.json(user)
        });
});

module.exports = router;