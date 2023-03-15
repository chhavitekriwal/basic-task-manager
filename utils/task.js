const getPeriodMonthAndYear = period => {
  const periodArr = period.split(' ');
  if (periodArr.length != 2) throw new Error('Invalid period provided for monthly period type');
  let periodMonthIndex = null;
  switch (periodArr[0]) {
    case 'Jan':
      periodMonthIndex = 1;
      break;
    case 'Feb':
      periodMonthIndex = 2;
      break;
    case 'Mar':
      periodMonthIndex = 3;
      break;
    case 'Apr':
      periodMonthIndex = 4;
      break;
    case 'May':
      periodMonthIndex = 5;
      break;
    case 'Jun':
      periodMonthIndex = 6;
      break;
    case 'Jul':
      periodMonthIndex = 7;
      break;
    case 'Aug':
      periodMonthIndex = 8;
      break;
    case 'Sept':
      periodMonthIndex = 9;
      break;
    case 'Oct':
      periodMonthIndex = 10;
      break;
    case 'Nov':
      periodMonthIndex = 11;
      break;
    case 'Dec':
      periodMonthIndex = 12;
      break;
    default: {
      throw new Error('Invalid month provided for period');
    }
  }
  const periodYear = parseInt(periodArr[1]);
  return {periodMonthIndex, periodYear};
};

const getDueMonthAndYear = dueDate => {
  const dueDateArr = dueDate.split('-');
  const dueMonth = parseInt(dueDateArr[1]),
    dueYear = parseInt(dueDateArr[2]);
  return {dueMonth, dueYear};
};

const getQuarterAndYear = period => {
  const periodArr = period.split(' ');
  if (periodArr.length != 2) throw new Error('Invalid period provided for quarterly period type');
  const periodQuarter = parseInt(periodArr[0][1]),
    periodYear = parseInt(periodArr[1]);
  if (periodQuarter < 1 || periodQuarter > 4) throw new Error('Invalid quarter provided for period');
  return {periodQuarter, periodYear};
};

const convertISOToIndian = date => {
  return date.toLocaleDateString('en-GB', {timezone: 'Asia/Kolkata'}).split('/').join('-');
};

const convertIndianToISO = date => {
  return new Date(date.split('-').reverse().join('/'));
};

module.exports = {getPeriodMonthAndYear, getDueMonthAndYear, getQuarterAndYear, convertISOToIndian, convertIndianToISO};
