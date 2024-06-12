const AdoptionPosts = require("../Models/AdoptionPosts.js");
const UserModel = require("../Models/User.js")
module.exports.getAdoptionPostService = async () => {
  const adoptionPosts = await AdoptionPosts.find({});
  return adoptionPosts;
};
module.exports.getByIdAdoptionPostService = async (id, data) => {
  const AdoptionPost = await AdoptionPosts.findById(id);

  return AdoptionPost;
};
module.exports.postAdoptionPostService = async (data) => {
  const AdoptionPost = await AdoptionPosts.create(data);
  const userId = await UserModel.findById(data.postedBy.id);
  const user = await userId.adoptionPosts.push({ _id: AdoptionPost._id, images:AdoptionPost.images, status:AdoptionPost.status, name:AdoptionPost.name });
 const updatedUser = await userId.set(user).save();

  return AdoptionPost;
  
};

module.exports.updateAdoptionPostService = async (id, data) => {

  const AdoptionPostId = await AdoptionPosts.findById(id);
  const AdoptionPost = await AdoptionPostId.set(data).save();
  const userId = await UserModel.findById(data.userId);
  const adoptionPostIndex = userId.adoptionPosts.findIndex(post => post._id.equals(id));
  userId.adoptionPosts[adoptionPostIndex].status = data.status;

  const updatedUserId = await userId.save();
  console.log(updatedUserId);
  //const updatedUser = await userId.set(data).save();
  return AdoptionPost;
};

module.exports.deleteAdoptionPostService = async (id,data) => {
  const AdoptionPost = await AdoptionPosts.deleteOne({ _id: id });
  const userId = await UserModel.findById(data.userId);

  const adoptionPostIndex = userId.adoptionPosts.findIndex(post => post._id.equals(id));
  const newAdoptionPosts = userId.adoptionPosts.filter((post)=> post !=userId.adoptionPosts[adoptionPostIndex]);
  userId.adoptionPosts= newAdoptionPosts;
  const updatedUserId = await userId.save();
  return AdoptionPost;
};
