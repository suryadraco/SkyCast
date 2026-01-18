import { useState, useEffect, useCallback } from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { Header } from "@/components/dashboard/Header";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { NewsSection } from "@/components/dashboard/NewsSection";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { data, refresh, updateSettings } = useDashboard();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const isAnyLoading = data.loading.location || data.loading.weather || data.loading.news;

  // Theme handling
  const applyTheme = useCallback((theme: "light" | "dark" | "system") => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(data.settings.theme);
  }, [data.settings.theme, applyTheme]);

  const handleToggleTheme = () => {
    const newTheme = data.settings.theme === "dark" ? "light" : "dark";
    updateSettings({ ...data.settings, theme: newTheme });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container max-w-6xl py-6 px-4 md:py-10">
        <Header 
          onRefresh={refresh} 
          onOpenSettings={() => setSettingsOpen(true)}
          isLoading={isAnyLoading} 
          userName={data.settings.name}
          theme={data.settings.theme}
          onToggleTheme={handleToggleTheme}
        />
        
        {/* Interests Tags */}
        {data.settings.techInterests.length > 0 && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Your interests:
            </span>
            {data.settings.techInterests.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {topic}
              </span>
            ))}
            {data.settings.techInterests.length > 5 && (
              <span className="text-xs text-muted-foreground">
                +{data.settings.techInterests.length - 5} more
              </span>
            )}
          </div>
        )}
        
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Weather & Local */}
          <div className="lg:col-span-4 space-y-6">
            <WeatherCard
              weather={data.weather}
              location={data.location}
              loading={data.loading.location || data.loading.weather}
              error={data.error.location || data.error.weather}
            />
            
            {data.location && data.news.local.length > 0 && (
              <NewsSection
                title={`${data.location.city} News`}
                category="local"
                items={data.news.local}
                loading={data.loading.news}
              />
            )}
          </div>

          {/* Right Column - News Grid */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <NewsSection
                title="World News"
                category="general"
                items={data.news.general}
                loading={data.loading.news}
              />
              
              <NewsSection
                title="Education"
                category="education"
                items={data.news.education}
                loading={data.loading.news}
              />
              
              <NewsSection
                title="Your Tech Feed"
                category="technology"
                items={data.news.technology}
                loading={data.loading.news}
              />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>Powered by Open-Meteo, ipapi.co & Hacker News</p>
        </footer>
      </div>
      
      <SettingsPanel
        settings={data.settings}
        onSave={updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default Index;
