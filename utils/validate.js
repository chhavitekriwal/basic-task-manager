const {getPeriodMonthAndYear, getDueMonthAndYear, getQuarterAndYear} = require('./task');

const validateTaskRequest = (periodType, period, dueDate) => {
  const {dueMonth, dueYear} = getDueMonthAndYear(dueDate);
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
};

module.exports = {validateTaskRequest};
