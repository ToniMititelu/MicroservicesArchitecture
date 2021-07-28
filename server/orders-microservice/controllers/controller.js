const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/Order');
const Order = mongoose.model('orders');

const createOrder = async (req, res) => {
    const userId = res.locals.decoded.id;
    console.log(userId);

    const orderData = {...req.body}
    console.log(orderData);

    const newOrder = Order({
        'userId': userId,
        'listingId': orderData.listingId,
        'shippingAddressId': orderData.shippingAddressId,
        'totalAmount': orderData.totalAmount,
        'currency': orderData.currency
    });
    
    try {
        const order = await newOrder.save();
        return res.status(StatusCodes.CREATED).json(order);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).lean().exec();
    return res.status(StatusCodes.OK).json(orders);
}

const getOrder = async (req, res) => {
    const order = res.locals.decoded.order;
    return res.status(StatusCodes.OK).json(order);
}

const deleteOrder = async (req, res) => {
    const order = res.locals.decoded.order;
    if (['SHIPPING', 'SHIPPED'].includes(order.status)) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'You can not delete an order that was already sent to the courier or already shipped'});
    }
    order.remove();
    return res.status(StatusCodes.OK).json({'message': 'ok'});
}

const confirmOrder = async (req, res) => {
    const order = res.locals.decoded.order;
    order.status = 'ACCEPTED';
    try {
        order.save();
        return res.status(StatusCodes.OK).json({'message': 'Order confirmed by owner. Sent for shipment.'});
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrder,
    deleteOrder,
    confirmOrder,
};