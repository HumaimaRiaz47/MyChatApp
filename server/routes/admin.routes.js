import express from 'express'
import { adminLogin, allChats, allMessages, allUsers, getDashboardStats } from '../controllers/admin.controllers.js'
import { adminLoginValidator, validateHandler } from '../lib/validators.js'


const app = express.Router()

app.get("/")

app.post("/verify",adminLoginValidator(), validateHandler,  adminLogin)

app.get("/logout")

app.get("/users", allUsers)
app.get("/chats", allChats)
app.get("/messages", allMessages)

app.get("/stats", getDashboardStats)





export default app;