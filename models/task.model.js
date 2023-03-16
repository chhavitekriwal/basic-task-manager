const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  dueDate: {type: Date, required: true},
  periodType: {type: String, required: true},
  period: {type: String, required: true},
  taskListId: {type: mongoose.Schema.Types.ObjectId, ref: 'TaskList', required: true},
});

taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);
