import { searchCities, getWeatherByCity } from './weatherAPI';

function createElement(tagName, className, textContent = '') {
  const element = document.createElement(tagName);
  element.classList.add(...className.split(' '));
  element.textContent = textContent;
  return element;
}

function createForecast(forecast) {
  const { date, maxTemp, minTemp, condition, icon } = forecast;

  const weekday = new Date(date);
  weekday.setDate(weekday.getDate() + 1);
  const weekdayName = weekday.toLocaleDateString('pt-BR', { weekday: 'short' });

  const forecastElement = createElement('div', 'forecast');
  const dateElement = createElement('p', 'forecast-weekday', weekdayName);

  const maxElement = createElement('span', 'forecast-temp max', 'max');
  const maxTempElement = createElement('span', 'forecast-temp max', `${maxTemp}º`);
  const minElement = createElement('span', 'forecast-temp min', 'min');
  const minTempElement = createElement('span', 'forecast-temp min', `${minTemp}º`);
  const tempContainer = createElement('div', 'forecast-temp-container');
  tempContainer.appendChild(maxElement);
  tempContainer.appendChild(minElement);
  tempContainer.appendChild(maxTempElement);
  tempContainer.appendChild(minTempElement);

  const conditionElement = createElement('p', 'forecast-condition', condition);
  const iconElement = createElement('img', 'forecast-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const middleContainer = createElement('div', 'forecast-middle-container');
  middleContainer.appendChild(tempContainer);
  middleContainer.appendChild(iconElement);

  forecastElement.appendChild(dateElement);
  forecastElement.appendChild(middleContainer);
  forecastElement.appendChild(conditionElement);

  return forecastElement;
}

function clearChildrenById(elementId) {
  const citiesList = document.getElementById(elementId);
  while (citiesList.firstChild) {
    citiesList.removeChild(citiesList.firstChild);
  }
}

/**
 * Recebe uma lista de previsões e as exibe na tela dentro de um modal
 */
export function showForecast(forecastList) {
  const forecastContainer = document.getElementById('forecast-container');
  const weekdayContainer = document.getElementById('weekdays');
  clearChildrenById('weekdays');
  forecastList.forEach((forecast) => {
    const weekdayElement = createForecast(forecast);
    weekdayContainer.appendChild(weekdayElement);
  });

  forecastContainer.classList.remove('hidden');
}

/**
 * Recebe um objeto com as informações de uma cidade e retorna um elemento HTML
 */
export function createCityElement(cityInfo) {
  const { name, country, temp, condition, icon, url } = cityInfo;

  const cityElement = createElement('li', 'city');

  const headingElement = createElement('div', 'city-heading');
  const nameElement = createElement('h2', 'city-name', name);
  const countryElement = createElement('p', 'city-country', country);
  headingElement.appendChild(nameElement);
  headingElement.appendChild(countryElement);

  const tempElement = createElement('p', 'city-temp', `${temp}º`);
  const conditionElement = createElement('p', 'city-condition', condition);

  const tempContainer = createElement('div', 'city-temp-container');
  tempContainer.appendChild(conditionElement);
  tempContainer.appendChild(tempElement);

  const iconElement = createElement('img', 'condition-icon');
  iconElement.src = icon.replace('64x64', '128x128');

  const infoContainer = createElement('div', 'city-info-container');
  infoContainer.appendChild(tempContainer);
  infoContainer.appendChild(iconElement);

  const forecastButton = createElement('button', 'forecast-button', 'Ver previsão');
  forecastButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${import.meta.env.VITE_TOKEN}&q=${url}&days=7`);
      const data = await response.json();
      const forecastData = data.forecast.forecastday.map((forecast) => {
        return {
          date: forecast.date,
          maxTemp: forecast.day.maxtemp_c,
          minTemp: forecast.day.mintemp_c,
          condition: forecast.day.condition.text,
          icon: forecast.day.condition.icon,
        };
      });
      showForecast(forecastData);
    } catch (error) {
      console.error('Erro ao obter a previsão do tempo:', error);
    }
  });

  cityElement.appendChild(headingElement);
  cityElement.appendChild(infoContainer);
  cityElement.appendChild(forecastButton);

  return cityElement;
}

/**
 * Lida com o evento de submit do formulário de busca
 */
export function handleSearch(event) {
  event.preventDefault();
  clearChildrenById('cities');

  const searchValue = document.getElementById('search-input').value;

  searchCities(searchValue).then(async (cities) => {
    const fetchPromises = cities.map(async (city) => {
      const weatherData = await getWeatherByCity(city.url);
      const cityElement = createCityElement({
        name: city.name,
        country: city.country,
        temp: weatherData.temp,
        condition: weatherData.condition,
        icon: weatherData.icon,
        url: city.url,
      });
      const citiesList = document.getElementById('cities');
      citiesList.appendChild(cityElement);
    });

    await Promise.all(fetchPromises);

    console.log('Todas as cidades foram processadas');
  });
}
