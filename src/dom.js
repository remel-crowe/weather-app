const currentWeather = document.querySelector(".top");
const hourlyWeather = document.querySelector(".hourly-container");
const airConditions = document.querySelector(".air-conditions-container");

export default function updateDisplay(weatherInfo) {
  updateCurrent(weatherInfo.current);
  updateForecast(weatherInfo.forecast);
  updateAir(weatherInfo.current);
}

function tConvert(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];
  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(" "); // return adjusted time or original string
}

function convertIcon(icon) {
  //Take a standard icon from the API and return a personalised version
  const newIcons = {
    sunny: "#",
  };
}

function updateCurrent(currentInfo) {
  const { location, temp, icon } = currentInfo;
  const currentWeatherDiv = document.createElement("div");
  currentWeatherDiv.classList.add("weatherBox");
  currentWeatherDiv.innerHTML = `    
    <div class="city">${location}</div>
    <div class="temp">${temp}&deg;</div>
    <img src=${icon}>`;
  currentWeather.innerHTML = "";
  currentWeather.appendChild(currentWeatherDiv);
}

function updateForecast(forecastInfo) {
  const selectedHours = [6, 9, 12, 15, 18, 21];
  // Filter the array to get the data for the selected hours
  const selectedHourlyData = forecastInfo.hours.hour.filter((hourData) =>
    selectedHours.includes(Number(hourData.time.substr(11, 2)))
  );

  const hourlyDivs = selectedHourlyData.map(
    (hour) => `
  <div class="hourly-info">
    <p class="time">${tConvert(hour.time.slice(-5))}</p>
    <img src="${hour.condition.icon}" alt="${hour.condition.text}">
    <p>${Math.round(hour.temp_c)}°C</p>
  </div>
`
  );

  hourlyWeather.innerHTML = hourlyDivs.join("");
}

function updateAir(airInfo) {
  const { uv, feels } = airInfo;
  airConditions.innerHTML = `
  <div>
    <div>
    <p>icon</p>
    <p>Real Feel</p>
    </div>
    <p>${uv}</p>
  </div>
  <div>
  <div>
    <p>icon</p>
    <p>Real Feel</p>
    </div>
    <p>${uv}</p>
  </div>
  <div>
  <div>
    <p>icon</p>
    <p>Real Feel</p>
    </div>
    <p>${uv}</p>
  </div>
  <div>
  <div>
    <p>icon</p>
    <p>Real Feel</p>
    </div>
    <p>${uv}</p>
  </div>`;
}
