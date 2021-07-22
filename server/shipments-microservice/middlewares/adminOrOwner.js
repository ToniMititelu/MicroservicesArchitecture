const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/Address');
const Address = mongoose.model('addresses');

const adminOrOwnerMiddleware = async (req, res, next) => {
    let address;
    try {
        address = await Address.findOne({_id: req.params.id});
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Specified address does not exist'});
    }

    const user = res.locals.decoded;

    if (user.role !== 'ADMIN' && user.id !== address.userId) {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'This is available only for admins or owner of this address'});
    }

    res.locals.decoded = {...user, address};
    next();
};

module.exports = adminOrOwnerMiddleware;