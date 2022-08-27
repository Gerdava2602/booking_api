const express = require('express');
const Hotel = require('../models/hotels');


const router = express.Router();

//CRUD Operations
//Create
router.post('/', async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        next(error);
    }
})

//UPDATE
router.put('/:id', async (req, res, next) => {
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateHotel);
    }catch(error){
        next(error);
    }
})

//DELETE
router.delete('/:id', async (req, res, next) => {
    try{
         await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel deleted");
    }catch(error){
        next(error)
    }
})

//Get All
router.get('/', async (req, res, next) => {
    try{
        const allHotels = await Hotel.find();
        res.status(200).json(allHotels);
    }catch(error){
        next(error);
    }
})

//Get All
router.get('/:id', async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(error){
        next(error)
    }
})


module.exports = router