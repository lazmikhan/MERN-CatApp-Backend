
const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
if(token)
{
    jwt.verify(token, 'cat app',(err, decodedToken)=>{
if(err)
{
  return   res.status(401).json({
    status: 'fail',
    message: 'Wring toekn, redirect to login',
})
}
else{
    next();
}
    })
}
    else (!token) 
        // Token not found, send a 401 status and redirect message

       return   res.status(401).json({
        status: 'fail',
        message: 'Token not found, redirect to login',
    });
    

    // Continue with token verification logic
    // ...

 // Call next middleware or route handler
};