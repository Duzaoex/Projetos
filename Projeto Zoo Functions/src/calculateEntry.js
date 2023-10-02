const data = require('../data/zoo_data');

console.log(data);

const countEntrants = (entrants) => entrants.reduce(
  (acc, entrant) => {
    if (entrant.age < 18) {
      acc.child += 1;
    } else if (entrant.age >= 18 && entrant.age < 50) {
      acc.adult += 1;
    } else {
      acc.senior += 1;
    }
    return acc;
  },
  { child: 0, adult: 0, senior: 0 },
);

const calculateEntry = (entrants) => {
  if (!entrants || entrants.length === 0) {
    return 0;
  }

  const count = countEntrants(entrants);

  const totalPrice = count.child * 20.99
  + count.adult * 49.99 + count.senior * 24.99;

  return parseFloat(totalPrice.toFixed(2));
};

module.exports = { calculateEntry, countEntrants };
