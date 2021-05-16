const moongose = require('mongoose');
const Schema = moongose.Schema;

const OrderSchema = new Schema({
    listingId: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    shippingAddressId: {
        type: String,
        required: true
    } 
}, {
    timestamps: true
});

moongose.model('orders', OrderSchema);