const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('users');

const adminMiddleware = async (req, res, next) => {
    const user = res.locals.decoded;

    if (user.role !== 'Admin') {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'This is available only for admins'});
    }

    next();
};

module.exports = adminMiddleware;