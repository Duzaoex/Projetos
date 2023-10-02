const data = require('../data/zoo_data');

const countSpecies = (species) => {
  const targetSpecies = data.species.find((s) => s.name === species);
  return targetSpecies ? targetSpecies.residents.length : 0;
};

const countAllSpecies = () => data.species.reduce((count, species) => {
  const residentsCount = countSpecies(species.name);
  return { ...count, [species.name]: residentsCount };
}, {});

const countAnimalsBySpeciesAndSex = (species, sex) => {
  const targetSpecies = data.species.find((s) => s.name === species);
  if (!targetSpecies) return 0;

  const residentsCount = targetSpecies.residents.filter((resident) => resident.sex === sex).length;
  return residentsCount;
};

const countAnimals = (animal = {}) => {
  const { species, sex } = animal;

  if (!species && !sex) {
    return countAllSpecies();
  }

  if (species && !sex) {
    return countSpecies(species);
  }

  return countAnimalsBySpeciesAndSex(species, sex);
};

module.exports = countAnimals;
