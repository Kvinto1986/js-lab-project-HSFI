const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/loginValidation');
const validateUserInput = require('../validation/userValidation ');
const validateUserUpdate = require('../validation/updateUserValidation');
const validateUserPassword=require('../validation/userPasswordChange')

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

                if (findUser&&user.id!==findUser.id) {
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
            user.password=req.body.password;
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

router.post('/getUsers', function(req, res) {
    User.find({role:req.body.role,confirmation:false}, function(err, user) {
        res.send(user);
    });
});

module.exports = router;

module.exports = router;