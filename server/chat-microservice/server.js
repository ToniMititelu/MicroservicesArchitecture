const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';
const MONGO_PORT = 27017;

const mongoUri = `mongodb://${process.env.db_service_name}:${MONGO_PORT}/${process.env.db_name}`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true 
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({'message': 'ok hot reload chat'})
});

app.listen(PORT, () => console.log(`All set up. Listening on ${PORT}!`))