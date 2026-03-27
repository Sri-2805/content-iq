import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Search, Copy, Trash2, Lightbulb, MessageSquare, Hash, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLikeButton } from "@/hooks/use-micro-interactions";
import EmptyState from "@/components/dashboard/EmptyState";

const savedItems = [
  { id: 1, type: "idea", content: "5 Mistakes Beginners Make", platform: "Instagram", date: "2 days ago" },
  { id: 2, type: "caption", content: "🚀 The secret to growing online? Consistency beats perfection every single time...", platform: "Instagram", date: "3 days ago" },
  { id: 3, type: "hashtag", content: "#contentcreator #socialmedia #marketing #entrepreneur #growth #digitalmarketing", platform: "TikTok", date: "5 days ago" },
  { id: 4, type: "idea", content: "Day in My Life as a Creator", platform: "TikTok", date: "1 week ago" },
  { id: 5, type: "caption", content: "Here's what nobody tells you about content creation: It's not about going viral...", platform: "LinkedIn", date: "1 week ago" },
  { id: 6, type: "idea", content: "Before vs After Transformation", platform: "YouTube", date: "2 weeks ago" },
];

const typeIcons = { idea: Lightbulb, caption: MessageSquare, hashtag: Hash };
const typeColors = { idea: "text-primary", caption: "text-accent", hashtag: "text-success" };

const SavedContent = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();
  const { LikeBtn } = useLikeButton();

  const filtered = savedItems.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (search && !item.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary" /> Saved Content
        </h1>
        <p className="text-muted-foreground text-sm">All your saved ideas, captions, and hashtags in one place.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved content..." className="pl-10 bg-muted/50 border-border" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 bg-muted/50 border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="idea">Ideas</SelectItem>
            <SelectItem value="caption">Captions</SelectItem>
            <SelectItem value="hashtag">Hashtags</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((item, i) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons];
            const color = typeColors[item.type as keyof typeof typeColors];
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-5 hover:border-primary/20 hover:scale-[1.02] transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-xs font-medium capitalize text-muted-foreground">{item.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm mb-3 line-clamp-2">{item.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.platform}</span>
                  <div className="flex items-center gap-1">
                    <LikeBtn id={`saved-${item.id}`} />
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 transition-all duration-200" onClick={() => handleCopy(item.id, item.content)}>
                      {copiedId === item.id ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => toast({ title: "Deleted" })}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : search || typeFilter !== "all" ? (
        <EmptyState
          icon={Search}
          emoji="🔍"
          title="No results found"
          description={`No saved content matches "${search || typeFilter}". Try adjusting your search or filters.`}
          actionLabel="Clear Filters"
          onAction={() => { setSearch(""); setTypeFilter("all"); }}
        />
      ) : (
        <EmptyState
          icon={Bookmark}
          emoji="📌"
          title="Nothing saved yet"
          description="Start generating content and save your favorites here for easy access later."
          actionLabel="Generate Content Ideas"
          actionPath="/dashboard/ideas"
        />
      )}
    </div>
  );
};

export default SavedContent;
