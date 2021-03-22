const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('users');

const logIn = async (req, res) => {

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
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }

    return res.status(StatusCodes.CREATED).json(registeredUser);
};

const me = async (req, res) => {

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