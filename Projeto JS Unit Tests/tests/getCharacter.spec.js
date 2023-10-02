/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const getCharacter = require('../src/getCharacter');

/*
A função getCharacter recebe uma string que representa o nome de um personagem e retorna um objeto contendo seu nome, sua classe e suas frases.

O retorno será de acordo com a seguinte relação:

 Parâmetro    |      Nome       |    Classe   |              Frases
 da função    |                 |             |
----------------------------------------------------------------------------------
"Arya"        |   Arya Stark    |    Rogue    | 'Not today', 'A girl has no name.'
"Brienne"     |  Brienne Tarth  |    Knight   | 'Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.'
"Melissandre" |   Melissandre   | Necromancer | 'Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.'

- Se o parâmetro não estiver na tabela, a função retorna `undefined`.
- Se o parâmetro estiver, a função retorna um objeto no formato abaixo:

  {
    name: 'Nome do Personagem',
    class: 'Classe do Personagem' ,
    phrases: ['frase1', 'frase2']
  }

- OBS.: O parâmetro não é CASE SENSITIVE, ou seja, não faz diferenças entre maiúsculas e minúsculas. Portanto Arya, ArYa e ARYA têm o mesmo resultado.

Escreva pelo menos seis testes para essa função garantindo que a implementação de getCharacter está correta.

Parâmetros:
  - Uma string.

Comportamento: 
  - getCharacter('Arya');

Retorno:
{
  name: 'Arya Stark',
  class: 'Rogue',
  phrases: [ 'Not today', 'A girl has no name.' ]
}
*/

describe('9 - Implemente os casos de teste da função `getCharacter`', () => {
  it('Verifica se a função `getCharacter` retorna o objeto do personagem corretamente.', () => {
    const result = getCharacter();
    expect(result).toBeUndefined();
    const result2 = getCharacter('Arya');
    const expected1 = {
      name: 'Arya Stark',
      class: 'Rogue',
      phrases: ['Not today', 'A girl has no name.'],
    };
    expect(result2).toEqual(expected1);
    const result3 = getCharacter('Brienne');
    const expected2 = {
      name: 'Brienne Tarth',
      class: 'Knight',
      phrases: ['Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.'],
    };
    expect(result3).toEqual(expected2);
    const result4 = getCharacter('Melissandre');
    const expected3 = {
      name: 'Melissandre',
      class: 'Necromancer',
      phrases: ['Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.'],
    };
    expect(result4).toEqual(expected3);
    const result5 = getCharacter('ARYA');
    const expected4 = {
      name: 'Arya Stark',
      class: 'Rogue',
      phrases: ['Not today', 'A girl has no name.'],
    };
    expect(result5).toEqual(expected4);
    const result6 = getCharacter('bRieNne');
    const expected5 = {
      name: 'Brienne Tarth',
      class: 'Knight',
      phrases: ['Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.'],
    };
    expect(result6).toEqual(expected5);
    const result7 = getCharacter('Jon Snow');
    expect(result7).toBeUndefined();
  });
  });
  