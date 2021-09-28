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

function calculateBonusPercentage(employee) {
  let result = 0;

  switch (employee.reviewRating) {
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
      result = 0;
  }
  if (employee.employeeNumber.length === 4) {
    result += 5;
  }
  if (Number(employee.annualSalary) > 65000) {
    result -= 1;
  }

  if (result > 13) {
    result = 13;
  } else if (result < 0) {
    result = 0;
  }
  return result;
}

console.log(employees);
console.log(calculateBonusPercentage(employees[0]));
console.log(calculateBonusPercentage(employees[1]));
console.log(calculateBonusPercentage(employees[2]));
console.log(calculateBonusPercentage(employees[3]));
console.log(calculateBonusPercentage(employees[4]));

function bonusCalculator(employee) {
  let result = {};
  result.name = employee.name;
  result.bonusPercentage = calculateBonusPercentage(employee);
  let totalComp = (Number(employee.annualSalary)) * (1 + result.bonusPercentage / 100);
  totalComp = (Math.round(totalComp * 10)) / 10;
  // console.log(totalComp);
  result.totalCompensation = Math.round(totalComp);
  result.totalBonus = result.totalCompensation - Number(employee.annualSalary);
  return result;
}


function readyNow() {
  console.log('JQ');
  $("#btn").on('click', calcAllBonuses);
}

function calcAllBonuses() {
  
  for (let employee of employees) {
    let el = bonusCalculator(employee);
    $("#list").append(`<li>${el.name} - Bonus Percentage: ${el.bonusPercentage}, Total Comp: ${el.totalCompensation}, Total Bonus: ${el.totalBonus}</li>`);

  }
}
for (let employee of employees) {
  console.log(bonusCalculator(employee));
}

