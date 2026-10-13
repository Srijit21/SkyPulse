export const getWeatherBackground = (condition) => {
  switch (condition?.toLowerCase()) {
    case 'clear':
      // Sunny & Clear sky video stream
      return "https://res.cloudinary.com/yaydbtee/video/upload/v1791823496/ClearSunny_1.mp4"; // Using sample stream or replace with clean sunny MP4
    case 'rain':
    case 'drizzle':
      // Rainy weather video stream
      return "https://res.cloudinary.com/yaydbtee/video/upload/v1791824141/Rainfall.mp4";
    case 'snow':
      // Snowfall video stream (Perfect for Kashmir!)
      return "https://res.cloudinary.com/yaydbtee/video/upload/v1791824319/Snowfall.mp4";
    case 'thunderstorm':
      // Storm video stream
      return "https://res.cloudinary.com/yaydbtee/video/upload/v1791824414/Thunderstrom.mp4";
    case 'clouds':
    default:
      // Cloudy / Ambient atmosphere video stream
      return "https://res.cloudinary.com/yaydbtee/video/upload/v1791824502/Cloudy.mp4";
  }
};