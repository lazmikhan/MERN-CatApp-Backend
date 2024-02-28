const DonationService = require('../Services/DonationService.js')
module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getDonations=async (req,res)=>{
try{

    const result =await  DonationService.getDonationsService();

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
module.exports.getByIdDonations= async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await DonationService.getByIdDonationsService(id,req.body);
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
module.exports.postDonations= async (req,res)=>{
    try{
        console.log(req.body)
        const result = await DonationService.postDonationsService(req.body);
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
    module.exports.updateDonations= async (req,res)=>{
        try{
            const id = req.params.id;
            const result = await DonationService.updateDonationService(id,req.body);
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
        module.exports.deleteDonations= async (req,res)=>{
            try{
                const id = req.params.id;
                const result = await DonationService.deleteDonationService(id);
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