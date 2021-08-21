const { StatusCodes } = require('http-status-codes');

const adminMiddleware = async (req, res, next) => {
    const user = res.locals.decoded;

    if (user.role !== 'ADMIN') {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'This is available only for admins'});
    }

    next();
};

module.exports = adminMiddleware;