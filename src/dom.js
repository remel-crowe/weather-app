const currentWeather = document.querySelector(".top");
const hourlyWeather = document.querySelector(".hourly-container");
const airConditions = document.querySelector(".air-conditions-container");
const weekForecast = document.querySelector(".forecast");

export default function updateDisplay(weatherInfo) {
  updateCurrent(weatherInfo.current);
  updateForecast(weatherInfo.forecast);
  updateAir(weatherInfo.current);
  updateWeek(weatherInfo.forecast.days);
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
    <p>${feels}</p>
  </div>
  <div>
  <div>
    <p>icon</p>
    <p>UV</p>
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

function updateWeek(weekinfo) {
  weekForecast.innerHTML = "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  weekinfo.map((day) => {
    let date = new Date(day.date);
    let tday = days[date.getDay()];
    let condition = day.day.condition.text;

    let dayDiv = document.createElement("div");
    dayDiv.classList.add("day-container");
    dayDiv.innerHTML = `
    <p>${tday} | ${condition}</p>
    `;
    weekForecast.appendChild(dayDiv);
  });
}
