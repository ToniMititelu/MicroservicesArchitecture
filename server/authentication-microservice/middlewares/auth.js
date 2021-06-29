const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.jwt_secret;

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    try {
        res.locals.decoded = jwt.verify(token, jwt_secret).data;
        next();
    } catch(e) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'message': 'Invalid token'});
    }
};

module.exports = authenticationMiddleware;