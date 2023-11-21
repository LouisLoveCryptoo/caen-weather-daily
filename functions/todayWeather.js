require("dotenv").config();

const apiKey = process.env.WEATHER_API;
const api = `http://api.openweathermap.org/data/2.5/forecast?q=Caen&appid=${apiKey}&units=metric&lang=fr`;

async function getWeather() {
  const fetchAPI = async (_url) => {
    try {
      const res = await fetch(_url);
      const data = await res.json();
      const today = new Date().toISOString().split("T")[0];

      // Décommenter pour choisir de filtrer par heures
      const todaysForecasts = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt);
        const forecastHour = forecastDate.getHours();
        return (
          forecast.dt_txt.startsWith(today) &&
          forecastHour >= 9 &&
          forecastHour <= 18
        );
      });
      return JSON.stringify(todaysForecasts);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return await fetchAPI(api);
}

module.exports = getWeather;
