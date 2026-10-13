// src/components/Forecast.jsx
import React from 'react';
import { CalendarDays } from 'lucide-react';

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Filter the forecast list to pick roughly one forecast per day (around midday, e.g., index 12:00 PM)
  const dailyForecasts = data.list.filter((reading) => 
    reading.dt_txt.includes("12:00:00")
  );

  // Helper to format date string to readable day (e.g., "Mon", "Tue")
  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold text-lg">
        <CalendarDays className="w-5 h-5" />
        <h2>5-Day Weather Forecast</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((item, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          
          return (
            <div 
              key={index} 
              className="bg-slate-800/70 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 text-white text-center shadow-lg transition transform hover:-translate-y-1 hover:border-emerald-500/50"
            >
              <p className="text-xs font-medium text-slate-400 mb-1">
                {formatDay(item.dt_txt)}
              </p>
              
              <img src={iconUrl} alt={item.weather[0].description} className="w-16 h-16 mx-auto -my-2" />
              
              <p className="text-xl font-bold mt-2">
                {Math.round(item.main.temp)}°C
              </p>
              
              <p className="text-xs text-slate-300 capitalize mt-1">
                {item.weather[0].description}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-700/60 flex justify-around text-xs text-slate-400">
                <span>💧 {item.main.humidity}%</span>
                <span>Wind: {item.wind.speed} m/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;