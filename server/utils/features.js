import mongoose from "mongoose"


const connectDB = (url) => {
    mongoose
        .connect(url, {dbName: "chatApp"})
        .then((data) => console.log(`connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        })
}

export {connectDB}