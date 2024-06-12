const express = require("express");
const Router = express.Router();
const uploader = require("../Middlewares/uploader.js");
const UserController = require("../Controllers/UserController.js");
const checkUser = require("../Middlewares/checkUser.js");
Router.route("/signUp")
  .get(checkUser, UserController.getUserPosts)
  .post(UserController.postUserPosts);
  Router.route("/login")
  .get(UserController.getUserPosts)
  .post(UserController.postLoginPosts);
  Router.route("/logout")
  .get(UserController.getLogout)

;

Router.route("/checkUser").get(checkUser, UserController.checkUser)
Router.route("/signUp/:id")
  .get(UserController.getByIdUserPosts).patch(checkUser, UserController.updateUserPosts).delete(checkUser, UserController.deleteUserPosts);
  Router.route("/userAdoption/:id").get(UserController.getUserAdoption)
Router.get("/signUp/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/${imageName}`);
});

module.exports = Router;
