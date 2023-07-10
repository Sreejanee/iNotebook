const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "Thisisanoteskeepingwebsitemadewithreact"

const router = express.Router();

//ROUTE 1: Create a user using POST "/api/auth/createuser", doesn't require authentication,NO LOGIN REQUIRED
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  //if there are errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  try {
    //check whether an user with this email already exists.Othherwise promise resolve hone se pehle next line me chala jayega. so the salt variable takes the value of the promise and then goes to the next line
    //bcrypt.genSaltSync returns a promise so we have to use await
    const salt = await bcrypt.genSaltSync(10);//creating salt from bcypt
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    });
    //CREATING THE TOKEN
    // id of every document is used because id is an index. Indexes are used to quickly locate data without having to search every row in a database table every time said table is accessed.
    const data = {
      user: {
        id: user.id
      }
    }
    //authToken which is given to each user after authentication can be recovered back in the above data to track the user
    const authToken = jwt.sign(data, JWT_SECRET);
    //JWT_SECRET can be used to find out whether the data has been tempered or not
    success=true
    res.json({success, authToken });
  } catch (error) {
    if (error.code === 11000)//MongoDB Duplicate key error
    {

      return res.status(400).json({success, error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({success, error: 'Server error' });
  }
});


//ROUTE 2: Authenticate a user using POST "/api/auth/login", No login required
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),//if not valid email then we will not allow the user to go any further
  body('password', "Passwords acnnot be blank").exists()

], async (req, res) => {

  let success=false
  //if there are errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if there are no errors
  const{email,password}=req.body;
  try {
    let user=await User.findOne({email})//checking whether the user exits with the email enterred by the client
    if(!user){
      success=false
      return res.status(400).json({success,error:"Please try to login with the correct credentials"})
    }
    //COMPARE WHETHER RIGHT PASSWORD HAS BEEN ENTERED OR NOT
    const passwordComp=await bcrypt.compare(password,user.password)//comparing the passowrd enterred by the client with the actual user passowrd from the database my matching it with the email
    if(!passwordComp)//if the passwords dont match
    {
      success=false
      return res.status(400).json({success,error:"Please try to login with the correct credentials"})
    }
    else{
      //send the payload data
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authToken });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});
//ROUTE 3:Get loggedin user details POST "/api/auth/getuser". Log In required
router.post('/getuser',fetchuser,async (req, res) => {

  try {
    const userID=req.user.id;
    const user=await User.findById(userID).select("-password");//select everthing except the password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;