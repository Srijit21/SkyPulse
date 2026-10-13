// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Forecast from './components/Forecast';
import { getWeatherData } from './services/WeatherApi';
import { getWeatherBackground } from './services/WeatherBackground';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('New Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData(query);
        setWeatherData(data);
        const locationName = data.current.name;
        toast.success(`Weather updated for ${locationName}!`);
      } catch (error) {
        toast.error("Could not fetch weather data. Please check location.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.warn("Please enter a city name!");
      return;
    }
    setQuery(searchTerm.trim());
    setSearchTerm('');
  };

  const handleQuickCitySelect = (selectedCity) => {
    setQuery(selectedCity);
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    toast.info("Detecting your exact location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      },
      (error) => {
        toast.error("Unable to retrieve your location. Please check permissions.");
      }
    );
  };

  // 1. Calculate videoUrl FIRST before using it in the JSX or refs
  const currentCondition = weatherData?.current?.weather[0]?.main;
  const videoUrl = getWeatherBackground(currentCondition);

  // 2. Force video playback when videoUrl changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, [videoUrl]);

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white overflow-x-hidden bg-slate-950">
      
      {/* Cinematic Background Video Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-60 scale-105 transition-opacity duration-1000"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Lighter overlay so your Cloudinary video is fully visible */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
          handleQuickCitySelect={handleQuickCitySelect}
          handleGeoLocation={handleGeoLocation}
        />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
              <p className="text-slate-400 text-sm">Fetching real-time meteorological data...</p>
            </div>
          )}

          {!loading && weatherData && (
            <>
              <CurrentWeather data={weatherData.current} aqi={weatherData.aqi} />
              <HourlyForecast data={weatherData.forecast} />
              <Forecast data={weatherData.forecast} />
            </>
          )}
        </main>

        <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 bg-slate-950/60 backdrop-blur-md">
          © 2026 SkyPulse India • Built with React, Tailwind CSS, & OpenWeatherMap API.
        </footer>
      </div>

    </div>
  );
}

export default App;