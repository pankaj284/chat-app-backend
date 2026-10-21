const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;