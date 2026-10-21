const expres = require('express');
const userRoutes = require('./routes/users.routes.js');
const chatRoutes = require('./routes/chat.routes.js');
const mongoose = require('mongoose');

const http = require("http");
const { Server } = require('socket.io');

const app = expres();
const cors = require('cors');

const server = http.createServer(app);
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"]
    }
});

require('dotenv').config()

const path = require('path');
app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'test.socket.html')));


app.use(expres.json());
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', require('./routes/message.routes.js'));


//socket.io connections
io.on('connection', (socket) => {

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined chat: " + room);
    })

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chatId;

        if (!chat.participants) {
            return console.log("chat.participants not defined");
        }

        //send to everyone except sender
        chat.participants.forEach((user) => {
            if (user._id === newMessageReceived.senderId._id) return;
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    })


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
})

let start = async () => {

    try {
        server.listen(process.env.PORT || 5000, () => {
            console.log(`server is listening on http://localhost:${process.env.PORT}`);
        })
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('database connected!');
    } catch (err) {
        console.log('something went wrong!' + err);
    }
}

start();