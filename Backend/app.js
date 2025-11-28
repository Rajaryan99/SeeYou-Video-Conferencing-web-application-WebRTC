import express, { urlencoded } from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import {createServer} from "node:http";
import cors from 'cors';
import { connectToSocket } from "./controllers/socletManager.js";




const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Worold! This is SeeYou your online web conference site.')
})


async function mongooseConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully!");

        server.listen(process.env.PORT || 5000, () => {
            console.log(`Server is ruunnig on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);

    }
}
mongooseConnect();

