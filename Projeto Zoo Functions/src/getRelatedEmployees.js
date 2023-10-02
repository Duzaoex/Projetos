const data = require('../data/zoo_data');

const isManager = (employeeId) => {
  const { employees } = data;
  return employees.some((employee) => employee.managers.includes(employeeId));
};

const getRelatedEmployees = (managerId) => {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const { employees } = data;
  const relatedEmployees = employees.filter((employee) => employee.managers.includes(managerId));
  const subordinateNames = relatedEmployees.map((employee) =>
    `${employee.firstName} ${employee.lastName}`);

  return subordinateNames;
};

module.exports = { isManager, getRelatedEmployees };
