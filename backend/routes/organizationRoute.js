const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/organizationValidation');
const Organization = require('../models/OrganizationModel');

router.post('/registration', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Organization.findOne({
        organization: req.body.organizationNew
    }).then(organization => {
        if(organization) {
            return res.status(400).json({
                organization: 'Organization already exists'
            });
        }
        else {
            const newOrganization = new Organization({
                organization: req.body.organizationNew,
                address: req.body.organizationAddress,
                GPS: req.body.organizationGPS,

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
        const arr=organizations.map(function (elem) {
            const newElem={}
            newElem.value=elem.organization;
            newElem.label=elem.organization;
            return newElem
        });
        res.send(arr);
    });
});

module.exports = router;