const data = require('../data/zoo_data');

function getCollaboratorById(id) {
  const { employees } = data;
  return employees.find((employee) => employee.id === id);
}

function getOldestFromFirstSpecies(collaboratorId) {
  const { species } = data;

  const collaborator = getCollaboratorById(collaboratorId);
  if (!collaborator) {
    return [];
  }

  const speciesId = collaborator.responsibleFor[0];
  const targetSpecies = species.find((animal) => animal.id === speciesId);
  const animal = targetSpecies.residents.reduce((oldest, current) => (current.age
    > oldest.age ? current : oldest));

  return [animal.name, animal.sex, animal.age];
}

module.exports = getOldestFromFirstSpecies;
