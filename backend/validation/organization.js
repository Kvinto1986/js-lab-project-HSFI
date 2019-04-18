const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.organization = !isEmpty(data.organization) ? data.organization : '';

    if(Validator.isEmpty(data.organization)) {
        errors.organization = 'Organization field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}