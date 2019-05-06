const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.license = !isEmpty(data.license) ? data.license : '';
    data.photoLicense = !isEmpty(data.photoLicense) ? data.photoLicense : '';
    data.photo = !isEmpty(data.photo) ? data.photo : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.foodGroup = !isEmpty(data.foodGroup) ? data.foodGroup : '';
    data.sity = !isEmpty(data.sity) ? data.sity : '';

    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName = 'OperatorName field is required';
    }


    if(Validator.isEmpty(data.sity)) {
        errors.sity = 'sity field is required';
    }

    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
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

    if(Validator.isEmpty(data.license)) {
        errors.license = 'license is required';
    }
    if(Validator.isEmpty(data.photoLicense)) {
        errors.photoLicense = 'photoLicense is required';
    }

    if(Validator.isEmpty(data.photo)) {
        errors.photo = 'Photo is required';
    }

    if(Validator.isEmpty(data.foodGroup)) {
        errors.foodGroup = 'foodGroup is required';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
};