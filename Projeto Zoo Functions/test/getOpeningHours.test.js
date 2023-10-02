const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Deve retornar o objeto de horários de funcionamento quando nenhum argumento for passado', () => {
    const result = getOpeningHours();
    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(result).toEqual(expected);
  });

  it('Deve retornar a mensagem "The zoo is closed" para o argumento Monday e 09:00-AM', () => {
    const result = getOpeningHours('Monday', '09:00-AM');
    const expected = 'The zoo is closed';
    expect(result).toBe(expected);
  });

  it('Deve retornar a mensagem "The zoo is open" para o argumento Tuesday e 09:00-AM', () => {
    const result = getOpeningHours('Tuesday', '09:00-AM');
    const expected = 'The zoo is open';
    expect(result).toBe(expected);
  });

  it('Deve retornar a mensagem "The zoo is closed" para o argumento Wednesday e 09:00-PM', () => {
    const result = getOpeningHours('Wednesday', '09:00-PM');
    const expected = 'The zoo is closed';
    expect(result).toBe(expected);
  });

  it('Deve lançar uma exceção com a mensagem "The day must be valid. Example: Monday" para o argumento Thu e 09:00-AM', () => {
    expect(() => {
      getOpeningHours('Thu', '09:00-AM');
    }).toThrow('The day must be valid. Example: Monday');
  });

  it('Deve lançar uma exceção com a mensagem "The abbreviation must be \'AM\' or \'PM\'" para o argumento Friday e 09:00-ZM', () => {
    expect(() => {
      getOpeningHours('Friday', '09:00-ZM');
    }).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });

  it('Deve lançar uma exceção com a mensagem "The hour should represent a number" para o argumento Saturday e C9:00-AM', () => {
    expect(() => {
      getOpeningHours('Saturday', 'C9:00-AM');
    }).toThrow('The hour should represent a number');
  });

  it('Deve lançar uma exceção com a mensagem "The minutes should represent a number" para o argumento Sunday e 09:c0-AM', () => {
    expect(() => {
      getOpeningHours('Sunday', '09:c0-AM');
    }).toThrow('The minutes should represent a number');
  });
});
