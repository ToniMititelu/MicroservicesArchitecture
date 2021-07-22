const moongose = require('mongoose');
const Schema = moongose.Schema;

const ShipmentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    addressId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['IN PROCESS', 'SHIPPED'],
        default: 'IN PROCESS'
    }
}, {
    timestamps: true
});

moongose.model('shipments', ShipmentSchema);