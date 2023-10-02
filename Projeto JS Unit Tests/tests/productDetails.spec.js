const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    expect( typeof productDetails).toBe('function');
    const result = productDetails('Alcool gel', 'Máscara');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(typeof result[0]).toBe('object');
    expect(typeof result[1]).toBe('object');
    const result2 = productDetails('Alcool gel', 'Sabonete');
    expect(result[0]).not.toBe(result2[0]);
    expect(result[1]).not.toBe(result2[1]);
    expect(result[0].details.productId.endsWith('123')).toBe(true);
    expect(result[1].details.productId.endsWith('123')).toBe(true);
  });
});
