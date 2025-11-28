import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
const app = express();


app.get('/', (req, res) => {
    res.send('Hello Worold! This is SeeYou your online web conference site.')
})


async function mongooseConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully!");

        app.listen(process.env.PORT, () => {
            console.log(`Server is ruunnig on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);

    }
}
mongooseConnect();

