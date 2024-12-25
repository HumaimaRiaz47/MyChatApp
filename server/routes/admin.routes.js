import express from 'express'
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getDashboardStats } from '../controllers/admin.controllers.js'
import { adminLoginValidator, validateHandler } from '../lib/validators.js'


const app = express.Router()

app.post("/verify",adminLoginValidator(), validateHandler,  adminLogin)

app.get("/logout", adminLogout)

//only admin can access this route

app.get("/")  

app.get("/users", allUsers)
app.get("/chats", allChats)
app.get("/messages", allMessages)

app.get("/stats", getDashboardStats)





export default app;