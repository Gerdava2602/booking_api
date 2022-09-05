const User = require('../models/user');

const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(error){
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true});
        res.status(200).json(updateUser);
    }catch(error){
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try{
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
    }catch(error){
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    }catch(error){
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        next(error)
    }
}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser
}