const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('../models/User');
const User = mongoose.model('users');

const jwt_secret = process.env.jwt_secret;

const logIn = async (req, res) => {
    const logInData = {...req.body};

    const user = await User.findOne({'email': logInData.email}).lean().exec();

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': `User ${logInData.email} does not exist`});
    }

    let match;
    try {
        match = await bcrypt.compare(logInData.password, user.password);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }

    if (!match) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Wrong password'});
    } 

    const token = jwt.sign({ data: user._id.toString() }, jwt_secret);

    return res.status(StatusCodes.BAD_REQUEST).json({'token': token});
};

const register = async (req, res) => {
    const registerData = {...req.body};

    if (registerData.password_1 !== registerData.password_2) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Passwords do not match'});
    }

    if (await User.findOne({'email': registerData.email}).lean().exec()) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Email already in use'});
    }

    let salt;
    try {
        salt = await bcrypt.genSalt(10);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Could not generate salt for password hashing'});
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(registerData.password_1, salt);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Could not hash password'});
    }

    const newUser = new User({
        'firstName': registerData.firstName,
        'lastName': registerData.lastName,
        'email': registerData.email,
        'password': hashedPassword,
        'role': registerData.role
    });

    let registeredUser;
    try {
        registeredUser = await newUser.save();
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }

    return res.status(StatusCodes.CREATED).json(registeredUser);
};

const me = async (req, res) => {
    const id = res.locals.decoded;
    const user = await User.findById(id)
                            .select('_id firstName lastName role email')
                            .lean()
                            .exec();
    return res.status(StatusCodes.OK).json(user);
}

const users = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await User.find({}).lean().exec()
    );
}

module.exports = {
    logIn,
    register,
    me,
    users,
};