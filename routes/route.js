const router = require('express').Router();
const {createTaskList, createTask} = require('../controllers/route');

router.post('/createtasklist',createTaskList);
router.post('/createtask',createTask);
//router.get('/tasklist',getTasks);

module.exports = router;