const API_KEY = "68c6f811f923707bab9d41a5ed028973"; // Keep your OpenWeatherMap API key here
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetch weather by city name OR by geographic coordinates (lat, lon)
 */
export const getWeatherData = async (query) => {
  try {
    let currentUrl;

    // Check if query is an object with lat/lon or a string (city name)
    if (typeof query === 'object' && query !== null && query.lat && query.lon) {
      currentUrl = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${API_KEY}`;
    } else {
      currentUrl = `${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`;
    }

    const currentResponse = await fetch(currentUrl);
    if (!currentResponse.ok) {
      throw new Error("Location not found or invalid API key.");
    }
    const currentWeather = await currentResponse.json();

    // Extract coordinates to fetch forecast and air quality
    const { lat, lon } = currentWeather.coord;
    
    const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data.");
    }
    const forecastData = await forecastResponse.json();

    // Fetch Air Quality Index (AQI) data
    let aqiData = null;
    try {
      const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      if (aqiResponse.ok) {
        const aqiJson = await aqiResponse.json();
        aqiData = aqiJson.list[0];
      }
    } catch (e) {
      console.warn("AQI fetch skipped", e);
    }

    return {
      current: currentWeather,
      forecast: forecastData,
      aqi: aqiData,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};