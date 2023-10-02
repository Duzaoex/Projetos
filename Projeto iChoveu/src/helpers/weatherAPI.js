// Remova os comentários a medida que for implementando as funções

export const searchCities = async (term) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_TOKEN}&q=${encodeURIComponent(term)}`);
    const data = await response.json();
    console.log(data); // Verifica o valor retornado
    if (data.length === 0) {
      alert('Nenhuma cidade encontrada');
      return [];
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWeatherByCity = async (cityURL) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_TOKEN}&q=${encodeURIComponent(cityURL)}`);
    const data = await response.json();
    const { temp_c: temp, condition: { text: condition },
      condition: { icon } } = data.current;
    return { temp, condition, icon };
  } catch (error) {
    console.error(error);
    return null;
  }
};
