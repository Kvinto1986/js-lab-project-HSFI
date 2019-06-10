const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReport(data) {
    let errors = {};
    data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
    data.endDate = !isEmpty(data.endDate) ? data.endDate : '';

    if(Validator.isEmpty(data.startDate)) {
        errors.startDate = 'From field is required';
    }

    if(Validator.isEmpty(data.endDate)) {
        errors.endDate= 'To field is required';
    }

    if(data.startDate>data.endDate) {
        errors.startDate= 'Enter the time period correctly';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}