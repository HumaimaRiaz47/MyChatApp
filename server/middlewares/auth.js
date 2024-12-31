import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";

const isAuthenticated = async (req, res, next) => {
  // console.log(req.cookies["chatapp-token"])

  const token = req.cookies["chatapp-token"];

  if (!token) {
    return next(new ErrorHandler("please login to access this route", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(decodedData)

  req.user = decodedData._id;

  next();
};

const adminOnly =  TryCatch((req, res, next) => {
  const token = req.cookies["chatapp-admin-token"];

  if (!token) {
    return next(new ErrorHandler("only admin can access this route", 401));
  }

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(decodedData)

  // Check if the provided secretKey matches the admin's stored secretKey.
  const isMatched = secretKey === adminSecretKey;

  if(!isMatched) return next(new ErrorHandler("only admin can access this route", 401))

  next();
})

export { isAuthenticated, adminOnly };
