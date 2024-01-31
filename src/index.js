import getWeather from "./dataParser";
import updateDisplay from "./dom";

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async () => {
  let weather = await getWeather();
  updateDisplay(weather);
});
