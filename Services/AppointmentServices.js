const Appointments = require("../Models/Appointment.js");
module.exports.getAppointmentService = async () => {
  const appointments = await Appointments.find({});

  return appointments;
};
module.exports.getByIdAppointmentService = async (id, data) => {
  const Appointment = await Appointments.findById(id);

  return Appointment;
};
module.exports.postAppointmentService = async (data) => {
  const Appointment = await Appointments.create(data);
  console.log(Appointment);
  return Appointment;
};

module.exports.updateAppointmentService = async (id, data) => {
  const AppointmentId = await Appointments.findById(id);
  const Appointment = await AppointmentId.set(data).save();
  return Appointment;
};

module.exports.deleteAppointmentService = async (id) => {
  const Appointment = await Appointments.deleteOne({ _id: id });
  return Appointment;
};
