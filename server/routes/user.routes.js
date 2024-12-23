import express from 'express'
import {login, newUser, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getMyNotifications, getMyFriends} from '../controllers/user.controller.js'
import { singleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { loginValidator, registerValidator, validateHandler, sendRequestValidator, acceptRequestValidator } from '../lib/validators.js'

const app = express.Router()

app.post('/new',singleAvatar, registerValidator(), validateHandler, newUser)
app.post('/login',loginValidator(), validateHandler, login)

//after here user must logged in to access this route
//the routes where i want the user loggedin  use isAuth middleware before that route

app.use(isAuthenticated)

app.get('/profile', getMyProfile)

app.get('/logout', logout)

app.get('/search', searchUser)

app.put("/sendrequest",sendRequestValidator(), validateHandler, sendFriendRequest)

app.put("/acceptrequest",acceptRequestValidator(), validateHandler, acceptFriendRequest)

app.get("/notifications",getMyNotifications)

app.get('/friends', getMyFriends )

export default app