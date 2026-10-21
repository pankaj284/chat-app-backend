const Chat = require("../models/chat.models.js");

const accessChat = async (req, res) => {
    const { userId } = req.body;

    const myId = req.user._id;

    if (!userId) {
        return res.status(400).json({ message: "userId param not sent with request" });
    }

    try {
        let isChat = await Chat.find({
            $and: [
                { participants: { $elemMatch: { $eq: myId } } },
                { participants: { $elemMatch: { $eq: userId } } }
            ]
        })
            .populate("participants", "-password")
            .populate("latestMessage");


        if (isChat.length > 0) {
            return res.status(200).send(isChat[0]);
        } else {

            const createChat = await Chat.create({
                participants: [myId, userId]
            })

            const fullChat = await Chat.findById(createChat._id)
                .populate("participants", "-password");

            return res.status(200).send(fullChat);
        }
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

const fetchChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user._id })
            .populate("participants", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        return res.status(200).json(chats);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = { accessChat, fetchChats };