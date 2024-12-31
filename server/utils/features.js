import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { Result } from "express-validator"
import {v4 as uuid} from "uuid"
import {v2 as cloudinary} from 'cloudinary'
import { getBase64 } from "../lib/helper.js"

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

const uploadFilesToCloudinary = async(files=[]) => {

    const uploadPromises = files.map((file) => {
        return new Promise((resolve,  reject) => {




            cloudinary.uploader.upload(getBase64(file),{
                resource_type: "auto",
                public_id:uuid(),
            }, (error, result) => {
                if (error) return reject(error)
                    resolve(result)
            }
        )
        })
    })

    try {
        const results = await Promise.all(uploadPromises)

        const formattedResults = results.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url,
        }))
        
        return formattedResults
    } catch (error){
        throw new Error("Error uploading files on cloudinary", error)
    }
}

const deleteFilesFromCloudinary = async (public_ids) => {

}

export {connectDB, sendToken, cookieOptions, emitEvent, deleteFilesFromCloudinary, uploadFilesToCloudinary}