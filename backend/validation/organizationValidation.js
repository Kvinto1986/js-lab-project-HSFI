const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.organizationNew = !isEmpty(data.organizationNew) ? data.organizationNew : '';
    data.organizationAddress = !isEmpty(data.organizationAddress) ? data.organizationAddress : '';
    data.organizationGPS = !isEmpty(data.organizationGPS) ? data.organizationGPS : '';

    if(Validator.isEmpty(data.organizationNew)) {
        errors.organizationNew = 'Organization field is required';
    }
    if(Validator.isEmpty(data.organizationAddress)) {
        errors.organizationAddress = 'Address field is required';
    }
    if(Validator.isEmpty(data.organizationGPS)) {
        errors.organizationGPS = 'Location field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};