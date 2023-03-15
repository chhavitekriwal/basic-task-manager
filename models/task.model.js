const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    periodType: String,
    period: String,
    taskListId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task List', required: true}
});

taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);