import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Copy, Bookmark, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const platformOptions = ["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X"];
const toneOptions = ["Professional", "Casual", "Funny", "Motivational"];

const mockCaptions = [
  "🚀 The secret to growing online? Consistency beats perfection every single time.\n\nStop waiting for the \"perfect\" post. Start sharing value today — your future self will thank you.\n\n💡 What's one thing you're going to post about this week? Drop it below 👇\n\n#ContentCreator #GrowthMindset #SocialMediaTips",
  "Here's what nobody tells you about content creation:\n\nIt's not about going viral. It's about showing up for the people who already follow you.\n\nFocus on depth, not reach. The algorithm rewards real engagement.\n\nWhat's your biggest content challenge right now? Let me know 💬",
  "POV: You finally stopped overthinking your content strategy 🎯\n\nThe result? More posts, more engagement, more growth.\n\nSometimes the best strategy is just to START. Refine as you go. 🔥\n\nSave this for your next content planning session! 📌",
];

const CaptionGenerator = () => {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [includeCTA, setIncludeCTA] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!description || !platform || !tone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setCaptions([]);
    setTimeout(() => {
      setCaptions(mockCaptions);
      setLoading(false);
      toast({ title: "3 captions generated! ✍️" });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent" /> Caption Generator
        </h1>
        <p className="text-muted-foreground text-sm">Create engaging captions for any platform in seconds.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <Label className="text-sm">Describe your post</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. A carousel about 5 productivity tips for content creators" className="mt-1 bg-muted/50 border-border min-h-[100px]" />
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
            <Label className="text-sm">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select tone" /></SelectTrigger>
              <SelectContent>{toneOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={includeCTA} onCheckedChange={setIncludeCTA} />
            <Label className="text-sm">Include CTA</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={includeEmojis} onCheckedChange={setIncludeEmojis} />
            <Label className="text-sm">Include emojis</Label>
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={loading} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : "Generate Caption"}
        </Button>
      </motion.div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-xl p-5 space-y-3 animate-pulse">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {captions.length > 0 && (
        <div className="space-y-4">
          {captions.map((caption, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">Variation {i + 1}</span>
                <span className="text-xs text-muted-foreground">{caption.length} characters</span>
              </div>
              <p className="text-sm whitespace-pre-line leading-relaxed mb-4">{caption}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs border-border" onClick={() => toast({ title: "Copied!" })}>
                  <Copy className="w-3 h-3 mr-1" /> Copy
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-border" onClick={() => toast({ title: "Saved!" })}>
                  <Bookmark className="w-3 h-3 mr-1" /> Save
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-border" onClick={() => toast({ title: "Regenerating..." })}>
                  <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && captions.length === 0 && (
        <div className="text-center py-16">
          <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Describe your post above and generate engaging captions.</p>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;
