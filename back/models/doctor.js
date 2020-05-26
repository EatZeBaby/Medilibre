const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  job: { type: String, required: true },
  civility: { type: String, required: true },
  appointmentFrequency: { type: Number, required: true },
  appointmentDuration: { type: Number, required: true },
  appointmentDelay: { type: Number, required: true },
  startPlanning: { type: String, required: true },
  endPlanning: { type: String, required: true },
  password: { type: String, required: true },
  email: { 
    type: String,
    required: true,
    trim: true,
    sparse: true,
    index: {
      unique: true,
      partialFilterExpression: {
        email: {$type: 'string' },
      },
      default: null,
    }
  },
  oppeningHours: [],
  oppeningDays: [],
  adress: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  publicEmail: { type: String, required: true },
  phone: { type: String, required: true },
  presentation: { type: String, required: true },
  slug: { type: String, required: true },
  superAdmin: { type: Boolean, required: true },
  avatar: { type: String, required: true },
  onlineAppointment: { type: Boolean, required: false},
  groupSessions: { type: Boolean, required: false },
  groupSize: { type: Number, required: false },
  appointmentPeriod: { type: Number, required: false },

});

module.exports = mongoose.model('Doctor', doctorSchema);