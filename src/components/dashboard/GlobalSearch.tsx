import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Lightbulb, MessageSquare, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const mockSearchResults = [
  { id: 1, type: "idea", content: "5 Mistakes Beginners Make", platform: "Instagram" },
  { id: 2, type: "caption", content: "🚀 The secret to growing online? Consistency...", platform: "Instagram" },
  { id: 3, type: "hashtag", content: "#contentcreator #socialmedia #marketing", platform: "TikTok" },
  { id: 4, type: "idea", content: "Day in My Life as a Creator", platform: "TikTok" },
  { id: 5, type: "caption", content: "Here's what nobody tells you about content creation...", platform: "LinkedIn" },
  { id: 6, type: "idea", content: "Before vs After Transformation", platform: "YouTube" },
];

const typeIcons = { idea: Lightbulb, caption: MessageSquare, hashtag: Hash };
const typeColors = { idea: "text-primary", caption: "text-accent", hashtag: "text-success" };

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.length > 0
    ? mockSearchResults.filter((r) => r.content.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = () => {
    setOpen(false);
    setQuery("");
    navigate("/dashboard/saved");
  };

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:border-primary/30 transition-colors w-64"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="flex-1 text-left text-xs">Search saved content...</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border font-mono">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => { setOpen(false); setQuery(""); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="relative w-full max-w-lg glass-card rounded-xl border border-border overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search saved content..."
                  className="border-0 bg-transparent focus-visible:ring-0 px-0 text-sm"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {results.length > 0 && (
                <div className="max-h-64 overflow-y-auto py-2">
                  {results.map((r) => {
                    const Icon = typeIcons[r.type as keyof typeof typeIcons];
                    const color = typeColors[r.type as keyof typeof typeColors];
                    return (
                      <button
                        key={r.id}
                        onClick={handleSelect}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{r.content}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{r.type} · {r.platform}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No results found for "{query}"
                </div>
              )}

              {!query && (
                <div className="py-6 text-center text-xs text-muted-foreground">
                  Type to search across your saved ideas, captions, and hashtags
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch;
