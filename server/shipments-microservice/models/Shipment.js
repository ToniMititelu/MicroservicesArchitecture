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
    shipmentDay: {
        type: Date,
        required: false,
    }
}, {
    timestamps: true
});

moongose.model('shipments', ShipmentSchema);