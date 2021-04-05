const moongose = require('mongoose');
const Schema = moongose.Schema;

// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Doctor'],
        required: true,
        default: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

moongose.model('users', UserSchema);