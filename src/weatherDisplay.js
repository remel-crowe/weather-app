import fetchData from "./apiCall";

const userLocation = document.getElementById("location");

export default function weatherUpdate() {
  let searchValue = userLocation.value;
  return getWeather(searchValue);
}

async function getWeather(location) {
  if (!location) {
    location = "London";
  }
  let data = await fetchData(location);

  return {
    current: {
      location: data.location.name,
      temp: data.current.temp_c,
      conditions: data.current.condition.text,
      icon: data.current.condition.icon,
    },

    forecast: {
      hours: data.forecast.forecastday[2],
    },
  };
}
