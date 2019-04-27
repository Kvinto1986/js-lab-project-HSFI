const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';
    data.sellerName = !isEmpty(data.sellerName) ? data.sellerName : '';
    data.cardsCount = !isEmpty(data.cardsCount) ? data.cardsCount : '';
    data.license = !isEmpty(data.license) ? data.license : '';
    data.cardSerial = !isEmpty(data.cardSerial) ? data.cardSerial : '';
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
        errors.cardsCount = 'cardsCount is required';
    }

    if(Validator.isEmpty(data.license)) {
        errors.license = 'license is required';
    }
    if(Validator.isEmpty(data.cardSerial)) {
        errors.cardSerial = 'cardSerial is required';
    }

    if(Validator.isEmpty(data.sellerPhoto)) {
        errors.sellerPhoto = 'sellerPhoto is required';
    }

    if(Validator.isEmpty(data.cost)) {
        errors.cost = 'cost is required';
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
}