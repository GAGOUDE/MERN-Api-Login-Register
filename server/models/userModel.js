const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name'],
        minLength: [2, 'Name must be at least 2 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        validate: [isEmail],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: [6, 'Password must be at least 6 characters long']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);