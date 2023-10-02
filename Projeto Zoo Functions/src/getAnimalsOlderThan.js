const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  const speciesData = data.species.find((sp) => sp.name === animal);

  const allAnimalsMeetAgeRequirement = speciesData.residents.every((resident) =>
    resident.age >= age);

  return allAnimalsMeetAgeRequirement;
};

module.exports = getAnimalsOlderThan;
