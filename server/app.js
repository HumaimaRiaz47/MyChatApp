import express from 'express'
import userRoute from './routes/user.routes.js'
import { connectDB } from './utils/features.js';
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const app = express();

const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 3000

connectDB(mongoURI)

app.use('/user', userRoute)

app.get('/', (req, res) =>{
    res.send("home page")
})

app.listen(port, () => {
    console.log(`server is running on port 3000`)
})