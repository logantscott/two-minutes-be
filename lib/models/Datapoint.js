const mongoose = require('mongoose');

const datapointSchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  measure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measure',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Datapoint', datapointSchema);
