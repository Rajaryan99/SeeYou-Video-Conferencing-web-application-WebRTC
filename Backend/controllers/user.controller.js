import httpStatus from 'http-status'
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existiingUser = await User.findOne({ username });
        if (existiingUser) {
            return res.status(httpStatus.FOUND).json({ message: 'User already exist' });
        }

        const hassedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hassedPassword,
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User Created!!!" })
    } catch (error) {
        res.json({ message: `Something went wrong ${error}` })

    }
}


const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User NOT_FOUND '_'" })
        }


        if (await bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString('hex');

            user.token = token;
            user.tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
            await user.save();
             res.status(200).json({ message: "Login successful" });

        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid Username or password"})
        }



    } catch (error) {
        console.log('Auth error', error.message);
        res.status(500).json({ message: "Server error" });



    }
}

export { register, login };