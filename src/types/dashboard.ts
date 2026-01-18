export interface Location {
  city: string;
  country: string;
  lat: number;
  lon: number;
  region?: string;
}

export interface Weather {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  time: string;
}

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate?: string;
}

export interface NewsData {
  general: NewsItem[];
  education: NewsItem[];
  technology: NewsItem[];
  local: NewsItem[];
}

export interface UserSettings {
  techInterests: string[];
  name: string;
  theme: "light" | "dark" | "system";
}

export interface DashboardData {
  location: Location | null;
  weather: Weather | null;
  news: NewsData;
  settings: UserSettings;
  loading: {
    location: boolean;
    weather: boolean;
    news: boolean;
  };
  error: {
    location: string | null;
    weather: string | null;
    news: string | null;
  };
}

export const DEFAULT_SETTINGS: UserSettings = {
  techInterests: ["React", "JavaScript", "Python"],
  name: "",
  theme: "light",
};
