import { Location, Weather, NewsItem } from "@/types/dashboard";

// Weather code to condition mapping
const weatherCodeToCondition: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export async function fetchLocation(): Promise<Location> {
  // Try multiple geolocation services
  try {
    // First try ipapi.co (HTTPS)
    // Use API key if available for better rate limits
    const apiKey = import.meta.env.VITE_IPAPI_KEY;
    const url = apiKey 
      ? `https://ipapi.co/json/?key=${apiKey}`
      : "https://ipapi.co/json/";
    
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        city: data.city,
        country: data.country_name,
        lat: data.latitude,
        lon: data.longitude,
        region: data.region,
      };
    }
  } catch (e) {
    console.log("ipapi.co failed, trying fallback...");
  }

  // Fallback to ipwho.is
  try {
    const response = await fetch("https://ipwho.is/");
    if (response.ok) {
      const data = await response.json();
      return {
        city: data.city,
        country: data.country,
        lat: data.latitude,
        lon: data.longitude,
        region: data.region,
      };
    }
  } catch (e) {
    console.log("ipwho.is failed");
  }

  throw new Error("Failed to fetch location");
}

export async function fetchWeather(lat: number, lon: number): Promise<Weather> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  if (!response.ok) throw new Error("Failed to fetch weather");
  
  const data = await response.json();
  const current = data.current_weather;
  
  return {
    temperature: Math.round(current.temperature),
    condition: weatherCodeToCondition[current.weathercode] || "Unknown",
    windSpeed: current.windspeed,
    windDirection: current.winddirection,
    weatherCode: current.weathercode,
    time: current.time,
  };
}

export async function fetchHackerNews(query: string = "technology"): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=6`
    );
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.hits.filter((hit: any) => hit.title && hit.url).map((hit: any) => ({
      title: hit.title,
      link: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: "Hacker News",
      pubDate: hit.created_at,
    }));
  } catch (error) {
    console.error("Error fetching Hacker News:", error);
    return [];
  }
}

export async function fetchTechNewsForTopic(topic: string): Promise<NewsItem[]> {
  return fetchHackerNews(topic);
}

export async function fetchGeneralNews(): Promise<NewsItem[]> {
  // Use Hacker News for world/general news
  return fetchHackerNews("world news");
}

export async function fetchEducationNews(): Promise<NewsItem[]> {
  return fetchHackerNews("education learning");
}

export async function fetchTechNews(topics: string[]): Promise<NewsItem[]> {
  if (topics.length === 0) {
    return fetchHackerNews("programming technology");
  }
  
  // Fetch news for all user topics in parallel
  const allNews = await Promise.all(
    topics.slice(0, 3).map(topic => fetchHackerNews(topic))
  );
  
  // Flatten and deduplicate by title
  const seen = new Set<string>();
  const combined: NewsItem[] = [];
  
  for (const news of allNews) {
    for (const item of news) {
      if (!seen.has(item.title)) {
        seen.add(item.title);
        combined.push(item);
      }
    }
  }
  
  return combined.slice(0, 8);
}

export async function fetchWeatherNews(city: string): Promise<NewsItem[]> {
  return fetchHackerNews(`${city} weather climate`);
}

export async function fetchLocationNews(city: string, country: string): Promise<NewsItem[]> {
  return fetchHackerNews(`${city} ${country}`);
}
