const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: false },
  lastname: { type: String, required: true },
  email: { 
    type: String,
    required: false,
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
  phone: { type: String, required: false },
  active: { type: Boolean, required: true },
  password: { type: String, required: false },
  status: { type: String, required: true },
  doctorId: [String],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);