const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  active: {type: Boolean, default: true},
});

module.exports = mongoose.model('TaskList', taskListSchema);
