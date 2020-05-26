const mongoose = require('mongoose');

const adminForgetSchema = mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, requided: true },
  expirationDate: { type: Number, required: true },
});

module.exports = mongoose.model('AdminForget', adminForgetSchema);