const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
        return next(createError(401, "Not Autenticated"));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(401, "No valid token"));
        }
        req.user = user;
        next();
        });
    } catch (error) {
        next(error);
    }
}

const verifyUser = async (req, res, next) => {
    verifyToken(req,res,next, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            next(createError(403, "Not Authorized"));
        }
    })
}

const verifyAdmin = async (req, res, next) => {
    verifyToken(req,res,next, ()=> {
        if(req.user.isAdmin){
            next();
        }else{
            next(createError(403, "Not Authorized"));
        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
};