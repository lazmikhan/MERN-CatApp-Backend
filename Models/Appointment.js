const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const AppointmentSchema = mongoose.Schema({
    patientName:{
        type:String,
       // required: [true, "Please provide name"],
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3, "Name must be atleast 3 characters"]
    },
    reason:{
     type:String
 
    },
    expectedDate:{
        type:Date
    },
   appointmentTime:{
    type:String,
    // required:[true, "required "],
     enum:{
          values:["day", "evening","morning","night"],
         message:"Cannot be {{VALUE}} "
     },
   },
    contactNumber:{
     
            type:String,
          //  required:[true,"provide a contact"],
            validator:(value)=>{
                return validator.isMobilePhone(value)
            },
            message:"plse valid phone"
          
    },
    appointmentBy:{
        name: {
            type:String
        },
        email:{
            type:String
        },
        id:{
            type:ObjectId,
            ref:'User'
        }
    }


  
},{  timestamps:true
})

const AppointmentModel = mongoose.model('Appointments', AppointmentSchema);

module.exports = AppointmentModel;