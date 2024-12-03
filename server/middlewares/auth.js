import { TryCatch } from "./error.js";


const isAuthenticated = TryCatch(async(req, res, next) => {

console.log(req.cookies)

next()

})

export {isAuthenticated}