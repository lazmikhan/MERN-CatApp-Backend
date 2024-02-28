const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const MissingPostSchema = mongoose.Schema({
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
             values:["found", "not-found"],
            message:"Cannot be {{VALUE}} "
        },
    },
    reward:{
      type:Number|| null,
     // required:[true, "required "],
     
  },
    images:[{
     type:String
 
    }],
    missingLocation:{
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
    dateOfDisappearance:{
type:Date
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

const MissingPostModel = mongoose.model('MissingPosts', MissingPostSchema);

module.exports = MissingPostModel;