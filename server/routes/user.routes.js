import express from 'express'
import {login} from '../controllers/user.controller.js'

const app = express.Router()

app.get('/', login)

export default app