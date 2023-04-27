const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
// @desc Register a User
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.send({ status: 400, message: "All Fields Are Required" });
    }
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.send({ status: 400, message: "This email is already in use" });
    }
    // Has Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(user);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json("Something Went Wrong");
    }
    res.status(200).json(user);
  } catch (error) {
    res.send(error)
  }

  res.status(200).json("Register User");
});

// @desc Login User
// @route POST /api/users/login
// @access public

const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body
    if(!email || !password){
        return res.send({ status: 400, message: "All fields Are Required" });
    }
    const user = await User.findOne({email});
    // Compare Password With Hased Password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN,
            {expiresIn:'1h'}
        )
        res.status(201).json(accessToken);
    }
    else{
        res.send({ status: 401, message: "Email Or Password Is Not Valid" });
    }
  } catch (error) {
    res.send(error)
  }
};

// @desc  GET Contacts
// @route GET /api/contacts:/id
// @access public

const currentUser = async (req, res) => {
  try {
    let currentUser = req.user
    if(!currentUser){
        res.status(400).json("User Not Found");
    }else{
        res.status(200).json(currentUser);
    }
    
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
