const Task = require('../models/task.model');
const apiService = require('../services/api.service');

const createTaskList = async (req,res) => {
    try {
        const { name,description } = req.body;
        await apiService.createTaskList(name,description);

        console.log('New List Added');
        res.status(201).json({status: 'Success', details: 'New list created'});
    } catch(err) {
        console.error(err);
        res.status(400).json({status:'Failure', details :err.message});
    }
}

const createTask =  async (req,res) => {
    try {
        let {name, description, periodType, period,dueDate,taskListId} = req.body;
        await apiService.createTask(name,description,periodType,period,dueDate,taskListId);

        console.log('New task added');
        res.status(201).json({status: 'Success', details: 'Created new task'});
    } catch (err) {
        console.error(err);
        res.status(400).json({status:'Failure', details: err.message});
    }
}

const listTasks = async (req,res) => {
    try {
        const {page,limit,searchText} = req.query;
        const tasksList = await apiService.listTasks(searchText,page,limit);
        res.status(200).json({
            status: 'Success',
            tasksListedCount: tasksList.length,  
            tasksList
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({status:'Failure', details: err.message});
    }
}

module.exports = {createTaskList, createTask,listTasks};