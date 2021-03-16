const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
    jwt.verify(token, config.JWTSECRET, async (err, data) => {
        if(err) {
            next();
        } else {
            next();
        }
    });
};

module.exports = authenticationMiddleware;