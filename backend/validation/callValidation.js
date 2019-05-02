const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';
    data.ID = !isEmpty(data.ID) ? data.ID : '';
    data.serial = !isEmpty(data.serial)? data.serial : '';

    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName = 'operatorName field is required';
    }
    if(Validator.isEmpty(data.ID)) {
        errors.ID = 'ID field is required';
    }
    if(Validator.isEmpty(data.serial)) {
        errors.serial = 'cardSerial field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}