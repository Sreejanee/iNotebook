const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="Thisisanoteskeepingwebsitemadewithreact"

const router = express.Router();
// Create a user using POST "/api/auth/createuser", doesn't require authentication
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //if there are errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //check whether an user with this email already exists.Othherwise promise resolve hone se pehle next line me chala jayega. so the salt variable takes the value of the promise and then goes to the next line
    //bcrypt.genSaltSync returns a promise so we have to use await
    const salt =await bcrypt.genSaltSync(10);//creating salt from bcypt
    const secPassword=await bcrypt.hash(req.body.password,salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    });
    //CREATING THE TOKEN
    // id of every document is used because id is an index. Indexes are used to quickly locate data without having to search every row in a database table every time said table is accessed.
    const data={
      user:{
        id:user.id
      }
    }
    //authToken which is given to each user after authentication can be recovered back in the above data to track the user
    const authToken=jwt.sign(data,JWT_SECRET);
    //JWT_SECRET can be used to find out whether the data has been tempered or not
    res.json({authToken});
  } catch (error) {
    if (error.code === 11000)//MongoDB Duplicate key error
     {
      
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;