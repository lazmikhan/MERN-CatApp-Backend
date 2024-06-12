const express = require("express");
const Router = express.Router();
const uploader = require("../Middlewares/uploader.js");
const ShopController = require("../Controllers/ShopController.js");
Router.route("/")
  .get(ShopController.getShopPosts)
  .post(ShopController.postShopPosts);
Router.post(
  "/file-upload",
  uploader.single("images"),
  ShopController.fileUpload
);
Router.route("/:id")
  .patch(ShopController.updateShopPosts)
  .get(ShopController.getByIdShopPosts)
  .delete(ShopController.deleteShopPosts);
Router.get("images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/${imageName}`);
});

module.exports = Router;
