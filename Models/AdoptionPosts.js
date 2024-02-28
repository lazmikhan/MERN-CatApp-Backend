const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const AdoptionPostSchema = mongoose.Schema({
    name:{
        type:String,
       // required: [true, "Please provide name"],
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3, "Name must be atleast 3 characters"]
    },
    description:{
        type:String,
       // required:true
    },

    status:{
        type:String,
       // required:[true, "required "],
        enum:{
             values:["adopted","pending", "available"],
            message:"Cannot be {{other}} "
        },
    },
    images:[{
     type:String
 
    }],
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
    postedBy:{
        name:{
            type:String,
           // required:true
        },
        email:{
            type:String
        },
      id:{
          
        type:ObjectId,
        ref:"User"
      }
    }


  
},{  timestamps:true
})

const AdoptionPostModel = mongoose.model('AdoptionPosts', AdoptionPostSchema);

module.exports = AdoptionPostModel;