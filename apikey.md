# API Keys Documentation

This document describes all the APIs used in Global Compass and their API key requirements.

## APIs Used

### 1. IPAPI.co - Geolocation Service
**Purpose**: Primary service for detecting user's location (city, country, coordinates)
**Endpoint**: `https://ipapi.co/json/`
**API Key Required**: Optional (Free tier: 1,000 requests/day, With API key: 10,000 requests/day)
**Get API Key**: https://ipapi.co/signup/
**Environment Variable**: `VITE_IPAPI_KEY`

**Usage**: 
- Used in `fetchLocation()` function
- Provides: city, country, latitude, longitude, region
- Falls back to ipwho.is if this service fails

---

### 2. IPWho.is - Geolocation Service (Fallback)
**Purpose**: Fallback service for detecting user's location
**Endpoint**: `https://ipwho.is/`
**API Key Required**: No (Free tier available)
**Environment Variable**: Not needed

**Usage**: 
- Used as fallback when ipapi.co fails
- Provides: city, country, latitude, longitude, region

---

### 3. Open-Meteo - Weather API
**Purpose**: Fetch current weather data based on coordinates
**Endpoint**: `https://api.open-meteo.com/v1/forecast`
**API Key Required**: No (Completely free, no rate limits)
**Environment Variable**: Not needed

**Usage**: 
- Used in `fetchWeather()` function
- Provides: temperature, weather condition, wind speed, wind direction, weather code

---

### 4. Hacker News Algolia API - News Service
**Purpose**: Fetch technology, general, education, and location-based news
**Endpoint**: `https://hn.algolia.com/api/v1/search`
**API Key Required**: No (Free, public API)
**Environment Variable**: Not needed

**Usage**: 
- Used in all news fetching functions:
  - `fetchHackerNews()` - General news search
  - `fetchTechNews()` - Technology news based on user interests
  - `fetchGeneralNews()` - World/general news
  - `fetchEducationNews()` - Education-related news
  - `fetchLocationNews()` - Location-specific news
- Provides: news articles with title, link, source, publication date

---

## Summary

| API Service | API Key Required | Rate Limits | Environment Variable |
|------------|------------------|-------------|---------------------|
| IPAPI.co | Optional | 1,000/day (free) or 10,000/day (with key) | `VITE_IPAPI_KEY` |
| IPWho.is | No | Free tier | N/A |
| Open-Meteo | No | Unlimited | N/A |
| Hacker News Algolia | No | Free, public | N/A |

## Getting API Keys

### IPAPI.co API Key (Optional but Recommended)
1. Visit https://ipapi.co/signup/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `VITE_IPAPI_KEY=your_api_key_here`

**Note**: The application works without API keys, but using an IPAPI.co key provides better rate limits for production use.

