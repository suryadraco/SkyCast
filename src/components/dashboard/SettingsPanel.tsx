import { useState } from "react";
import { UserSettings } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, X, Plus, User } from "lucide-react";

interface SettingsPanelProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_TOPICS = [
  "React", "JavaScript", "Python", "Java", "TypeScript", "Rust",
  "AI", "Machine Learning", "Web Development", "Mobile", "Cloud",
  "DevOps", "Blockchain", "Cybersecurity", "Data Science", "Go"
];

export function SettingsPanel({ settings, onSave, isOpen, onClose }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [newTopic, setNewTopic] = useState("");

  const addTopic = (topic: string) => {
    const trimmed = topic.trim();
    if (trimmed && !localSettings.techInterests.includes(trimmed)) {
      setLocalSettings((prev) => ({
        ...prev,
        techInterests: [...prev.techInterests, trimmed],
      }));
      setNewTopic("");
    }
  };

  const removeTopic = (topic: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      techInterests: prev.techInterests.filter((t) => t !== topic),
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Personalize Your Feed</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <User className="h-4 w-4" />
            Your Name
          </label>
          <Input
            value={localSettings.name}
            onChange={(e) => setLocalSettings((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your name"
            className="bg-muted/50"
          />
        </div>

        {/* Tech Interests */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Tech Interests</label>
          <p className="text-xs text-muted-foreground mb-3">
            Add topics to get personalized tech news
          </p>
          
          {/* Current topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {localSettings.techInterests.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {topic}
                <button
                  onClick={() => removeTopic(topic)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add new topic */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTopic(newTopic)}
              placeholder="Add a topic..."
              className="bg-muted/50"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => addTopic(newTopic)}
              disabled={!newTopic.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggested topics */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TOPICS.filter(
                (t) => !localSettings.techInterests.includes(t)
              ).slice(0, 8).map((topic) => (
                <button
                  key={topic}
                  onClick={() => addTopic(topic)}
                  className="px-2.5 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium transition-colors"
                >
                  + {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          Save & Refresh News
        </Button>
      </div>
    </div>
  );
}
