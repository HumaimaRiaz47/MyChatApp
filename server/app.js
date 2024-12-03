import express from 'express'
import userRoute from './routes/user.routes.js'
import { connectDB } from './utils/features.js';
import dotenv from "dotenv"
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: "./.env"
})

const app = express();

//using middlewares here
app.use(express.json())//to access json data
app.use(cookieParser())
// app.use(express.urlencoded())//to access form data 

const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 3000

connectDB(mongoURI)


app.use('/user', userRoute)

app.get('/', (req, res) =>{

    res.send("home page")
})

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is running on port 3000`)
})