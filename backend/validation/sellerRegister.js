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
    data.location = !isEmpty(data.location) ? data.location : '';
    data.schedule = !isEmpty(data.schedule) ? data.schedule : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : '';
    data.foodGroup = !isEmpty(data.foodGroup) ? data.foodGroup : '';


    if(Validator.isEmpty(data.operatorName)) {
        errors.operatorName = 'OperatorName field is required';
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

    if(Validator.isEmpty(data.schedule)) {
        errors.schedule = 'schedule is required';
    }

    if(Validator.isEmpty(data.ingredients)) {
        errors.ingredients = 'ingredients is required';
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = 'location is required';
    }

    if(Validator.isEmpty(data.foodGroup)) {
        errors.foodGroup = 'foodGroup is required';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}