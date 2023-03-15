const TaskList = require('../models/taskList.model');
const Task = require('../models/task.model');
const {getPeriodMonthAndYear, getDueMonthAndYear, getQuarterAndYear, convertDateFormat} = require('../utils/task');

const createTaskList = (name, description) => {
  return TaskList.create({
    name,
    description,
    active: true,
  });
};

const createTask = (name, description, periodType, period, dueDate, taskListId) => {
  const {dueMonth, dueYear, dueDateNew} = getDueMonthAndYear(dueDate);

  if (periodType != 'monthly' && periodType != 'yearly' && periodType != 'quarterly')
    throw new Error('Invalid period type provided for task.');
  if (periodType === 'monthly') {
    const {periodMonthIndex, periodYear} = getPeriodMonthAndYear(period);
    if (dueYear < periodYear) throw new Error('Due date earlier than end of period');
    if (dueYear === periodYear && dueMonth <= periodMonthIndex) throw new Error('Due date earlier than end of period');
  } else if (periodType === 'quarterly') {
    const {periodQuarter, periodYear} = getQuarterAndYear(period);
    if (dueYear < periodYear) throw new Error('Due date earlier than end of period');
    if (dueYear == periodYear && dueMonth <= 3 * periodQuarter) throw new Error('Due date earlier than end of period');
  } else if (periodType === 'yearly') {
    if (dueYear <= period) throw new Error('Due date earlier than end of period');
  }

  return Task.create({
    name,
    description,
    dueDate: new Date(dueDateNew),
    periodType,
    period,
    taskListId,
  });
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
    task.dueDate = convertDateFormat(task.dueDate);
    task.taskListName = task.taskListId.name;

    delete task.taskListId;
    delete task._id;
    delete task.__v;

    return task;
  });
  return tasksList;
};
module.exports = {createTaskList, createTask, listTasks};
