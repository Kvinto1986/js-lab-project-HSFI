const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/organization');
const fs=require('file-system')
const Organization = require('../models/Organization');

router.post('/organization', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Organization.findOne({
        name: req.body.name
    }).then(organization => {
        if(organization) {
            return res.status(400).json({
                organization: 'Email already exists'
            });
        }
        else {
            const newOrganization = new Organization({
                organization: req.body.organization,
            });
            newOrganization
                .save()
                .then(organization => {
                    res.json(organization)
                });
        }
    });
});

router.post('/getOrganizations', function(req, res) {
    Organization.find({}, function(err, organizations) {
        fs.writeFileSync('../frontend/src/resourses/organizations.json', JSON.stringify(organizations));
        res.send(organizations);
    });
});


module.exports = router;