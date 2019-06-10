const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.newOrganizationName = !isEmpty(data.newOrganizationName) ? data.newOrganizationName : '';
    data.newOrganizationAddress = !isEmpty(data.newOrganizationAddress) ? data.newOrganizationAddress : '';
    data.newOrganizationGPS = !isEmpty(data.newOrganizationGPS) ? data.newOrganizationGPS : {};

    if(Validator.isEmpty(data.newOrganizationName)) {
        errors.newOrganizationName = 'Organization field is required';
    }
    if(Validator.isEmpty(data.newOrganizationAddress)) {
        errors.newOrganizationAddress = 'Address field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};