const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserUpdate(data) {
    let errors = {};

    data.country = !isEmpty(data.country) ? data.country : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.organization = !isEmpty(data.organization) ? data.organization : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';


    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.organization)) {
        errors.organization = 'Organization field is required';
    }

    if(Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
};