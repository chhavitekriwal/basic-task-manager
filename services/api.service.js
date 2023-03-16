const TaskList = require('../models/taskList.model');
const Task = require('../models/task.model');
const {convertIndianToISO, convertISOToIndian} = require('../utils/task');
const {validateTaskRequest} = require('../utils/validate');

const createTaskList = async (name, description, active) => {
  let newList = await TaskList.create({
    name,
    description,
    active,
  });
  delete newList._doc.__v;
  return newList;
};

const createTask = async (name, description, periodType, period, dueDate, taskListId) => {
  validateTaskRequest(periodType, period, dueDate);
  dueDate = convertIndianToISO(dueDate);
  let newTask = await Task.create({
    name,
    description,
    dueDate,
    periodType,
    period,
    taskListId,
  });
  newTask = await newTask.populate('taskListId');
  newTask._doc.taskListName = newTask._doc.taskListId.name;
  delete newTask._doc._id;
  delete newTask._doc.__v;
  delete newTask._doc.taskListId;
  return newTask;
};

const listTasks = async (searchText, page = 1, limit = 10) => {
  const paginateOptions = {
    populate: 'taskListId',
    lean: true,
    leanWithId: false,
    page,
    limit,
  };
  const tasksres = await Task.paginate(
    {$or: [{name: new RegExp(searchText, 'i')}, {description: new RegExp(searchText, 'i')}]},
    paginateOptions
  );
  const tasksList = tasksres.docs;
  tasksList.map(task => {
    task.dueDate = convertISOToIndian(task.dueDate);
    task.taskListName = task.taskListId.name;

    delete task.taskListId;
    delete task._id;
    delete task.__v;

    return task;
  });
  return tasksList;
};
module.exports = {createTaskList, createTask, listTasks};
