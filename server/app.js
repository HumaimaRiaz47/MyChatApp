import express from 'express'
import { connectDB } from './utils/features.js';
import dotenv from "dotenv"
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.routes.js'
import chatRoute from './routes/chat.routes.js'
import adminRoute from './routes/admin.routes.js'
import { createUser } from './seeders/user.js';

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
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chatapp";


connectDB(mongoURI)



app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) =>{

    res.send("home page")
})

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is running on port ${port} in ${envMode} Mode`)
})