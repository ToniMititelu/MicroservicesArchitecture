const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/Address');
const Address = mongoose.model('addresses');
require('../models/Shipment');
const Shipment = mongoose.model('shipments');

const createAddress = async (req, res) => {
    const userId = res.locals.decoded.id;
    console.log(userId);

    const addressData = {...req.body}
    console.log(addressData);

    const newAddress = Address({
        'userId': userId,
        'country': addressData.country,
        'city': addressData.city,
        'street': addressData.street,
        'number': addressData.number,
        'other': addressData.other,
    });
    
    try {
        const address = await newAddress.save();
        return res.status(StatusCodes.CREATED).json(address);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }
}

const updateAddress = async (req, res) => {
    let address = res.locals.decoded.address;    
    const userId = res.locals.decoded.id;
    
    address.country = req.body.country || address.country;
    address.city = req.body.city || address.city;
    address.street = req.body.street || address.street;
    address.number = req.body.number || address.number;
    address.other = req.body.other || address.other;
    address.isDefault = req.body.isDefault || address.isDefault;

    try {
        address.save()
        return res.status(StatusCodes.OK).json(address);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }
}

const getAllAddresses = async (req, res) => {
    const addresses = await Address.find({}).lean().exec();
    return res.status(StatusCodes.OK).json(addresses);
}

const getAddress = async (req, res) => {
    const address = res.locals.decoded.address;
    return res.status(StatusCodes.OK).json(address);
}

const deleteAddres = async (req, res) => {
    const address = res.locals.decoded.address;
    address.remove();
    return res.status(StatusCodes.OK).json({'message': 'ok'});
}

const mine = async (req, res) => {
    const userId = res.locals.decoded.id;
    const addresses = await Address.find({'userId': userId}).lean().exec();
    return res.status(StatusCodes.OK).json(addresses)
}

const getShipments = async (req, res) => {
    const shipments = await Shipment.find({}).lean().exec();
    return res.status(StatusCodes.OK).json(shipments);
}

const getShipment = async (req, res) => {
    const shipment = await Shipment.find({'_id': req.body.id}).lean().exec();
    if (!shipment) {
        return res.status(StatusCodes.NOT_FOUND).json({'message': 'Not Found'});
    }
    return res.status(StatusCodes.OK).json(shipment);
}

const getMyShipments = async (req, res) => {
    const userId = res.locals.decoded.id;
    const shipments = await Shipment.find({'userId': userId}).lean().exec();
    return res.status(StatusCodes.OK).json(shipments);  
}

const createShipment = async (req, res) => {
    const userId = res.locals.decoded.id;
    const listingId = req.body.listingId;

    try {
        const shipment = await Shipment({userId, listingId}).save();
        return res.status(StatusCodes.CREATED).json(shipment);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }
}

const userAddresses = async (req, res) => {
    const userId = req.params.id;
    const addresses = await Address.find({userId: userId}).lean().exec();
    return res.status(StatusCodes.OK).json(addresses)
}

module.exports = {
    createAddress,
    updateAddress,
    getAllAddresses,
    getAddress,
    deleteAddres,
    userAddresses,
    mine,
    createShipment,
    getShipment,
    getShipments,
    getMyShipments,
};