const MissingPostService = require("../Services/MissingPostsServices.js");
module.exports.fileUpload = (req, res) => {
  try {
    res.json(req.file);
  } catch (error) {
    res.send(error);
  }
};
module.exports.getMissingPosts = async (req, res) => {
  try {

    
    const result = await MissingPostService.getMissingPostService();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.getByIdMissingPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await MissingPostService.getByIdMissingPostService(
      id,
      req.body
    );
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.postMissingPosts = async (req, res) => {
  try {

    const requestData = JSON.parse(req.body.name);
console.log(req.body)
for(let i =0;i<req.files.length;i++)
{
requestData.images[i]=req.files[i].filename;
}

console.log(requestData)
    const result = await MissingPostService.postMissingPostService(requestData);
   console.log(result);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }

};
module.exports.updateMissingPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await MissingPostService.updateMissingPostService(
      id,
      req.body
    );
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.deleteMissingPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await MissingPostService.deleteMissingPostService(id,req.body);
    console.log(result);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
