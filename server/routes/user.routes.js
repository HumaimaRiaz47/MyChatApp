import express from 'express'
import {login, newUser, getMyProfile, logout, searchUser} from '../controllers/user.controller.js'
import { singleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js'

const app = express.Router()

app.post('/new',singleAvatar , newUser)
app.post('/login', login)

//after here user must logged in to access this route
//the routes where i want the user loggedin  use isAuth middleware before that route

app.use(isAuthenticated)

app.get('/profile', getMyProfile)

app.get('/logout', logout)

app.get('/search', searchUser)

export default app