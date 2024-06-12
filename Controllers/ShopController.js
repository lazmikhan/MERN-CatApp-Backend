const ShopService = require('../Services/ShopService.js')
module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getShopPosts=async (req,res)=>{
try{
    const result =await  ShopService.getShopService();

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
module.exports.getByIdShopPosts= async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await ShopService.getByIdShopService(id,req.body);
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
module.exports.postShopPosts= async (req,res)=>{
    try{
        console.log(req.body)
        const result = await ShopService.postShopService(req.body);
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
    module.exports.updateShopPosts= async (req,res)=>{
        try{
            const id = req.params.id;
            const result = await ShopService.updateShopService(id,req.body);
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
        module.exports.deleteShopPosts= async (req,res)=>{
            try{
                const id = req.params.id;
                const result = await ShopService.deleteShopService(id);
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