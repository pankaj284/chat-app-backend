const Message = require("../models/message.models.js");
const User = require("../models/users.models.js");
const Chat = require("../models/users.models.js");

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({ msg: "Invalid data passed into the request" });
    }

    const newMessage = {
        senderId: req.user._id,
        text: content,
        chatId: chatId
    };

    try {

        let message = await Message.create(newMessage);
        await message.populate({
            path: "senderId",
            select: "name username"
        });

        await message.populate({
            path: "chatId",
            populate: {
                path: "participants",
                select: "name username"
            }
        })
        return res.send(message);

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId })
            .populate("senderId", "name username").sort({ createdAt: 1 })

        return res.status(200).json(messages);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { sendMessage, allMessages };