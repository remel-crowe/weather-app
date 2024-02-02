import fetchData from "./apiCall";

const userLocation = document.getElementById("location");

export default function getWeather() {
  let searchValue = userLocation.value;
  return getAPIResponse(searchValue);
}

async function getAPIResponse(location) {
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
      feels: data.current.feelslike_c,
      uv: data.current.uv,
    },

    forecast: {
      days: data.forecast.forecastday,
      hours: data.forecast.forecastday[2],
    },
  };
}
