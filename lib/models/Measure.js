const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  frequencyType: {
    type: String,
    required: true,
    enum: ['hours', 'days'],
    default: 'days'
  },
  frequency: {
    type: Number,
    required: true,
    // validation for number range
    default: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true
  }
});

module.exports = mongoose.model('Measure', measureSchema);
