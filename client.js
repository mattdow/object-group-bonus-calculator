const employees = [
  {
    name: 'Atticus',
    employeeNumber: '2405',
    annualSalary: '47000',
    reviewRating: 3
  },
  {
    name: 'Jem',
    employeeNumber: '62347',
    annualSalary: '63500',
    reviewRating: 4
  },
  {
    name: 'Scout',
    employeeNumber: '6243',
    annualSalary: '74750',
    reviewRating: 5
  },
  {
    name: 'Robert',
    employeeNumber: '26835',
    annualSalary: '66000',
    reviewRating: 1
  },
  {
    name: 'Mayella',
    employeeNumber: '89068',
    annualSalary: '35000',
    reviewRating: 1
  }
];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// This problem is massive! Break the problem down, take small steps, and test as you go.
// What is the fewest lines of code I can write and test to get just a little closer?

// This is not a race. Everyone on your team should understand what is happening.
// Ask questions when you don't.

$(document).ready(readyNow);

// Starting with a function to calculate the bonus percentage, as that has all the business logic.

function calculateBonusPercentage(employee) {
  let result = 0;

  switch (employee.reviewRating) { // using a switch statement for review rating bonus
    case 3:
      result += 4;
      break;
    case 4:
      result += 6;
      break;
    case 5:
      result += 10;
      break;
    default:
      return 0; // Edited this: per instructions, no bonus if poor review, so we should return 0 immediately.
  }
  // Adjusting bonus percentage if length is 4
  if (employee.employeeNumber.length === 4) {
    result += 5;
  }
  // Adjusting bonus percentage for high salaries
  if (Number(employee.annualSalary) > 65000) {
    result -= 1;
  }
  // capping and flooring our bonus percentages
  if (result > 13) {
    result = 13;
  } else if (result < 0) {
    result = 0;
  }
  return result;
}
// Testing on the array of employees
console.log(employees);
console.log(calculateBonusPercentage(employees[0]));
console.log(calculateBonusPercentage(employees[1]));
console.log(calculateBonusPercentage(employees[2]));
console.log(calculateBonusPercentage(employees[3]));
console.log(calculateBonusPercentage(employees[4]));

// Creating a function to create the bonus object
function bonusCalculator(employee) {
  let result = {};
  result.name = employee.name; // name should be the same as the employee object
  result.bonusPercentage = calculateBonusPercentage(employee); // calling the bonus percent function
  let totalComp = (Number(employee.annualSalary)) * (1 + result.bonusPercentage / 100);
  totalComp = (Math.round(totalComp * 10)) / 10; // Adding an intermediate rounding step to eliminate float calculation errors
  // console.log(totalComp);
  result.totalCompensation = Math.round(totalComp);
  result.totalBonus = result.totalCompensation - Number(employee.annualSalary);
  return result;
}

// Initializing jQuery
function readyNow() {
  console.log('JQ');
  $("#btn").on('click', calcAllBonuses); // calling the bonus table row generator
}

// Create a table row based on the bonus object for each employee
function calcAllBonuses() {

  for (let employee of employees) {
    let el = bonusCalculator(employee); // call the function to create the bonus object
    $("#tbl").append(`<tr><td>${el.name}</td><td>${el.bonusPercentage}%</td><td>${formatCurrency(el.totalCompensation)}</td><td>${formatCurrency(el.totalBonus)}</td></tr>`);

  }
}

// Base goal: console log the bonus objects
for (let employee of employees) {
  console.log(bonusCalculator(employee));
}

// Creating a format currency function to make the comp fields look right
function formatCurrency(number) {
  return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  }).format(number);
}

