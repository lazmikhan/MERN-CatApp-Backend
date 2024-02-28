const Hospitals = require('../Models/Hospitals.js');
module.exports.getHospitalService=async()=>{

const hospitals = await Hospitals.find({})

return hospitals;
}
module.exports.getByIdHospitalService=async(id,data)=>{
    const Hospital =await  Hospitals.findById(id);

    return Hospital;
 
    }
module.exports.postHospitalService=async(data)=>{
    const Hospital =await Hospitals.create(data);
    console.log(Hospital)
    return Hospital;
    }

    module.exports.updateHospitalService=async(id,data)=>{
        const HospitalId =await  Hospitals.findById(id);
        const Hospital = await HospitalId.set(data).save();
        return Hospital;
     
        }

        module.exports.deleteHospitalService=async(id)=>{
            const Hospital =await  Hospitals.deleteOne({_id:id})
            return Hospital;
         
            }