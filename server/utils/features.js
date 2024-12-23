import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const connectDB = (url) => {
    mongoose
        .connect(url, {dbName: "chatApp"})
        .then((data) => console.log(`connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        })
}

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

     
    return res.status(code).cookie("chatapp-token", token, cookieOptions).json({
        success: true,
        message,
        
    })
}

const emitEvent = (req, user, event, data) =>{
    console.log("emitting event", event)
}

const deleteFilesFromCloudinary = async (public_ids) => {

}

export {connectDB, sendToken, cookieOptions, emitEvent, deleteFilesFromCloudinary}