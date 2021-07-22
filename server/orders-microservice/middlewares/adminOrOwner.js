const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/Order');
const Order = mongoose.model('orders');

const adminOrOwnerMiddleware = async (req, res, next) => {
    let order;
    try {
        order = await Order.findOne({_id: req.params.id});
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Specified order does not exist'});
    }

    const user = res.locals.decoded;

    if (user.role !== 'ADMIN' && user.id !== order.userId) {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'This is available only for admins or owners of this order'});
    }

    res.locals.decoded = {...user, order};
    next();
};

module.exports = adminOrOwnerMiddleware;