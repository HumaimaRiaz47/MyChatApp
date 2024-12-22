import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments } from '../controllers/chat.controller.js'
import { attachmentsMulter } from '../middlewares/multer.js'

const app = express.Router()

app.use(isAuthenticated)

app.post('/new', newGroupChat)
app.get('/mychat', getMyChats)
app.get('/mychat/mygroup', getMyGroups)
app.put('/addmembers', addMembers)
app.put('/removemember', removeMember)
app.delete('/leave/:id', leaveGroup)

//send attachments
app.post('/message', attachmentsMulter, sendAttachments)

export default app