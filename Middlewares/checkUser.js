const jwt = require('jsonwebtoken')
const User = require('../Models/User.js')
const checkUser =(req,res,next)=>{

    const token = req.cookies.jwt;
   
    if(token){
        jwt.verify(token, 'cat app',async(err, decodedToken)=>{
            if(err)
            {    res.locals.user=null;
                // next();
            }
            else{
               console.log(token)
              let user = await User.findById(decodedToken.id);
              res.locals.user=user;
   
              next();
            }
                })
    }
    else{
        res.locals.user=null;
        // next()
    }
}
module.exports=checkUser;