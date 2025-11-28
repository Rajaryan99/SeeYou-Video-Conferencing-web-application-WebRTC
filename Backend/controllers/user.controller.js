import httpStatus from 'http-status'
import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';


const register = async (req, res) => {
    const {name, username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exist"})
        };

        const hassedpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hassedpassword,
        });

        await newUser.save();
        res.status(httpStatus.CREATED).json({message: "User created"})


    } catch (error) {
        res.json({message: `Something went Wrong ${error}`});
    }
}

export {register};