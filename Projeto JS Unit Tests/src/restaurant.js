/* eslint-disable max-len */
// Siga as orientações do README!

const createMenu = (menu) => {
  const fetchMenu = () => menu;

  const obj = {
    fetchMenu,
    consumption: [],
    order: (item) => {
      const { food, drinks } = menu;
      if (food[item] || drinks[item]) {
        obj.consumption.push(item);
      } else {
        console.log('Item indisponível');
      }
    },
    pay: () => {
      const { food, drinks } = menu;
      let total = 0;
      for (const item of obj.consumption) {
        if (food[item]) {
          total += food[item];
        } else if (drinks[item]) {
          total += drinks[item];
        }
      }
      return total * 1.1;
    },
  };

  return obj;
};

module.exports = createMenu;
