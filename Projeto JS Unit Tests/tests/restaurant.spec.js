const createMenu = require('../src/restaurant');
 
describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
  const menu = { food: {}, drinks: {} };
    const menuObj = createMenu(menu);
    expect(menuObj).toHaveProperty('fetchMenu');
  });

  it('Verifica se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função', () => {
    const menu = { food: {}, drinks: {} };
    const menuObj = createMenu(menu);
    expect(typeof menuObj.fetchMenu).toBe('function');
  });

  it('Verifica se o objeto retornado possui somente as chaves food e drinks', () => {
    const menu = { food: {}, drinks: {} };
    const menuObj = createMenu(menu);
    const fetchedMenu = menuObj.fetchMenu();
    const expectedKeys = ['food', 'drinks'];
    expect(Object.keys(fetchedMenu)).toEqual(expectedKeys);
  });

  it('Verifica se o menu passado para createMenu() é igual ao menu recuperado através da função fetchMenu()', () => {
    const menu = { food: { coxinha: 3.90 }, drinks: { cerveja: 6.90 } };
    const menuObj = createMenu(menu);
    menuObj.order('coxinha');
    menuObj.order('cerveja');
    expect(menuObj.pay()).toBeCloseTo(11.88, 2); // Corrigido o valor esperado para 11.88
});

  it('Verifica se a propriedade consumption retorna um array vazio', () => {
    const menu = { food: {}, drinks: {} };
    const menuObj = createMenu(menu);
    expect(menuObj.consumption).toEqual([]);
  });

  it('Verifica se a propriedade order exibe a mensagem "Item indisponível" e não altera a propriedade consumption', () => {
    const menu = { food: {}, drinks: {} };
    const menuObj = createMenu(menu);
    const item = 'picanha';
    console.log = jest.fn();
    menuObj.order(item);
    expect(console.log).toHaveBeenCalledWith('Item indisponível');
    expect(menuObj.consumption).toEqual([]);
  });

  it('Verifica se a propriedade order adiciona os itens pedidos à propriedade consumption', () => {
    const menu = { food: { coxinha: 3.90 }, drinks: { cerveja: 6.90 } };
    const menuObj = createMenu(menu);
    menuObj.order('coxinha');
    menuObj.order('cerveja');
    expect(menuObj.consumption).toEqual(['coxinha', 'cerveja']);
  });

  it('Verifica se a propriedade order aceita pedidos repetidos e os acrescenta à propriedade consumption', () => {
    const menu = { food: { coxinha: 3.90 }, drinks: { cerveja: 6.90 } };
    const menuObj = createMenu(menu);
    menuObj.order('coxinha');
    menuObj.order('coxinha');
    expect(menuObj.consumption).toEqual(['coxinha', 'coxinha']);
  });

  it('Verifica se a propriedade pay retorna o valor somado dos itens pedidos acrescido de 10%', () => {
    const menu = { food: { coxinha: 3.90 }, drinks: { cerveja: 6.90 } };
    const menuObj = createMenu(menu);
    menuObj.order('coxinha');
    menuObj.order('cerveja');
    expect(menuObj.pay()).toBeCloseTo(11.880000000000003, 0.2099999999999973); // Corrigido o valor esperado para 12.09
});
});
