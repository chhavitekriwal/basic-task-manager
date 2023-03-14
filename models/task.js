const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    periodType: String,
    period: String,
    taskListId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task List', required: true}
});

module.exports = mongoose.model('Task', taskSchema);