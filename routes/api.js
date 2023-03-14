const router = require('express').Router();
const {createTaskList, createTask,listTasks} = require('../controllers/api');

router.post('/createtasklist',createTaskList);
router.post('/createtask',createTask);
router.get('/tasklist',listTasks);

module.exports = router;