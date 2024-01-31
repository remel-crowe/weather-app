import weatherUpdate from "./weatherDisplay";
import updateDisplay from "./dom";

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async () => {
  let weather = await weatherUpdate();
  updateDisplay(weather);
});
