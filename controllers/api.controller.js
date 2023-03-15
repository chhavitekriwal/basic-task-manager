const apiService = require('../services/api.service');
const logger = require('../utils/winston');

const createTaskList = async (req, res) => {
  try {
    const {name, description} = req.body;
    await apiService.createTaskList(name, description);
    res.status(201).json({status: 'Success', details: 'New list created'});
  } catch (err) {
    res.status(400).json({status: 'Failure', details: err.message});
    logger.error(err);
  }
};

const createTask = async (req, res) => {
  try {
    let {name, description, periodType, period, dueDate, taskListId} = req.body;
    await apiService.createTask(name, description, periodType, period, dueDate, taskListId);
    res.status(201).json({status: 'Success', details: 'Created new task'});
  } catch (err) {
    res.status(400).json({status: 'Failure', details: err.message});
    logger.error(err);
  }
};

const listTasks = async (req, res) => {
  try {
    const {page, limit, searchText} = req.query;
    const tasksList = await apiService.listTasks(searchText, page, limit);
    res.status(200).json({
      status: 'Success',
      tasksListedCount: tasksList.length,
      tasksList,
    });
  } catch (err) {
    res.status(500).json({status: 'Failure', details: err.message});
    logger.error(err);
  }
};

module.exports = {createTaskList, createTask, listTasks};
