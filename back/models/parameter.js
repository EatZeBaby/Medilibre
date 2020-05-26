const mongoose = require('mongoose');

const parameterSchema = mongoose.Schema({
  slug: { type: String, required: true },
  value: { type: String, required: false },
});

module.exports = mongoose.model('Parameter', parameterSchema);