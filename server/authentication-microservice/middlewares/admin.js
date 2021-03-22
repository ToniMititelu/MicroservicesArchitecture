const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('users');

const adminMiddleware = async (req, res, next) => {
    const id = res.locals.decoded;
    const user = await User.findById(id)
                            .select('role')
                            .lean()
                            .exec();

    if (user.role !== 'Admin') {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'This is available only for admins'});
    }

    next();
};

module.exports = adminMiddleware;