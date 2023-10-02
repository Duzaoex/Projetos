/*
  A função average recebe um array de tamanho variável e retorna a média dos valores recebidos.
  Caso a função receba algum valor não numérico ou um array vazio, o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/
const average = (array) => {
  if (array.length === 0) {
    return undefined;
  }

  let soma = 0;
  let contador = 0;

  for (let index = 0; index < array.length; index += 1) {
    if (typeof array[index] !== 'number') {
      return undefined;
    }
    soma += array[index];
    contador += 1;
  }

  return Math.round(soma / contador);
};

module.exports = average;

console.log(average([1, 2])); // Output: 2
console.log(average([1, 2, 3, 4, 5])); // Output: 3
console.log(average([1, 2, '3'])); // Output: undefined
console.log(average([])); // Output: undefined
