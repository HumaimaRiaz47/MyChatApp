import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { newGroupChat, getMyChats, getMyGroups, addMembers } from '../controllers/chat.controller.js'

const app = express.Router()

app.use(isAuthenticated)

app.post('/new', newGroupChat)
app.get('/mychat', getMyChats)
app.get('/mychat/mygroup', getMyGroups)
app.put('/addmembers', addMembers)


export default app