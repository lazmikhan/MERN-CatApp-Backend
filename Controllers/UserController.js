const UserService = require('../Services/UserService.js')
const bcrypt = require('bcryptjs')
const token  = require('jsonwebtoken');
const createToken =(id)=>{
return token.sign({
    id
}, 'cat app', {expiresIn: 24*60*60})
}
module.exports.checkUser=(req,res)=>{
    try{
        res.status(200).json({
            data:null,
            user: res.locals.user
        }) 
    }
    catch(error){
    
    }
  
}
module.exports.getUserAdoption=async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await UserService.getUserAdoption(  id);
        res.status(200).json({
            data:result,
           status:'success'
        }) 
    }
    catch(error){
    
    }
}

module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getUserPosts=async (req,res)=>{
try{
    const result =await  UserService.getUserService();

    res.status(200).json({
        data:result,
        user: res.locals.user
    })
}
catch(error)
{
    res.status(400).json({
        status:'false',
        message:error
    })
}
}
module.exports.getByIdUserPosts= async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await UserService.getByIdUserService(id,req.body);
        console.log(result)
        res.status(200).json({
            data:result
        })
    }
    catch(error)
    {
    res.status(400).json({
        status:'false',
        message:error
    })
    }
    }
module.exports.postUserPosts= async (req,res)=>{
    try{
        console.log(req.body)
        const result = await UserService.postUserService(req.body);
        const jwtToken = createToken(result._id);
        res.cookie('jwt', jwtToken, 24*60*60*1000);
      
        res.status(200).json({
            data:result
        })
    }
    catch(error)
    {
        if(error.code==11000)
        {
            res.status(400).json({
                status:'false',
                message:{message:'Email is already registered'}
            })
            return;
        }
    res.status(400).json({
        status:'false',
        message:error
    })
    }
    }
   
    module.exports.getLogout=async (req,res)=>{
        try{
           res.cookie('jwt', '', {maxAge:1})
        
            res.status(200).json({
                data:"Logged Out"
            })
        }
        catch(error)
        {
            res.status(400).json({
                status:'false',
                message:error
            })
        }
        }
    
        module.exports.postLoginPosts= async (req,res)=>{
        
            const {email, password}= req.body;
          
            try{
                if(!email||!password)
                {
                    return res.status(401).send(
                        {
                            status:'fail',
                            message:"Pleae provide ur credentials"
                        }
                    )
                }
              
                const result = await UserService.postLoginService(email);
                if(!result)
                {
                   return res.status(401).send(
                    {
                        status:'fail',
                        message:{
                            message:"Create  Account "
                        }
                    }) 
                }
                console.log(email, result.email)
                console.log(password, result.password)
                const auth = bcrypt.compareSync(password, result.password)
                if(!auth)
                {
                   return res.status(403).send(
                        {
                            status:'fail',
                            message:{
                                message:"Password Incorrect "
                            }
                        })  
                }
                const jwtToken = createToken(result._id);
                res.cookie('jwt', jwtToken,   {maxAge:24*60*60*1000});
              
               return  res.status(200).json({
                    data:result
                })
            }
            catch(error)
            {
            res.status(400).json({
                status:'false',
                message:{
                    message:error
                }
            })
            }
            }
            module.exports.updateUserPosts= async (req,res)=>{
                try{
                    const id = req.params.id;
                    const result = await UserService.updateUserService(id,req.body);
                    console.log(result)
                    res.status(200).json({
                        data:result
                    })
                }
                catch(error)
                {
                res.status(400).json({
                    status:'false',
                    message:error
                })
                }
                }
                module.exports.deleteUserPosts= async (req,res)=>{
                    try{
                        const id = req.params.id;
                        const result = await UserService.deleteUserService(id);
                        console.log(result)
                        res.status(200).json({
                            data:result
                        })
                    }
                    catch(error)
                    {
                    res.status(400).json({
                        status:'false',
                        message:error
                    })
                    }
                    }