const Hotel = require('../models/hotels');

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        next(error);
    }
}

const updateHotel = async (req, res, next) => {
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateHotel);
    }catch(error){
        next(error);
    }
}

const deleteHotel = async (req, res, next) => {
    try{
         await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel deleted");
    }catch(error){
        next(error)
    }
}

const getAllHotels = async (req, res, next) => {
    try{
        const allHotels = await Hotel.find();
        res.status(200).json(allHotels);
    }catch(error){
        next(error);
    }
}

const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(error){
        next(error)
    }
}
module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    getHotel
}