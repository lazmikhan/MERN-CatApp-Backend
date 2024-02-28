const AppointmentService = require('../Services/AppointmentServices.js')
module.exports.fileUpload=(req, res)=>{
    try{
        res.json(req.file)
    }
    catch(error)
    {
        res.send(error)
    }
}
module.exports.getAppointments=async (req,res)=>{
try{

    const result =await  AppointmentService.getAppointmentService();

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
module.exports.getByIdAppointments= async (req,res)=>{
    try{
        const id = req.params.id;
      
        const result = await AppointmentService.getByIdAppointmentService(id,req.body);
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
module.exports.postAppointments= async (req,res)=>{
    try{
        console.log(req.body)
        const result = await AppointmentService.postAppointmentService(req.body);
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
    module.exports.updateAppointments= async (req,res)=>{
        try{
            const id = req.params.id;
            const result = await AppointmentService.updateAppointmentService(id,req.body);
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
        module.exports.deleteAppointments= async (req,res)=>{
            try{
                const id = req.params.id;
                const result = await AppointmentService.deleteAppointmentService(id);
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