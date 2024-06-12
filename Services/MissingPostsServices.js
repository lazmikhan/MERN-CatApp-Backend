const MissingPosts = require("../Models/MissingPosts.js");
const UserModel = require("../Models/User.js");
module.exports.getMissingPostService = async () => {
  const missingPosts = await MissingPosts.find({});
  return missingPosts;
};
module.exports.getByIdMissingPostService = async (id, data) => {
  const MissingPost = await MissingPosts.findById(id);

  return MissingPost;
};
module.exports.postMissingPostService = async (data) => {
  // const MissingPost = await MissingPosts.create(data);
  // const userId = await UserModel.findById(data.postedBy.id);
  // const user = await userId.missingPosts.push(data);
  // const updatedUser = await userId.set(user).save();
  // return MissingPost;
  const MissingPost = await MissingPosts.create(data);
  const userId = await UserModel.findById(data.postedBy.id);
  const user = await userId.missingPosts.push({
    _id: MissingPost._id,
    images: MissingPost.images,
    status: MissingPost.status,
    name: MissingPost.name,
  });
  const updatedUser = await userId.set(user).save();
  return MissingPost;
};

module.exports.updateMissingPostService = async (id, data) => {
  const MissingPostId = await MissingPosts.findById(id);
  const MissingPost = await MissingPostId.set(data).save();
  const userId = await UserModel.findById(data.userId);
  const missingPostIndex = userId.missingPosts.findIndex((post) =>
    post._id.equals(id)
  );
  userId.missingPosts[missingPostIndex].status = data.status;
  const updatedUserId = await userId.save();
  return MissingPost;
};

module.exports.deleteMissingPostService = async (id, data) => {
  const MissingPost = await MissingPosts.deleteOne({ _id: id });
  const userId = await UserModel.findById(data.userId);
  const missingPostIndex = userId.missingPosts.findIndex((post) =>
    post._id.equals(id)
  );

  const newMissingPosts = userId.missingPosts.filter(
    (post) => post != userId.missingPosts[missingPostIndex]
  );
  userId.missingPosts = newMissingPosts;
  const updatedUserId = await userId.save();
  return MissingPost;
};
