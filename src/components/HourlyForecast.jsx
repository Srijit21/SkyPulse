// src/components/HourlyForecast.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const HourlyForecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Grab the next 8 intervals (which covers the next 24 hours: 8 x 3-hour chunks)
  const next24Hours = data.list.slice(0, 8);

  // Helper to format time string (e.g., "15:00:00" -> "3:00 PM")
  const formatTime = (dtTxt) => {
    const timeString = dtTxt.split(' ')[1];
    const [hours] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour} ${ampm}`;
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold text-lg">
        <Clock className="w-5 h-5" />
        <h2>Hourly Forecast (Next 24 Hours)</h2>
      </div>

      {/* Horizontally scrollable container for hourly slots */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {next24Hours.map((item, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          
          return (
            <div 
              key={index} 
              className="min-w-[110px] bg-slate-800/70 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 text-white text-center shadow-lg transition transform hover:-translate-y-1 hover:border-emerald-500/50 shrink-0"
            >
              <p className="text-xs font-medium text-slate-400 mb-1">
                {index === 0 ? "Now" : formatTime(item.dt_txt)}
              </p>
              
              <img src={iconUrl} alt={item.weather[0].description} className="w-14 h-14 mx-auto -my-1" />
              
              <p className="text-lg font-bold mt-1">
                {Math.round(item.main.temp)}°C
              </p>
              
              <p className="text-[11px] text-slate-300 capitalize mt-1 truncate">
                {item.weather[0].description}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400">
                💧 {item.main.humidity}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;