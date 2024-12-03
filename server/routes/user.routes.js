import express from 'express'
import {login, newUser, getMyProfile} from '../controllers/user.controller.js'
import { singleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js'

const app = express.Router()

app.post('/new',singleAvatar , newUser)
app.post('/login', login)

//after here user must logged in to access this route

app.get('/profile',isAuthenticated, getMyProfile)

export default app