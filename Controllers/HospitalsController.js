const HospitalService = require('../Services/HospitalsServices.js')
module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getHospitals=async (req,res)=>{
try{

    const result =await  HospitalService.getHospitalService();

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
module.exports.getByIdHospitals= async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await HospitalService.getByIdHospitalService(id,req.body);
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
module.exports.postHospitals= async (req,res)=>{
    try{
        console.log(req.body)
        const result = await HospitalService.postHospitalService(req.body);
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
    module.exports.updateHospitals= async (req,res)=>{
        try{
            const id = req.params.id;
            const result = await HospitalService.updateHospitalService(id,req.body);
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
        module.exports.deleteHospitals= async (req,res)=>{
            try{
                const id = req.params.id;
                const result = await HospitalService.deleteHospitalService(id);
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