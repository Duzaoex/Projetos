const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const speciesData = data.species;

  if (ids.length === 0) {
    return [];
  }

  if (ids.length === 1) {
    const id = ids[0];
    const speciesMatch = speciesData.find((animal) => animal.id === id);
    return speciesMatch ? [speciesMatch] : [];
  }

  return speciesData.filter((animal) => ids.includes(animal.id));
}

module.exports = getSpeciesByIds;
