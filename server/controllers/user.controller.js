import {User} from '../models/user.model.js'
import { sendToken } from '../utils/features.js'
import bcrypt from "bcrypt"

//create a new user and save it to db and save in cookie
const newUser = async(req, res) => {

    const {name, username, password, bio} = req.body

    console.log(req.body)

    const avatar = {
        public_id: "gdgf",
        url: "jhj"

    }

    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar,
    })

    sendToken(res, user, 200, "user created")
}


const login = async(req, res, next) => {

    try {
        const {username, password} = req.body;
    
        const user = await User.findOne({ username }).select("+password")
    
        if(!user){
            return next(new Error("invalid credentials"))
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(!isMatch){
            return next(new Error("invalid credentials"))
        }
    
        sendToken(res, user, 200, `welcome back, ${user.name}`)
    } catch (error) {
        next(error)
        
    }
}

export {login, newUser}