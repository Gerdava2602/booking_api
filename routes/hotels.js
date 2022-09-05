const express = require('express');
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    countByCity,
    getHotel
} = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CRUD Operations
//Create
router.post('/', verifyAdmin,createHotel)

//UPDATE
router.put('/:id', verifyAdmin,updateHotel)

//DELETE
router.delete('/:id', verifyAdmin,deleteHotel)

//Get All
router.get('/', getAllHotels)

//Get One
router.get('/find/:id', getHotel)
router.get("/countByCity", countByCity);
//router.get("/countByType", countByType)


module.exports = router