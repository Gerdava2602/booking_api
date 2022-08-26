const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app = express();
dotenv.config();


const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
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

app.listen(8800, () => {
    connect()
    console.log('Server is running on port 8800');
});