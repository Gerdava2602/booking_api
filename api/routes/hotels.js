const express = require('express');
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
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
router.get('/:id', getHotel)


module.exports = router