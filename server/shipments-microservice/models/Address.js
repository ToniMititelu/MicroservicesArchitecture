const moongose = require('mongoose');
const Schema = moongose.Schema;

const AddressSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    other: {
        type: String,
        required: false
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

moongose.model('addresses', AddressSchema);