import {User} from '../models/user.model.js'


//create a new user and save it to db and save in cookie
const newUser = async(req, res) => {

    const avatar = {
        public_id,
        url,

    }

    await User.create({
        name: "name",
        username: "username",
        password: "password",
        avatar
    })


    res.status(200).json({message: "user created successfully"})
}


const login = (req, res) => {
    res.send("hello user")}


export {login, newUser}