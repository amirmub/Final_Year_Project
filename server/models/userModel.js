const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirm: {
        type: String,
        required: true
    },
    
    // passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
