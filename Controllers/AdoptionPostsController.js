const AdoptionPostService = require("../Services/AdoptionPostsServices.js");
module.exports.fileUpload = (req, res) => {
  try {
    //console.log(req.file)
    console.log("req.file")
   // res.send(req.file);
  } catch (error) {
    res.send(error);
  }
};
module.exports.getAdoptionPosts = async (req, res) => {
  try {
    const result = await AdoptionPostService.getAdoptionPostService();

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
module.exports.getByIdAdoptionPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AdoptionPostService.getByIdAdoptionPostService(
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
module.exports.postAdoptionPosts = async (req, res) => {
  try {


 const requestData = JSON.parse(req.body.name);
console.log(req.files.length)
for(let i =0;i<req.files.length;i++)
{
requestData.images[i]=req.files[i].filename;
}

   const result = await AdoptionPostService.postAdoptionPostService(requestData);
    console.log(result);
    res.status(200).send({
      data:   result
      ,
    });
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error,
    });
  }
};
module.exports.updateAdoptionPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AdoptionPostService.updateAdoptionPostService(
      id,
      req.body
    );
   // console.log(result);
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
module.exports.deleteAdoptionPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AdoptionPostService.deleteAdoptionPostService(id,req.body);
  
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
