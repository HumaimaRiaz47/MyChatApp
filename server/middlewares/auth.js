import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken"


const isAuthenticated = async(req, res, next) => {

// console.log(req.cookies["chatapp-token"])

const token = req.cookies["chatapp-token"]

if(!token){
    return next(new ErrorHandler("please login to access this route", 401))
}

const decodedData = jwt.verify(token, process.env.JWT_SECRET)
//console.log(decodedData)

req.user = decodedData._id

next()

}

export {isAuthenticated}