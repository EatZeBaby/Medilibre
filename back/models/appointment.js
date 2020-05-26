const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  free: { type: Boolean, required: true },
  userId: { type: String, required: false },
  isHoliday: { type: Boolean, required: true },
  doctorId: { type: String, required: true },
  isDomicile: { type: Boolean, required: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);