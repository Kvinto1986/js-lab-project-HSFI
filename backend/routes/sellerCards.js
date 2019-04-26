const express = require('express');
const router = express.Router();
const fs = require('file-system')


router.post('/getSellersCards', function (req, res) {
    Organization.find({}, function (err, organizations) {
        fs.writeFileSync('../frontend/src/resourses/organizationsList/organizations.json', JSON.stringify(organizations));
        res.send(organizations);
    });
});