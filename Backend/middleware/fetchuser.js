const jwt = require('jsonwebtoken');
const JWT_SECRET = "Thisisanoteskeepingwebsitemadewithreact"

const fetchuser=(req,res,next)=>{
    //get user from the jwt token and id to the object
    const token=req.header('auth-token');//now the request is sent as auth-token
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid tokken"})

    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid tokken"})   
    }
     
}
module.exports=fetchuser;