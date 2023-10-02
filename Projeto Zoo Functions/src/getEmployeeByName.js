const data = require('../data/zoo_data');

function getEmployeeByName(name) {
  const { employees } = data;

  const lowercaseName = name ? name.toLowerCase() : undefined;
  const findEmployee = (emp) =>
    emp.firstName.toLowerCase() === lowercaseName || emp.lastName.toLowerCase() === lowercaseName;

  const mapEmployeeData = (employee) => ({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    managers: employee.managers,
    responsibleFor: employee.responsibleFor,
  });

  const employee = employees.find(findEmployee);

  return employee ? mapEmployeeData(employee) : {};
}

module.exports = getEmployeeByName;
