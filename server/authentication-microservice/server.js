const express = require('express');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

const mongoose = require('mongoose');
const MONGO_PORT = 27017;

require('./models/User');
const User = mongoose.model('users');

const add_test_user = async (req, res, next) => {
    const newUser = new User({
        nickname: 'jhon',
        email: 'jhon@test123.com',
        password: 'parola123',
        role: 'User'
    });

    const user = await User.find({name: 'jhon2'})
                            .lean()
                            .exec();
    
    console.log(user);

    if (!user.length) {
        try {
            await newUser.save();
            return res.status(200).json(newUser);
        } catch (e) {
            console.error(e);
            return res.status(400).json({ err: `Could not save user ${newUser.email}`});
        }
    }
    return res.status(400).json({ err: `USer ${newUser.email} already exists`});
}

const mongoUri = `mongodb://auth_mongo:${MONGO_PORT}/auth`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true 
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        'message': 'success'
    });
});

app.get('/api/test-user', add_test_user);

app.get('/api/users', async (req, res) => {
    const users = await User.find({})
                        .lean()
                        .exec();
    return res.status(200).json(users);
})

app.use('/', require('./routes/routes'));

app.listen(PORT, () => console.log(`All set up. Listening on ${PORT}!`))