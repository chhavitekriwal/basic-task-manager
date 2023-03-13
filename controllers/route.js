const TaskList = require('../models/taskList');
const Task = require('../models/task');

const createTaskList = async (req,res) => {
    try {
        const { name,description } = req.body;
        const taskList = new TaskList({
            name,
            description,
            active: false
        });
        await taskList.save();
        console.log('New List Added');
        res.status(201).json({status: 'Created'});
    } catch(err) {
        const response = {'Status':'Failure', 'Details':err.message};
        console.error(err);
        res.status(400).json(response);
    }
}

const createTask =  async (req,res) => {
    try {
        let {name, description, dueDate, periodType, period, taskListId} = req.body;
        if(periodType!='monthly' && periodType!='yearly' && periodType!='quarterly') throw new Error('Invalid period type provided for task.');
        if(periodType === 'monthly') {
            const periodArr = period.split(" ");
            if (periodArr.length!=2) throw new Error('Invalid period provided for monthly period type');
            let periodMonthIndex=null;
            const periodYear = parseInt(periodArr[1]);
            switch (periodArr[0]) {
                case "Jan" : periodMonthIndex = 1; break;
                case "Feb" : periodMonthIndex = 2; break;
                case "Mar" : periodMonthIndex = 3; break;
                case "Apr" : periodMonthIndex = 4; break;
                case "May" : periodMonthIndex = 5; break;
                case "Jun" : periodMonthIndex = 6; break;
                case "Jul" : periodMonthIndex = 7; break;
                case "Aug" : periodMonthIndex = 8; break;
                case "Sept" : periodMonthIndex =9; break;
                case "Oct" : periodMonthIndex = 10; break;
                case "Nov" : periodMonthIndex = 11; break;
                case "Dec" : periodMonthIndex = 12; break;
                default: {
                    throw new Error('Invalid month provided for period');
                }
            }
            const dueDateYear = parseInt(dueDate.substring(6));
            const dueDateMonthIndex = parseInt(dueDate.substring(3,5));
            if(dueDateYear<periodYear) throw new Error('Due date earlier than end of period');
            if(dueDateYear === periodYear && dueDateMonthIndex <= periodMonthIndex) throw new Error('Due date earlier than end of period'); 
        }

        if(periodType === 'quarterly') {
            const periodArr = period.split(" ");
            if(periodArr.length!=2) throw new Error('Invalid period provided for quarterly period type.');
            const quarter = parseInt(periodArr[0][1]);
            if(quarter<1 || quarter>4) throw new Error('Invalid period provided for quarterly period type.');
            const dueDateMonth = parseInt(dueDate.substring(3,5));
            const dueDateYear = parseInt(dueDate.substring(6));
            if(dueDateYear<parseInt(periodArr[1])) throw new Error('Due date earlier than end of period');
            if(dueDateYear==parseInt(periodArr[1]) && dueDateMonth<=(3*quarter)) throw new Error('Due date earlier than end of period');
        }

        if(periodType === 'yearly') {
            const dueDateYear = parseInt(dueDate.substring(0,4));
            if(dueDateYear <= period) throw new Error('Due date earlier than end of period');
        }

        dueDate = dueDate.substring(6)+'/'+dueDate.substring(3,5)+'/'+dueDate.substring(0,2);
        const task = new Task({
            name,
            description,
            dueDate: new Date(dueDate),
            periodType,
            period,
            taskListId
        });
        await task.save();

        console.log('New task added');
        res.status(201).json({status: 'Success', details: 'Created new task'});
    } catch (err) {
        console.error(err);
        res.status(400).json({status:'Failure', details: err.message});
    }
}
module.exports = {createTaskList, createTask};