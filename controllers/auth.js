const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("User created");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return next(createError(400, "Wrong password"));
    }
    
    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true, //It does not allow any other site to access the cookie
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
