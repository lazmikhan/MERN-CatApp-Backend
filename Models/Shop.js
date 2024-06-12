const mongoose = require('mongoose');
const ShopSchema = mongoose.Schema({
    name:{
        type:String,
       // required: [true, "Please provide name"],
        trim:true,
        lowercase:true,
        unique:true,
        minLength:[3, "Name must be atleast 3 characters"]
    },
    image:{
        type:String
    },
    description:{
        type:String,
    }
},{  timestamps:true
})

const ShopModel = mongoose.model('Shops', ShopSchema);

module.exports = ShopModel;