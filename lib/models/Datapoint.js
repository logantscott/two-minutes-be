const mongoose = require('mongoose');

const datapointSchema = new mongoose.Schema({
  name: {
    type: Boolean,
    required: true
  },
  measure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measure',
    required: true
  },
  timestamps: true
});

module.exports = mongoose.model('Datapoint', datapointSchema);
