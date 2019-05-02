const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.food = !isEmpty(data.food) ? data.food : '';

    if(Validator.isEmpty(data.food)) {
        errors.food = 'Food group is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}