const moongose = require('mongoose');
const Schema = moongose.Schema;

// Create Schema
const UserSchema = new Schema({
    userName: {
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
        enum: ['ADMIN', 'USER'],
        required: true,
        default: 'ADMIN'
    },
    phone: {
        type: String,
        maxLength: 12
    }
}, {
    timestamps: true
});

moongose.model('users', UserSchema);