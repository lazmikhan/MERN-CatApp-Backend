const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const HospitalSchema = mongoose.Schema({
    name:{
        type:String,
       // required: [true, "Please provide name"],
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3, "Name must be atleast 3 characters"]
    },
    address:{
     type:String
 
    },
    location:{
        type:String,
      //  required:true
    },
    contactNumber:{
     
            type:String,
          //  required:[true,"provide a contact"],
            validator:(value)=>{
                return validator.isMobilePhone(value)
            },
            message:"plse valid phone"
          
    },
    email:{
      type:String
    }


  
},{  timestamps:true
})

const HospitalModel = mongoose.model('Hospitals', HospitalSchema);

module.exports = HospitalModel;