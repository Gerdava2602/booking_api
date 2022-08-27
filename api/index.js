const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const roomsRouter = require('./routes/rooms');
const hotelsRouter = require('./routes/hotels');
const usersRouter = require('./routes/users');

app = express();
dotenv.config();

//Middleware

//Handle JSON
app.use(express.json())

//Routes
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/hotels",hotelsRouter);
app.use("/api/users", usersRouter);

//Handle errors
app.use((err, req, res, next) => {
    //If there is no status, this will be 500
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message|| "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }catch(error){
        console.log(error);
        throw error
    }
};

mongoose.connection.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

mongoose.connection.on('connected',()=>{
    console.log('MongoDB connected');
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(8800, () => {
    connect()
    console.log('Server is running on port 8800');
});