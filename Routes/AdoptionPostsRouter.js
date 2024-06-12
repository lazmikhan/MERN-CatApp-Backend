const express = require("express");
const Router = express.Router();
const uploader = require("../Middlewares/uploader.js");
const AdoptionPostsController = require("../Controllers/AdoptionPostsController.js");
const checkUser = require("../Middlewares/checkUser.js");
Router.route("/")
  .get( checkUser,AdoptionPostsController.getAdoptionPosts)
  .post(uploader.array("images"),AdoptionPostsController.postAdoptionPosts);
Router.post(
  "/file-upload",
  uploader.single("images"),
  AdoptionPostsController.fileUpload
);
Router.route("/:id")
  .patch(AdoptionPostsController.updateAdoptionPosts)
  .get(checkUser, AdoptionPostsController.getByIdAdoptionPosts)
  .delete(AdoptionPostsController.deleteAdoptionPosts);
Router.get("images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/${imageName}`);
});

module.exports = Router;
