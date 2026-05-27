async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("Enter city name");
    return;
  }

  const apiKey  = "cf11b79aeb39f698e3499c3266685b14";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      document.getElementById("weatherResult").innerHTML = `
        <p><strong>${data.name}, ${data.sys.country}</strong></p>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>🌤 Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
      `;

      changeBackground(data.weather[0].main);

    } else {
      document.getElementById("weatherResult").innerHTML =
        `<p style="color:red;">${data.message}</p>`;
    }

  } catch {
    document.getElementById("weatherResult").innerHTML =
      `<p style="color:red;">Network error</p>`;
  }
}

/* CLEAR BUTTON */
function clearWeather() {
  document.getElementById("cityInput").value = "";
  document.getElementById("weatherResult").innerHTML = "";
}

/* BACKGROUND CHANGER */
function changeBackground(weather) {
  let bg = "";

  if (weather === "Clear") {
    bg = "https://images.unsplash.com/photo-1502082553048-f009c37129b9";
  } 
  else if (weather === "Clouds") {
    bg = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31";
  } 
  else if (weather === "Rain") {
    bg = "https://images.unsplash.com/photo-1503428593586-e225b39bddfe";
  } 
  else if (weather === "Snow") {
    bg = "https://images.unsplash.com/photo-1608889175123-8ee362201f81";
  } 
  else {
    bg = "https://images.unsplash.com/photo-1499346030926-9a72daac6c63";
  }

  document.body.style.background = `url(${bg}) no-repeat center center/cover`;
}