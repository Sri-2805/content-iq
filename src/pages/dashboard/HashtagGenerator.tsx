import { useState } from "react";
import { motion } from "framer-motion";
import { Hash, Copy, Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const platformOptions = ["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X"];
const sizeOptions = ["Mixed (recommended)", "Mega (1M+)", "Large (100K+)", "Medium (10K+)", "Small niche (1K+)"];

const mockHashtags = {
  mega: ["#contentcreator", "#socialmedia", "#marketing", "#entrepreneur", "#motivation", "#business", "#success", "#digitalmarketing", "#growth", "#inspiration"],
  large: ["#contentmarketing", "#socialmediatips", "#marketingstrategy", "#creatoreconomy", "#contentstrategy", "#growthmindset", "#personalbranding", "#onlinebusiness", "#brandbuilding", "#digitalcreator"],
  small: ["#contentcreatorlife", "#socialmediacreator", "#nichecontent", "#microinfluencer", "#contenttips2024", "#creatortools", "#socialstrategy", "#contentplanning", "#engagementtips", "#postconsistently"],
};

const HashtagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("");
  const [size, setSize] = useState("");
  const [hashtags, setHashtags] = useState<typeof mockHashtags | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic || !platform) {
      toast({ title: "Please fill in topic and platform", variant: "destructive" });
      return;
    }
    setLoading(true);
    setHashtags(null);
    setTimeout(() => {
      setHashtags(mockHashtags);
      setLoading(false);
      toast({ title: "30 hashtags generated! #️⃣" });
    }, 1500);
  };

  const copyAll = () => {
    if (!hashtags) return;
    const all = [...hashtags.mega, ...hashtags.large, ...hashtags.small].join(" ");
    navigator.clipboard.writeText(all);
    toast({ title: "All hashtags copied!" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Hash className="w-6 h-6 text-success" /> Hashtag Generator
        </h1>
        <p className="text-muted-foreground text-sm">Get optimized hashtags grouped by reach for maximum visibility.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <Label className="text-sm">Topic / Niche / Post description</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Social media marketing tips" className="mt-1 bg-muted/50 border-border" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select platform" /></SelectTrigger>
              <SelectContent>{platformOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Hashtag Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select size" /></SelectTrigger>
              <SelectContent>{sizeOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={loading} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : "Generate Hashtags"}
        </Button>
      </motion.div>

      {loading && (
        <div className="glass-card rounded-xl p-6 animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-8 bg-muted rounded-full w-28" />)}
          </div>
        </div>
      )}

      {hashtags && (
        <div className="space-y-6">
          <div className="flex justify-end gap-2">
            <Button onClick={copyAll} variant="outline" className="border-border text-sm">
              <Copy className="w-4 h-4 mr-2" /> Copy All 30
            </Button>
            <Button variant="outline" className="border-border text-sm" onClick={() => toast({ title: "Hashtag set saved!" })}>
              <Bookmark className="w-4 h-4 mr-2" /> Save Set
            </Button>
          </div>
          {[
            { label: "Mega (1M+ posts)", tags: hashtags.mega, color: "text-accent" },
            { label: "Large (100K+ posts)", tags: hashtags.large, color: "text-primary" },
            { label: "Niche (1K+ posts)", tags: hashtags.small, color: "text-success" },
          ].map((group) => (
            <motion.div key={group.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
              <h3 className={`text-sm font-semibold mb-3 ${group.color}`}>{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border hover:border-primary/30 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !hashtags && (
        <div className="text-center py-16">
          <Hash className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Enter a topic and generate optimized hashtags.</p>
        </div>
      )}
    </div>
  );
};

export default HashtagGenerator;
