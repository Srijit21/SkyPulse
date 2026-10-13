import React from 'react';
import { CloudSun, Search, Navigation } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm, handleSearch, handleQuickCitySelect, handleGeoLocation }) => {
  const popularCities = ["New Delhi", "Mumbai", "Bengaluru", "Kolkata", "Bhubaneswar", "Chennai"];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left Section: Logo & Prominent "My Location" Button */}
        <div className="flex flex-wrap items-center justify-between lg:justify-start gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 cursor-pointer">
            <CloudSun className="w-8 h-8 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                SkyPulse India
              </span>
              <span className="block text-xs text-slate-400">Live Weather & Air Quality</span>
            </div>
          </div>

          {/* Larger "My Location" GPS Button placed cleanly on the left */}
          <button
            onClick={handleGeoLocation}
            className="text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950/50 border border-emerald-500/40 shrink-0"
            title="Use your precise device location"
          >
            <Navigation className="w-4 h-4 animate-pulse text-emerald-200" /> 
            <span>My Location</span>
          </button>
        </div>

        {/* Center Section: City Pills (Wrapped cleanly without scrollbars) */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 max-w-xl">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => handleQuickCitySelect(city)}
              className="text-xs bg-slate-800/80 hover:bg-emerald-600/30 hover:border-emerald-400 border border-slate-700/80 text-slate-300 px-3 py-1.5 rounded-lg transition shrink-0"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Right Section: Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="flex items-center bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 w-full lg:w-64 focus-within:border-emerald-400 transition"
        >
          <input 
            type="text" 
            placeholder="Search city..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-400 w-full px-1"
          />
          <button type="submit" className="text-slate-400 hover:text-emerald-400 transition">
            <Search className="w-4 h-4" />
          </button>
        </form>

      </div>
    </header>
  );
};

export default Navbar;