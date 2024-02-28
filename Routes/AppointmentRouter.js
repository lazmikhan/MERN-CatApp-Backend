const express= require('express');
const Router = express.Router();
const uploader = require('../Middlewares/uploader.js')
const AppointmentsController = require('../Controllers/AppointmentController.js')
Router.route('/').get( AppointmentsController.getAppointments).post(AppointmentsController.postAppointments);
Router.post('/file-upload',uploader.single('images'), AppointmentsController.fileUpload)
Router.route('/:id').patch(AppointmentsController.updateAppointments ).get(AppointmentsController.getByIdAppointments).delete(AppointmentsController.deleteAppointments);
Router.get('images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`images/${imageName}`);
  });

module.exports=Router;