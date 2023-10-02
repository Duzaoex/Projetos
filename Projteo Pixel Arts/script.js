const paleta = document.getElementById('color-palette');
const botao = document.getElementById('button-random-color');

const preencherCores = () => {
  const colors = [];
  colors.push('rgb(0, 0, 0)');

  for (let index = 0; index < 4; index += 1) {
    const color = colors[index] || coresRandom();

    const div = document.createElement('div');
    div.className = 'color';
    div.style.backgroundColor = color;
    paleta.appendChild(div);

    if (!colors[index]) {
      colors.push(color);
    }
  }
};

const selecionarCorPreta = () => {
  const blackColor = paleta.getElementsByClassName('color')[0];
  blackColor.classList.add('selected');
};

const atribuirEventoClique = () => {
  const selecionarCor = (event) => {
    const cores = paleta.getElementsByClassName('color');
    for (let index = 0; index < cores.length; index += 1) {
      cores[index].classList.remove('selected');
    }

    const corClicada = event.target;
    corClicada.classList.add('selected');
  };

  const cores = paleta.getElementsByClassName('color');
  for (let index = 0; index < cores.length; index += 1) {
    cores[index].addEventListener('click', selecionarCor);
  }
};

const preencher = () => {
  preencherCores();
  selecionarCorPreta();
  atribuirEventoClique();
};

const coresRandom = () => {
  const cor1 = Math.floor(Math.random() * 255);
  const cor2 = Math.floor(Math.random() * 255);
  const cor3 = Math.floor(Math.random() * 255);

  return `rgb(${cor1}, ${cor2}, ${cor3})`;  
};

const trocarCores = function () {
  const colorPalette = paleta.getElementsByClassName('color');
  const colors = [];

  for (let index = 0; index < colorPalette.length; index += 1) {
    const color = coresRandom();
    colorPalette[index].style.backgroundColor = color;
    colors.push(color);
  }

  localStorage.setItem('colorPalette', JSON.stringify(colors));
};

window.addEventListener('DOMContentLoaded', () => {
  preencher();
});

botao.addEventListener('click', () => {
  trocarCores();
  if (localStorage.getItem('divs')) {
    const savedColors = JSON.parse(localStorage.getItem('divs'));
    const colorPalette = paleta.getElementsByClassName('color');

    for (let index = 0; index < colorPalette.length; index += 1) {
      colorPalette[index].style.backgroundColor = savedColors[index];
    }
  }
});

const pixelBoard = document.getElementById('pixel-board');

for (let index = 0; index < 25; index += 1) {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixelBoard.appendChild(pixel);
}

const preencherPixel = function(event) {
  const corSelecionada = paleta.querySelector('.selected');
  if (!corSelecionada) return;
  const pixel = event.target;
  pixel.style.backgroundColor = corSelecionada.style.backgroundColor;
};

const pixels = document.getElementsByClassName('pixel');
for (let index = 0; index < pixels.length; index += 1) {
  pixels[index].addEventListener('click', preencherPixel);
}
const limparQuadro = function() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
};

const botaoLimpar = document.getElementById('clear-board');
botaoLimpar.addEventListener('click', limparQuadro);