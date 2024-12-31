import express from 'express'
import { connectDB } from './utils/features.js';
import dotenv from "dotenv"
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io'
import {createServer} from 'http'
import {NEW_MESSAGE, NEW_MESSAGE_ALERT} from './constants/event.js'
import {v4 as uuid} from 'uuid'
import { Message } from './models/message.model.js';
import cors from "cors"
import {v2 as cloudinary} from 'cloudinary'

import userRoute from './routes/user.routes.js'
import chatRoute from './routes/chat.routes.js'
import adminRoute from './routes/admin.routes.js'
import { createUser } from './seeders/user.js';


dotenv.config({
    path: "./.env"
})

const app = express();
const server = createServer(app)
const io = new Server(server, {})

//using middlewares here
app.use(express.json())//to access json data
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173 ", "http://localhost:4173", process.env.CLIENT_URL],
    credentials: true,
}))
// app.use(express.urlencoded())//to access form data 

const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 3000
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chatapp";
export const userSocketIDs = new Map();

connectDB(mongoURI)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/api/v1/user', userRoute)
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/admin', adminRoute)

app.get('/', (req, res) =>{

    res.send("home page")
})

io.use((socket, next) => {})

io.on("connection", (socket) => {

    const user = {
        _id: "fgfjhj",
        name: "namego"
    }
    userSocketIDs.set(user._id.toString(), socket.id)


    console.log("a user connected", socket.id)

    socket.on(NEW_MESSAGE, async({chatId, members, message})=>{

        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id:user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        }

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        }

        const membersSocket = getSockets(members)
        io.to(membersSocket).emit(NEW_MESSAGE,
           { 
            chatId,
            message: messageForRealTime,
           }
        )
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {chatId})

        try{
            await Message.create(messageForDB)

        }catch(error){
            console.log(error)
        }

    })

    socket.on("disconnected", () => {
        console.log("user disconnected")
        userSocketIDs.delete(user._id.toString())
    })
})


app.use(errorMiddleware)

server.listen(port, () => {
    console.log(`server is running on port ${port} in ${envMode} Mode`)
})