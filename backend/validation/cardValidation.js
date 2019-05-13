const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';
    data.sellerName = !isEmpty(data.sellerName) ? data.sellerName : '';
    data.cardsCount = !isEmpty(data.cardsCount) ? data.cardsCount : '';
    data.license = !isEmpty(data.license) ? data.license : '';
    data.sellerPhoto = !isEmpty(data.sellerPhoto) ? data.sellerPhoto : '';
    data.cost = !isEmpty(data.cost) ? data.cost : '';
    data.currency = !isEmpty(data.currency) ? data.currency : '';
    data.foodGroup = !isEmpty(data.foodGroup) ? data.foodGroup : '';


    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName = 'OperatorName field is required';
    }

    if(Validator.isEmpty(data.sellerName)) {
        errors.sellerName = 'sellerName field is required';
    }

    if(Validator.isEmpty(data.cardsCount)) {
        errors.cardsCount = 'cards count is required';
    }

    if(data.cardsCount<1) {
        errors.cardsCount = 'Cards count must be greater than 0';
    }

    if(Validator.isEmpty(data.license)) {
        errors.license = 'license is required';
    }

    if(Validator.isEmpty(data.sellerPhoto)) {
        errors.sellerPhoto = 'seller photo is required';
    }

    if(Validator.isEmpty(data.cost)) {
        errors.cost = 'cost is required';
    }

    if(data.cost<1) {
        errors.cost = 'Cost must be greater than 0';
    }

    if(Validator.isEmpty(data.currency)) {
        errors.currency = 'currency is required';
    }

    if(Validator.isEmpty(data.foodGroup)) {
        errors.foodGroup = 'foodGroup is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};