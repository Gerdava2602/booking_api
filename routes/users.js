const express = require('express');
const {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser
} = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CRUD Operation

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.status(200).send('You are authenticated');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.status(200).send('You are authorized and can delete the account');
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.status(200).send('You are authorized and can delete the account');
// })

//UPDATE
router.put('/:id', verifyUser,updateUser)

//DELETE
router.delete('/:id', verifyUser,deleteUser)

//Get All
router.get('/', verifyAdmin,getAllUsers)

//Get One
router.get('/:id', verifyAdmin,getUser)


module.exports = router