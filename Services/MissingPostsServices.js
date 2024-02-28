const MissingPosts = require('../Models/MissingPosts.js');
module.exports.getMissingPostService=async()=>{

const missingPosts = await MissingPosts.find({})
return missingPosts;
}
module.exports.getByIdMissingPostService=async(id,data)=>{
    const MissingPost =await  MissingPosts.findById(id);

    return MissingPost;
 
    }
module.exports.postMissingPostService=async(data)=>{
    const MissingPost =await MissingPosts.create(data);
    console.log(MissingPost)
    return MissingPost;
    }

    module.exports.updateMissingPostService=async(id,data)=>{
        const MissingPostId =await  MissingPosts.findById(id);
        const MissingPost = await MissingPostId.set(data).save();
        return MissingPost;
     
        }

        module.exports.deleteMissingPostService=async(id)=>{
            const MissingPost =await  MissingPosts.deleteOne({_id:id})
            return MissingPost;
         
            }