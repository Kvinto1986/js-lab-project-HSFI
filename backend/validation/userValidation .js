const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.role = !isEmpty(data.role) ? data.role : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.organization = !isEmpty(data.organization) ? data.organization : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(Validator.isEmpty(data.role)) {
        errors.role = 'Role field is required';
    }

    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    if(!Validator.isLength(data.name, { min: 2, max: 40 })) {
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

    if(!Validator.isLength(data.password, {min: 6, max: 40})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 40})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};