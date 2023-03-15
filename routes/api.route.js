const router = require("express").Router();
const apiController = require("../controllers/api.controller");

router.post("/createtasklist", apiController.createTaskList);
router.post("/createtask", apiController.createTask);
router.get("/tasklist", apiController.listTasks);

module.exports = router;
