const express= require('express');
const Router = express.Router();
const AdoptionPostsController = require('../Controllers/AdoptionPostsController.js')
Router.route('/').get(AdoptionPostsController.getAdoptionPosts).post(AdoptionPostsController.postAdoptionPosts);

Router.route('/:id').patch(AdoptionPostsController.updateAdoptionPosts ).get(AdoptionPostsController.getByIdAdoptionPosts).delete(AdoptionPostsController.deleteAdoptionPosts);

module.exports=Router;