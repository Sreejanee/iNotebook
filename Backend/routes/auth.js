const express =require('express');
const User=require('../models/Users');
const router= express.Router();

//Create a user using Post "/api/auth/". It doesn't require authentication

router.post('/',(req,res)=>{
     console.log(req.body);
     const user=User(req.body);
     user.save()
     res.send(req.body);
});
module.exports=router;