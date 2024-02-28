const Donations = require('../Models/Donate.js');
module.exports.getDonationsService=async()=>{

const donations = await Donations.find({})

return donations;
}
module.exports.getByIdDonationsService=async(id,data)=>{
   
    const Donation =await  Donations.findById(id);

    return Donation;
 
    }
module.exports.postDonationsService=async(data)=>{
    const Donation =await Donations.create(data);
    console.log(Donation)
    return Donation;
    }

    module.exports.updateDonationService=async(id,data)=>{
        const DonationId =await  Donations.findById(id);
        const Donation = await DonationId.set(data).save();
        return Donation;
     
        }

        module.exports.deleteDonationService=async(id)=>{
            const Donation =await  Donations.deleteOne({_id:id})
            return Donation;
         
            }