const express = require('express');

const router = express.Router();

const {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRooms,
    getRoom
} = require('../controllers/Room');

const { verifyAdmin } = require('../utils/verifyToken');

//CRUD Operations
//Create
router.post('/:hotelId', verifyAdmin,createRoom)

//UPDATE
router.put('/:id', verifyAdmin,updateRoom)

//DELETE
router.delete('/:id/:hotelId', verifyAdmin,deleteRoom)

//Get All
router.get('/', getAllRooms)

//Get One
router.get('/:id', getRoom)

module.exports = router