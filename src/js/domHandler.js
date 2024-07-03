import { weatherController } from "./WeatherAPI";

function DomHandler() {
  this.header = document.querySelector(".text1-wrapper h2");
  this.headerCOR = document.querySelector(".text1-wrapper p");
  this.degrees = document.querySelector(".display-text h1");
  this.currentConditionImage = document.querySelector(".large-display img");
  this.forecastHours = document.querySelectorAll(".forecast-horizontal-item");
  this.acRealFeel = document.querySelector("#ac-realfeel h2");
  this.acWind = document.querySelector("#ac-wind h2");
  this.acCOR = document.querySelector("#ac-cor h2");
  this.acUVIndex = document.querySelector("#ac-uvindex h2");

  this.cityInput = document.querySelector("input");
}

DomHandler.prototype = {
  render: function (city) {
    weatherController.getAllData(city).then((data) => {
      // Update big header title and chance of rain
      this.header.textContent = data.city + ", " + data.country;
      this.headerCOR.textContent =
        "There is " + data.forecast.chance_of_rain + "% chance of rain today";

      // Update big Degrees header
      this.degrees.textContent = data.temp_c + "°";

      // Update big condition image
      this.currentConditionImage.src = data.condition.image;

      // Update all forecast Hours
      this.forecastHours.forEach((item) => {
        const time = item.querySelector("p");
        const relevantObject = data.forecast.hours.find((e) =>
          e.time.includes(time.textContent)
        );
        item.querySelector("h4").textContent = relevantObject.condition.text;
        item.querySelector("img").src = relevantObject.condition.icon;
      });

      // Update Air Conditions
      this.acRealFeel.textContent = data.feelslike_c + "°";
      this.acWind.textContent = data.wind_kph + " km/h";
      this.acCOR.textContent = data.forecast.chance_of_rain + "%";
      this.acUVIndex.textContent = data.uvindex;
    });
  },
  bindEvents: function () {
    this.cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.render(this.cityInput.value);
      }
    });
  },
  init: function () {
    this.render("London");
  },
};

const domHandler = new DomHandler();
domHandler.init();

export { domHandler };
