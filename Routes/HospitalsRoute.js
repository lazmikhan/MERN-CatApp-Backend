const express = require("express");
const Router = express.Router();
const uploader = require("../Middlewares/uploader.js");
const HospitalsController = require("../Controllers/HospitalsController.js");
Router.route("/")
  .get(HospitalsController.getHospitals)
  .post(HospitalsController.postHospitals);
Router.post(
  "/file-upload",
  uploader.single("images"),
  HospitalsController.fileUpload
);
Router.route("/:id")
  .patch(HospitalsController.updateHospitals)
  .get(HospitalsController.getByIdHospitals)
  .delete(HospitalsController.deleteHospitals);
Router.get("images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/${imageName}`);
});

module.exports = Router;
