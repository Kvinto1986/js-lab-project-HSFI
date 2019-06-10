const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    confirmation:{
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('users', UserSchema);

module.exports = User;