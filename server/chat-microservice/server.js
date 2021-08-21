const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const cors = require('cors');

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
app.use(cors());

const authenticationMiddleware = require("./middlewares/auth");
const adminMiddleware = require("./middlewares/admin");
const { StatusCodes } = require('http-status-codes');

app.get('/test', (req, res) => {
    res.json({'message': 'ok hot reload chat'})
});

require('./models/Room');
const Room = mongoose.model('rooms');
const Message = mongoose.model('messages');

app.post('/rooms', authenticationMiddleware, async (req, res) => {
    const senderId = res.locals.decoded.id;
    const receiverId = req.body.userId;
    const message = req.body.message;

    const room = await Room.findOne({
        $or: [
            { user_1: senderId, user_2: receiverId },
            { user_1: receiverId, user_2: senderId },
        ]
    }).exec();

    const newMessage = new Message({
        content: message,
        sender: senderId,
        receiver: receiverId
    });

    if (room) {
        room.messages.push(newMessage);
        room.save();
        return res.status(StatusCodes.OK).json({"message": "Message sent succesfully"});
    }

    try{
        const newRoom = new Room({
            user_1: senderId,
            user_2: receiverId,
            messages: [newMessage]
        });
        await newRoom.save();
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.BAD_REQUEST).json({"message": "Something went wrong, please try again"});
    }

    return res.status(StatusCodes.OK).json({"message": "Room created and message sent succesfully"});
});

const documents = {};

io.on("connection", socket => {
    let previousId;

    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    };

    socket.on("getDoc", docId => {
        safeJoin(docId);
        socket.emit("document", documents[docId]);
    });

    socket.on("addDoc", doc => {
        documents[doc.id] = doc;
        safeJoin(doc.id);
        io.emit("documents", Object.keys(documents));
        socket.emit("document", doc);
    });

    socket.on("editDoc", doc => {
        documents[doc.id] = doc;
        socket.to(doc.id).emit("document", doc);
    });

    io.emit("documents", Object.keys(documents));

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(PORT, () => console.log(`All set up. Listening on ${PORT}!`))