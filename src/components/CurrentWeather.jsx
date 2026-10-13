import React from 'react';
import { Thermometer, Wind, Droplets, Compass, MapPin, Activity } from 'lucide-react';

const CurrentWeather = ({ data, aqi }) => {
  if (!data) return null;

  const { name, sys, main, wind, weather } = data;
  const weatherIcon = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

  // Helper to interpret OpenWeather AQI index (1 = Good, 5 = Very Poor)
  const getAqiDetails = (aqiVal) => {
    switch (aqiVal) {
      case 1: return { text: "Good", color: "text-emerald-400 bg-emerald-950/50 border-emerald-500/30" };
      case 2: return { text: "Fair", color: "text-yellow-400 bg-yellow-950/50 border-yellow-500/30" };
      case 3: return { text: "Moderate", color: "text-orange-400 bg-orange-950/50 border-orange-500/30" };
      case 4: return { text: "Poor", color: "text-red-400 bg-red-950/50 border-red-500/30" };
      case 5: return { text: "Very Poor", color: "text-purple-400 bg-purple-950/50 border-purple-500/30" };
      default: return { text: "N/A", color: "text-slate-400 bg-slate-800 border-slate-700" };
    }
  };

  const aqiInfo = getAqiDetails(aqi?.main?.aqi);

  return (
    <div className="bg-slate-800/70 border border-slate-700/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-white shadow-xl max-w-4xl mx-auto my-6 transition transform hover:border-emerald-500/50">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* City & Temperature Info */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-medium text-lg mb-1">
            <MapPin className="w-5 h-5" />
            <span>{name}, {sys.country}</span>
            {aqi && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${aqiInfo.color} ml-2 font-semibold flex items-center gap-1`}>
                <Activity className="w-3 h-3" /> AQI: {aqiInfo.text}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-4 my-2">
            <img src={iconUrl} alt={weather[0].description} className="w-24 h-24 -my-4 drop-shadow-lg" />
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                {Math.round(main.temp)}°C
              </h1>
              <p className="text-slate-300 capitalize text-lg font-medium mt-1">
                {weather[0].description}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Feels like {Math.round(main.feels_like)}°C • High: {Math.round(main.temp_max)}°C / Low: {Math.round(main.temp_min)}°C
          </p>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3.5 flex items-center gap-3">
            <Droplets className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Humidity</p>
              <p className="text-base font-semibold">{main.humidity}%</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3.5 flex items-center gap-3">
            <Wind className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Wind Speed</p>
              <p className="text-base font-semibold">{wind.speed} m/s</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3.5 flex items-center gap-3">
            <Thermometer className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Pressure</p>
              <p className="text-base font-semibold">{main.pressure} hPa</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3.5 flex items-center gap-3">
            <Compass className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Wind Deg</p>
              <p className="text-base font-semibold">{wind.deg}°</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CurrentWeather;