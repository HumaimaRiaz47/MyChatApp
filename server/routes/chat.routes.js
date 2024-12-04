import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { newGroupChat } from '../controllers/chat.controller.js'

const app = express.Router()

app.use(isAuthenticated)

app.post|('/newChat', newGroupChat)


export default app