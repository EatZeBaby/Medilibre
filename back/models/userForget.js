const mongoose = require('mongoose');

const userForgetSchema = mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, requided: true },
  expirationDate: { type: Number, required: true },
});

module.exports = mongoose.model('UserForget', userForgetSchema);