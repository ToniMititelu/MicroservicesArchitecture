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

    return res.status(StatusCodes.ACCEPTED).json(await generateTokens(user));
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
        'userName': registerData.username,
        'email': registerData.email,
        'password': hashedPassword,
        'role': registerData.role,
        'phone': registerData.phone || '',
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

const refreshToken = async (req, res) => {
    const token = req.body.refresh_token;
    try{ 
        const tokenData = jwt.verify(token, jwt_secret).data;
        const user = await User.findById(tokenData.id).lean().exec();
        if (!user) {
            return res.status(StatusCodes.FORBIDDEN).json({'message': 'User not found'});
        }
        return res.status(StatusCodes.ACCEPTED).json(await generateTokens(user));
    } catch(e) {
        console.error(e);
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'Invalid refresh token'});
    }
}

const me = async (req, res) => {
    const id = res.locals.decoded.id;
    const user = await User.findById(id).lean().exec();
    return res.status(StatusCodes.OK).json(user);
}

const users = async (req, res) => {
    return res.status(StatusCodes.OK).json(
        await User.find({}).lean().exec()
    );
}

const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    delete user.password;
    if (user) {
        return res.status(StatusCodes.OK).json(user);
    }
    return res.status(StatusCodes.NOT_FOUND).json({'message': 'Not found'});
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id}).exec();
    const currentUser = res.locals.decoded;
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({'message': 'Not found'});
    }

    if (user.id != currentUser.id && currentUser.role != 'ADMIN') {
        return res.status(StatusCodes.FORBIDDEN).json({'message': 'You don not have permissions to acces this resource'});
    }

    user.userName = req.body.userName || user.userName;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    
    try {
        return res.status(StatusCodes.OK).json(await user.save());
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again.'})
    }
}

const changePassword = async (req, res) => {
    const id = res.locals.decoded.id;
    const user = await User.findById(id).exec();
    const formData = {...req.body};

    let match;
    try {
        match = await bcrypt.compare(formData.oldPassword, user.password);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, please try again'});
    }

    if (!match) {
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Wrong password'});
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
        hashedPassword = await bcrypt.hash(formData.newPassword, salt);
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Could not hash password'});
    }

    user.password = hashedPassword;
    try {
        user.save();
        return res.status(StatusCodes.OK).json({'message': 'Changed password'});
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.BAD_REQUEST).json({'message': 'Something went wrong, try again.'});
    }
}

const generateTokens = async (user) => {
    const data = {
        id: user._id.toString(),
        userName: user.userName,
        email: user.email,
        role: user.role,
        phone: user.phone,
    };

    const access_token = jwt.sign({ data: data }, jwt_secret);
    const refresh_token = jwt.sign({ data: {id: data.id}}, jwt_secret);
    const role = user.role;

    return {
        access_token,
        refresh_token,
        role,
    };
}

module.exports = {
    logIn,
    register,
    me,
    users,
    getUser,
    updateUser,
    refreshToken,
    changePassword,
};