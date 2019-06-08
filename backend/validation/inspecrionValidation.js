const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateInspections(data) {
    let errors = {};
    data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
    data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';

    if(Validator.isEmpty(data.startDate)) {
        errors.startDate = 'From field is required';
    }
    if(Validator.isEmpty(data.endDate)) {
        errors.endDate= 'To field is required';
    }

    if(Validator.isEmpty(data.endDate)) {
        errors.endDate= 'To field is required';
    }

    if(data.startDate>data.endDate) {
        errors.startDate= 'Enter the time period correctly';
    }

    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName= 'Enter the time period correctly';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};