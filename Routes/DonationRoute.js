const express = require("express");
const Router = express.Router();
const uploader = require("../Middlewares/uploader.js");
const DonationsController = require("../Controllers/DonationController.js");
Router.route("/")
  .get(DonationsController.getDonations)
  .post(DonationsController.postDonations);
  Router.route("/add-payment-stripe").post(DonationsController.addStripePayment);
Router.post(
  "/file-upload",
  uploader.single("images"),
  DonationsController.fileUpload
);
Router.route("/:id")
  .patch(DonationsController.updateDonations)
  .get(DonationsController.getByIdDonations)
  .delete(DonationsController.deleteDonations);
Router.get("images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/${imageName}`);
});

module.exports = Router;
