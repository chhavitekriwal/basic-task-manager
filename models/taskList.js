const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean
});

module.exports = mongoose.model('Task List', taskListSchema);