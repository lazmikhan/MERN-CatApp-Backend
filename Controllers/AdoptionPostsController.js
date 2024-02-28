const AdoptionPostService = require('../Services/AdoptionPostsServices.js')
module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getAdoptionPosts=async (req,res)=>{
try{
    const result =await  AdoptionPostService.getAdoptionPostService();

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
module.exports.getByIdAdoptionPosts= async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await AdoptionPostService.getByIdAdoptionPostService(id,req.body);
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
module.exports.postAdoptionPosts= async (req,res)=>{
    try{
        console.log(req.body)
       req.body.images=['1709136797710-1000000001-WIN_20220429_17_18_12_Pro.jpg']
        const result = await AdoptionPostService.postAdoptionPostService(req.body);
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
    module.exports.updateAdoptionPosts= async (req,res)=>{
        try{
            const id = req.params.id;
            const result = await AdoptionPostService.updateAdoptionPostService(id,req.body);
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
        module.exports.deleteAdoptionPosts= async (req,res)=>{
            try{
                const id = req.params.id;
                const result = await AdoptionPostService.deleteAdoptionPostService(id);
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