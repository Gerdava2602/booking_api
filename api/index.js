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
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/hotels",hotelsRouter);
app.use("/api/users", usersRouter);


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