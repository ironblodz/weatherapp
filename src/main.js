import "./style.css";

const apiKey = "216c92ad7e403bf1587740141aa0d30f";
const cityInput = document.getElementById("city-input");

if (cityInput) {
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const city = cityInput.value;
      if (city) {
        getWeatherData(city);
      }
    }
  });
}

function updateClock() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  document.getElementById("hours").innerText = `🕒 ${currentTime}`;
}
setInterval(updateClock, 1000);
updateClock();

async function getWeatherData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      "pt-PT",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString(
      "pt-PT",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

    document.getElementById("hours").innerText = ``;
    document.getElementById("city-name").innerText = data.name;
    document.getElementById("sunrise").innerText = `Sunrise - 🌅 ${sunriseTime}`;
    document.getElementById("sunset").innerText = `Sunset - 🌇 ${sunsetTime}`;
    document.getElementById("temperature").innerText = `${data.main.temp}ºC`;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("visibility").innerText = `${data.visibility / 1000
      } km`;
    document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
    document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    alert("Cidade não encontrada!");
  }
}
