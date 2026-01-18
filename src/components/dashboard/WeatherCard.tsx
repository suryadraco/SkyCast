import { Weather, Location } from "@/types/dashboard";
import { Cloud, Sun, CloudRain, Snowflake, Wind, CloudLightning, MapPin, Droplets } from "lucide-react";

interface WeatherCardProps {
  weather: Weather | null;
  location: Location | null;
  loading: boolean;
  error: string | null;
}

function getWeatherIcon(code: number) {
  const baseClasses = "h-20 w-20 drop-shadow-lg";
  
  if (code === 0 || code === 1) return <Sun className={`${baseClasses} text-yellow-300 animate-weather-sun`} />;
  if (code >= 2 && code <= 3) return <Cloud className={`${baseClasses} text-white/90 animate-weather-cloud`} />;
  if (code >= 51 && code <= 67) return <CloudRain className={`${baseClasses} text-blue-200 animate-weather-rain`} />;
  if (code >= 71 && code <= 86) return <Snowflake className={`${baseClasses} text-blue-100 animate-weather-snow`} />;
  if (code >= 95) return <CloudLightning className={`${baseClasses} text-yellow-200 animate-weather-lightning`} />;
  return <Cloud className={`${baseClasses} text-white/90 animate-weather-cloud`} />;
}

function getWeatherEmoji(code: number) {
  if (code === 0) return "☀️";
  if (code === 1) return "🌤️";
  if (code >= 2 && code <= 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 86) return "❄️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

function WeatherSkeleton() {
  return (
    <div className="weather-gradient rounded-3xl p-8 text-primary-foreground min-h-[220px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative flex items-start justify-between h-full">
        <div className="space-y-4">
          <div className="h-5 w-36 bg-white/20 rounded-full animate-pulse" />
          <div className="h-20 w-32 bg-white/20 rounded-2xl animate-pulse" />
          <div className="h-5 w-44 bg-white/20 rounded-full animate-pulse" />
        </div>
        <div className="h-20 w-20 bg-white/20 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function WeatherCard({ weather, location, loading, error }: WeatherCardProps) {
  if (loading) return <WeatherSkeleton />;

  if (error || !weather || !location) {
    return (
      <div className="weather-gradient rounded-3xl p-8 text-primary-foreground min-h-[220px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="text-center relative">
          <Cloud className="h-12 w-12 mx-auto mb-3 opacity-50 animate-weather-cloud" />
          <p className="text-sm opacity-75">Unable to load weather data</p>
          <p className="text-xs opacity-50 mt-1">Check your connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-gradient rounded-3xl p-8 text-primary-foreground animate-fade-in shadow-elevated min-h-[220px] relative overflow-hidden group">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full blur-xl animate-float" />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm opacity-90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 transition-all duration-300 group-hover:bg-white/20">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">{location.city}, {location.country}</span>
          </div>
          
          <div className="flex items-baseline gap-2 py-2">
            <span className="text-7xl font-display font-bold tracking-tight drop-shadow-lg animate-temp-pulse">
              {weather.temperature}
            </span>
            <span className="text-3xl font-light opacity-80">°C</span>
          </div>
          
          <p className="text-xl font-medium flex items-center gap-2">
            <span className="animate-bounce-slow">{getWeatherEmoji(weather.weatherCode)}</span>
            <span className="drop-shadow-sm">{weather.condition}</span>
          </p>
          
          <div className="flex items-center gap-4 text-sm opacity-80 mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg transition-all duration-300 hover:bg-white/20">
              <Wind className="h-4 w-4 animate-wind" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg transition-all duration-300 hover:bg-white/20">
              <Droplets className="h-4 w-4 animate-droplet" />
              <span>Humidity</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          {getWeatherIcon(weather.weatherCode)}
          {/* Glow effect behind icon */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150 -z-10 animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
}
