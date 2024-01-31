export default async function fetchData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=182b94288f0b42d2b71175451243001&q=${location}&days=7&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
