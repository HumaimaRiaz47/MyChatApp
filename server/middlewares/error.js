import { envMode } from "../app.js";



const errorMiddleware = (err, req, res, next) => {
    // Provide default values for error message and status
    err.message ||= "Internal Server Error";
    err.status ||= 500;

    if(err.code === 11000){
        const error = Onject.keys(err.keyPattern).join(",");
        err.message = `Duplicate field - ${error}`
        err.statusCode = 400
    }

    if(err.name === "CastError"){
        const errorPath = err.path
        err.message = `Invalid format of ${errorPath}`;
        err.statusCode = 400
    }

    return res
        .status(err.statusCode)
        .json({
            success: false,
            message: envMode === "DEVELOPMENT" ? err : err.message,
        });
};

const TryCatch = (passedFunc) => async (req, res, next) => {

    try {
        await passedFunc(req, res, next)
    } catch (error) {
        next(error)
    }
}



export { errorMiddleware, TryCatch };
