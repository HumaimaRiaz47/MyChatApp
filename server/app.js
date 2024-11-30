import express from 'express'
import userRoute from './routes/user.routes.js'


const app = express();

app.use('/user', userRoute)

app.get('/', (req, res) =>{
    res.send("home page")
})

app.listen(3000, () => {
    console.log(`server is running on port 3000`)
})