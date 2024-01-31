import getWeather from "./dataParser";
import updateDisplay from "./dom";

const form = document.querySelector("form");

window.onload = () => {
  getWeather().then((response) => {
    updateDisplay(response);
  });
  form.addEventListener("submit", (e) => {
    handleSubmit(e);
  });
};

function handleSubmit(event) {
  event.preventDefault();
  getWeather().then((response) => {
    updateDisplay(response);
  });
}
