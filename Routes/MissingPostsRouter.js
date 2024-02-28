const express= require('express');
const Router = express.Router();
const uploader = require('../Middlewares/uploader.js')
const MissingPostsController = require('../Controllers/MissingPostsController.js')
Router.route('/').get( MissingPostsController.getMissingPosts).post(MissingPostsController.postMissingPosts);
Router.post('/file-upload',uploader.single('images'), MissingPostsController.fileUpload)
Router.route('/:id').patch(MissingPostsController.updateMissingPosts ).get(MissingPostsController.getByIdMissingPosts).delete(MissingPostsController.deleteMissingPosts);
Router.get('images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`images/${imageName}`);
  });

module.exports=Router;



