import { NewsItem } from "@/types/dashboard";
import { ExternalLink, Newspaper, GraduationCap, Cpu, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface NewsSectionProps {
  title: string;
  category: "general" | "education" | "technology" | "local";
  items: NewsItem[];
  loading: boolean;
  icon?: React.ReactNode;
}

const categoryIcons = {
  general: Newspaper,
  education: GraduationCap,
  technology: Cpu,
  local: MapPin,
};

const categoryColors = {
  general: "border-l-news-general",
  education: "border-l-news-education",
  technology: "border-l-news-tech",
  local: "border-l-accent",
};

const categoryBg = {
  general: "bg-news-general/10",
  education: "bg-news-education/10",
  technology: "bg-news-tech/10",
  local: "bg-accent/10",
};

const categoryGradient = {
  general: "from-news-general/20 to-transparent",
  education: "from-news-education/20 to-transparent",
  technology: "from-news-tech/20 to-transparent",
  local: "from-accent/20 to-transparent",
};

function NewsItemSkeleton() {
  return (
    <div className="p-4 border-l-4 border-muted bg-card rounded-xl animate-pulse">
      <div className="h-4 w-full bg-muted rounded mb-2" />
      <div className="h-4 w-2/3 bg-muted rounded mb-3" />
      <div className="h-3 w-1/4 bg-muted rounded" />
    </div>
  );
}

function formatTime(dateStr?: string) {
  if (!dateStr) return null;
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return null;
  }
}

function NewsItemCard({ item, category, index }: { item: NewsItem; category: "general" | "education" | "technology" | "local"; index: number }) {
  const Icon = categoryIcons[category];
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block p-4 bg-card rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 border-l-4 ${categoryColors[category]} hover:translate-x-1 hover:scale-[1.02]`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span className={`px-1.5 py-0.5 rounded ${categoryBg[category]} font-medium`}>
                  {item.source}
                </span>
                {formatTime(item.pubDate) && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(item.pubDate)}
                  </span>
                )}
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
          </div>
        </a>
      </HoverCardTrigger>
      <HoverCardContent 
        side="right" 
        align="start" 
        className={`w-80 p-0 overflow-hidden border-none shadow-elevated`}
      >
        <div className={`bg-gradient-to-b ${categoryGradient[category]} p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${categoryBg[category]}`}>
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category} News
            </span>
          </div>
          <h4 className="font-semibold text-sm leading-snug mb-3">
            {item.title}
          </h4>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">{item.source}</span>
            {formatTime(item.pubDate) && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(item.pubDate)}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 bg-card border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hover to preview • Click to read full article
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium">
            <ExternalLink className="h-3 w-3" />
            Open in new tab
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function NewsSection({ title, category, items, loading, icon }: NewsSectionProps) {
  const Icon = categoryIcons[category];

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2">
        {icon || <Icon className="h-5 w-5 text-muted-foreground" />}
        <h2 className="font-display font-semibold text-lg">{title}</h2>
        <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
          {items.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {loading ? (
          <>
            <NewsItemSkeleton />
            <NewsItemSkeleton />
            <NewsItemSkeleton />
          </>
        ) : items.length === 0 ? (
          <div className="p-6 bg-muted/30 rounded-xl text-center">
            <Icon className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No news available</p>
          </div>
        ) : (
          items.map((item, index) => (
            <NewsItemCard 
              key={`${item.title}-${index}`} 
              item={item} 
              category={category} 
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}
