const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';
    data.sellerName = !isEmpty(data.sellerName) ? data.sellerName : '';
    data.license = !isEmpty(data.license) ? data.license : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.sellerPhoto = !isEmpty(data.sellerPhoto) ? data.sellerPhoto : '';
    data.foodGroup = !isEmpty(data.foodGroup) ? data.foodGroup : '';

    if(Validator.isEmpty(data.location)) {
        errors.location = 'location field is required';
    }

    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName = 'OperatorName field is required';
    }

    if(Validator.isEmpty(data.sellerName)) {
        errors.sellerName = 'sellerName field is required';
    }

    if(Validator.isEmpty(data.license)) {
        errors.license = 'license is required';
    }

    if(Validator.isEmpty(data.sellerPhoto)) {
        errors.sellerPhoto = 'sellerPhoto is required';
    }


    if(Validator.isEmpty(data.foodGroup)) {
        errors.foodGroup = 'foodGroup is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};