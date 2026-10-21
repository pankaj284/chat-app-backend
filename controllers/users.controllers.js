const User = require("../models/users.models.js");
const bcrypt = require('bcrypt');
const { status } = require("http-status");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {

        let { name, username, password } = req.body;

        console.log(req.body);

        if (!username || !password || !name) {
            return res.status(400).json({ msg: 'Please provide details' });
        }

        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(409).json({ msg: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, username, password: hashedPassword });

        res.status(status.CREATED).json({
            msg: 'User created',
            user: { id: newUser._id, name: newUser.name, username: newUser.username }
        });

    } catch {
        console.error(err);
        res.status(status.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }

}

const login = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide details' });
    }

    let user = await User.findOne({ username });

    if (!user) {
        return res.status(status.NOT_FOUND).json({ msg: "user not found" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.status(401).json({ msg: 'Invalid credentials.' });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )

    res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        token: token
    });
}

const allUsers = async (req, res) => {
    try {

        const keyword = req.query.search ? { name: { $regex: req.query.search, $options: "i" } } : {};

        const users = await User.find(keyword)
            .find({ _id: { $ne: req.user._id } })
            .select("-password");

        return res.send(users);

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = { signup, login, allUsers }; 