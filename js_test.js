// The factories array
const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
];
  
// Task 1: Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
function countEmployeesByFactory(factories) {
  return factories.map(factory => {
    return { name: factory.name, count: factory.employees.length }
  });
}

// Task 2: Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
function countFactoriesByEmployee(factories) {
  let employeeCount = {};
  
  factories.forEach(factory => {
    factory.employees.forEach(employee => {
      if (employee in employeeCount) {
        employeeCount[employee] += 1;
      } else {
        employeeCount[employee] = 1;
      }
    });
  });

  //The function takes the keys (employee names) from employeeCount, 
  //and for each key, it returns a new object { employee: key, count: employeeCount[key] }.
  return Object.keys(employeeCount).map(key => {
    return { employee: key, count: employeeCount[key] }
  });
}

// Task 3: Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function sortEmployeesAlphabetically(factories) {
  return factories.map(factory => {
    return { 
      name: factory.name, 
      employees: factory.employees.sort()
    }
  });
}

//Test the function
console.log("Output of the function countEmployeesByFactory:", countEmployeesByFactory(factories));
console.log("Output of the function countEmployeesByFactory:", countFactoriesByEmployee(factories));
console.log("Output of the function sortEmployeesAlphabetically:", sortEmployeesAlphabetically(factories));


// For the employees, employeeType and tasks arrays
const employeeType = [
  {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
  {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
  {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"}
];

const employees = [
  {id: 1, name: "Alice", type: 2},
  {id: 2, name: "Bob", type: 3},
  {id: 3, name: "John", type: 2},
  {id: 4, name: "Karen", type: 1},
  {id: 5, name: "Miles", type: 3},
  {id: 6, name: "Henry", type: 1}
];

const tasks = [
  {id: 1, title: "task01", duration: 60 },
  {id: 2, title: "task02", duration: 120},
  {id: 3, title: "task03", duration: 180},
  {id: 4, title: "task04", duration: 360},
  {id: 5, title: "task05", duration: 30},
  {id: 6, title: "task06", duration: 220},
  {id: 7, title: "task07", duration: 640},
  {id: 8, title: "task08", duration: 250},
  {id: 9, title: "task09", duration: 119},
  {id: 10, title: "task10", duration: 560},
  {id: 11, title: "task11", duration: 340},
  {id: 12, title: "task12", duration: 45},
  {id: 13, title: "task13", duration: 86},
  {id: 14, title: "task14", duration: 480},
  {id: 15, title: "task15", duration: 900}
];

// Task 4: Count total hours worked in 1 day ? // => 39
function countTotalWorkedHours(employeeType, employees) {
  let totalMinutes = 0;

  employeeType.forEach(type => {
    const [workBeginHour, workBeginMin] = type.work_begin.split(':').map(Number);
    const [workEndHour, workEndMin] = type.work_end.split(':').map(Number);

    let workMinutes;
    if (workEndHour >= workBeginHour) {
      workMinutes = (workEndHour - workBeginHour) * 60 + workEndMin - workBeginMin;
    } else {
      // If the shift ends after midnight
      workMinutes = ((24 - workBeginHour) + workEndHour) * 60 - workBeginMin + workEndMin;
    }

    // Calculate the number of employees working this shift
    const employeesWorkingThisShift = employees.filter(emp => emp.type === type.id).length;

    totalMinutes += workMinutes * employeesWorkingThisShift;
  });

  return totalMinutes / 60; // Convert minutes to hours
}

// Task 5: Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
function howManyEmployeeByTime(time) {
  let count = 0;
  
  let [hours, minutes] = time.split(':').map(Number);

  // if the input time is '00:00', consider it as '24:00' for calculation
  if (hours === 0 && minutes === 0) {
    hours = 24;
  }
  
  employeeType.forEach(type => {
    let [workBeginHour, workBeginMin] = type.work_begin.split(':').map(Number);
    let [workEndHour, workEndMin] = type.work_end.split(':').map(Number);

    // if workEnd is '00:00', consider it as '24:00' for calculation
    if (workEndHour === 0 && workEndMin === 0) {
      workEndHour = 24;
    }

    if ((hours > workBeginHour || (hours === workBeginHour && minutes >= workBeginMin)) &&
        (hours < workEndHour || (hours === workEndHour && minutes <= workEndMin))) {
      count += employees.filter(emp => emp.type === type.id).length;
    }
  });
  
  return count;
}

// Task 6: How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
function calculateWorkDaysNeeded(tasks) {
  const totalTaskDuration = tasks.reduce((acc, curr) => acc + curr.duration, 0);
  const dailyWorkHours = countTotalWorkedHours(employeeType, employees);
  
  // Convert duration from minutes to hours and calculate days
  return Math.ceil((totalTaskDuration / 60) / dailyWorkHours);
}
  
//Test the function
console.log("Output of the function countTotalWorkedHours:", countTotalWorkedHours(employeeType, employees));
console.log("Output of the function howManyEmployeeByTime:", howManyEmployeeByTime('21:00'));
console.log("Output of the function calculateWorkDaysNeeded:", calculateWorkDaysNeeded(tasks));