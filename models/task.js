const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    periodType: String,
    period: String,
    taskListId: String
});

module.exports = mongoose.model('Task', taskSchema);