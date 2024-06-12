const Users = require("../Models/User.js");
module.exports.getUserService = async () => {
  const users = await Users.find({});

  return users;
};
module.exports.getByIdUserService = async (id, data) => {
  const User = await Users.findById(id);

  return User;
};

module.exports.postUserService = async (data) => {
  const User = await Users.create(data);
  return User;
};
module.exports.getLoginService = async () => {
  const users = await Users.find({});

  return users;
};
module.exports.getUserAdoption= async (id)=>{
  const user = await Users.findById(id);
 
  return user;
}
 // const users = await Users.find( {},{ adoptionPosts: 1 });
module.exports.postLoginService = async (email) => {
  const User = await Users.findOne({email})
  return User;
};
module.exports.updateUserService = async (id, data) => {
  const UserId = await Users.findById(id);
  const User = await UserId.set(data).save();
  return User;
};

module.exports.deleteUserService = async (id) => {
  const User = await Users.deleteOne({ _id: id });
  return User;
};

