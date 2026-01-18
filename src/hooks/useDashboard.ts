import { useState, useEffect, useCallback } from "react";
import { DashboardData, DEFAULT_SETTINGS, UserSettings } from "@/types/dashboard";
import {
  fetchLocation,
  fetchWeather,
  fetchGeneralNews,
  fetchEducationNews,
  fetchTechNews,
  fetchLocationNews,
} from "@/lib/api";
import { loadSettings, saveSettings } from "@/lib/storage";

const initialState: DashboardData = {
  location: null,
  weather: null,
  news: {
    general: [],
    education: [],
    technology: [],
    local: [],
  },
  settings: DEFAULT_SETTINGS,
  loading: {
    location: true,
    weather: true,
    news: true,
  },
  error: {
    location: null,
    weather: null,
    news: null,
  },
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData>(() => ({
    ...initialState,
    settings: loadSettings(),
  }));

  const updateSettings = useCallback((newSettings: UserSettings) => {
    setData((prev) => ({ ...prev, settings: newSettings }));
    saveSettings(newSettings);
  }, []);

  const loadLocation = useCallback(async () => {
    try {
      const location = await fetchLocation();
      setData((prev) => ({
        ...prev,
        location,
        loading: { ...prev.loading, location: false },
      }));
      return location;
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: { ...prev.loading, location: false },
        error: { ...prev.error, location: "Failed to detect location" },
      }));
      return null;
    }
  }, []);

  const loadWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const weather = await fetchWeather(lat, lon);
      setData((prev) => ({
        ...prev,
        weather,
        loading: { ...prev.loading, weather: false },
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: { ...prev.loading, weather: false },
        error: { ...prev.error, weather: "Failed to fetch weather" },
      }));
    }
  }, []);

  const loadNews = useCallback(async (city?: string, country?: string, interests?: string[]) => {
    try {
      const techTopics = interests || data.settings.techInterests;
      
      const [general, education, technology, local] = await Promise.all([
        fetchGeneralNews(),
        fetchEducationNews(),
        fetchTechNews(techTopics),
        city && country ? fetchLocationNews(city, country) : Promise.resolve([]),
      ]);

      setData((prev) => ({
        ...prev,
        news: { general, education, technology, local },
        loading: { ...prev.loading, news: false },
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: { ...prev.loading, news: false },
        error: { ...prev.error, news: "Failed to fetch news" },
      }));
    }
  }, [data.settings.techInterests]);

  const refresh = useCallback(async () => {
    setData((prev) => ({
      ...prev,
      loading: { location: true, weather: true, news: true },
      error: { location: null, weather: null, news: null },
    }));
    
    const location = await loadLocation();
    if (location) {
      loadWeather(location.lat, location.lon);
      loadNews(location.city, location.country);
    } else {
      loadNews();
    }
  }, [loadLocation, loadWeather, loadNews]);

  const refreshWithSettings = useCallback(async (newSettings: UserSettings) => {
    updateSettings(newSettings);
    setData((prev) => ({
      ...prev,
      loading: { ...prev.loading, news: true },
    }));
    
    await loadNews(
      data.location?.city,
      data.location?.country,
      newSettings.techInterests
    );
  }, [updateSettings, loadNews, data.location]);

  useEffect(() => {
    const init = async () => {
      const location = await loadLocation();
      if (location) {
        loadWeather(location.lat, location.lon);
        loadNews(location.city, location.country);
      } else {
        loadNews();
      }
    };
    init();
  }, []);

  return { data, refresh, updateSettings: refreshWithSettings };
}
