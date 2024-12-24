import express from 'express'
import { allChats, allMessages, allUsers } from '../controllers/admin.controllers.js'


const app = express.Router()

app.get("/")

app.post("/verify")

app.get("/logout")

app.get("/users", allUsers)
app.get("/chats", allChats)
app.get("/messages", allMessages)

app.get("/stats")





export default app;