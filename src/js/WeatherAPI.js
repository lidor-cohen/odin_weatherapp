import apiKey from "../key.txt";
function WeatherController() {
  this.forecast_weather_url =
    "http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=";
}

WeatherController.prototype = {
  fetchData: async function (city = "London") {
    try {
      const response = await fetch(this.forecast_weather_url + city, {
        mode: "cors",
      });
      const data = response.json();
      return data;
    } catch (error) {
      return null;
    }
  },

  getAllData: async function (city) {
    try {
      const current_data = await this.fetchData(city);

      const forecastHours = current_data.forecast.forecastday[0].hour;
      let forecastHourMinified = [];
      for (const index in forecastHours) {
        forecastHourMinified.push({
          condition: forecastHours[index].condition,
          time: forecastHours[index].time.split(" ")[1],
        });
      }

      return {
        city: current_data.location.name,
        country: current_data.location.country,
        condition: {
          image: current_data.current.condition.icon,
          text: current_data.current.condition.text,
        },
        humidity: current_data.current.humidity,
        uvindex: current_data.current.uv,
        temp_c: current_data.current.temp_c,
        wind_kph: current_data.current.wind_kph,
        feelslike_c: current_data.current.feelslike_c,

        forecast: {
          chance_of_rain:
            current_data.forecast.forecastday[0].day.daily_chance_of_rain,
          hours: forecastHourMinified,
        },
      };
    } catch (error) {
      alert("There is no such city!");
      return this.getAllData("London");
    }
  },
};

const weatherController = new WeatherController();

export { weatherController };
