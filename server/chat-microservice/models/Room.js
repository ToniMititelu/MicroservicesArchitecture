const moongose = require('mongoose');
const Schema = moongose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true
});

moongose.model('messages', MessageSchema);

const RoomSchema = new Schema({
    user_1: {
        type: String,
        required: true
    },
    user_2: {
        type: String,
        required: true
    },
    messages: [MessageSchema]
}, {
    timestamps: true
});

moongose.model('rooms', RoomSchema);