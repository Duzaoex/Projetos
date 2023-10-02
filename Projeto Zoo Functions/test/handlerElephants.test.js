const handlerElephants = require('../src/handlerElephants');

describe('handlerElephants', () => {
  describe('quando o parâmetro é indefinido', () => {
    it('deve retornar indefinido', () => {
      const result = handlerElephants();
      expect(result).toBeUndefined();
    });
  });

  describe('quando o parâmetro não é uma string', () => {
    it('deve retornar uma mensagem de erro', () => {
      const result = handlerElephants(123);
      expect(result).toEqual('Parâmetro inválido, é necessário uma string');
    });
  });

  describe('quando o parâmetro é "count"', () => {
    it('deve retornar a contagem dos elefantes residentes', () => {
      const result = handlerElephants('count');
      expect(result).toBeDefined();
      expect(typeof result).toBe('number');
    });
  });

  describe('quando o parâmetro é "names"', () => {
    it('deve retornar um array com os nomes dos elefantes', () => {
      const result = handlerElephants('names');
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((name) => {
        expect(typeof name).toBe('string');
      });
    });
  });

  describe('quando o parâmetro é "averageAge"', () => {
    it('deve retornar a idade média dos elefantes residentes', () => {
      const result = handlerElephants('averageAge');
      expect(result).toBeDefined();
      expect(typeof result).toBe('number');
    });
  });

  describe('quando o parâmetro é inválido', () => {
    it('deve retornar nulo', () => {
      const result = handlerElephants('invalid');
      expect(result).toBeNull();
    });
  });
});
