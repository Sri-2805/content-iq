import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCopyButton, useSaveButton, useLikeButton } from "@/hooks/use-micro-interactions";
import EmptyState from "@/components/dashboard/EmptyState";

const platformOptions = ["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X"];
const contentTypes = ["Educational", "Entertaining", "Promotional", "Inspirational", "Behind the scenes"];
const toneOptions = ["Professional", "Casual", "Funny", "Motivational"];

interface Idea {
  title: string;
  description: string;
  format: string;
}

const mockIdeas: Idea[] = [
  { title: "5 Mistakes Beginners Make", description: "Share common pitfalls in your niche and how to avoid them. Builds trust and positions you as an expert.", format: "Carousel" },
  { title: "Day in My Life as a Creator", description: "Authentic behind-the-scenes content showing your daily workflow and routines.", format: "Reel" },
  { title: "Hot Take on Industry Trend", description: "Share your bold opinion on a trending topic to spark engagement and discussion.", format: "Post" },
  { title: "Tutorial: Quick Win Tip", description: "Teach one actionable tip your audience can implement in under 5 minutes.", format: "Reel" },
  { title: "Before vs After Transformation", description: "Show a transformation story — could be a project, skill growth, or client result.", format: "Carousel" },
  { title: "Q&A: Most Asked Questions", description: "Answer your top 3-5 DM questions in one piece of content.", format: "Story" },
  { title: "Tool/Resource Recommendation", description: "Share your favorite tool with a mini-review and why you love it.", format: "Post" },
  { title: "Myth Busting in Your Niche", description: "Debunk a common misconception with facts and your experience.", format: "Reel" },
  { title: "Weekly Wins & Lessons", description: "Reflect on what went well and what you learned this week. Great for building community.", format: "Carousel" },
  { title: "Collaboration Spotlight", description: "Feature another creator or brand and share why you admire their work.", format: "Post" },
];

const ContentIdeas = () => {
  const [topic, setTopic] = useState("Tech");
  const [platform, setPlatform] = useState("");
  const [contentType, setContentType] = useState("");
  const [tone, setTone] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { CopyBtn } = useCopyButton();
  const { SaveBtn } = useSaveButton();
  const { LikeBtn } = useLikeButton();

  const handleGenerate = () => {
    if (!platform || !contentType || !tone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setIdeas([]);
    setTimeout(() => {
      setIdeas(mockIdeas);
      setLoading(false);
      toast({ title: "10 ideas generated! 🎉" });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" /> AI Content Ideas
        </h1>
        <p className="text-muted-foreground text-sm">Generate content ideas tailored to your niche and audience.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm">Niche / Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 bg-muted/50 border-border" placeholder="e.g. Tech, Fashion..." />
        </div>
        <div>
          <Label className="text-sm">Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select platform" /></SelectTrigger>
            <SelectContent>{platformOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm">Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>{contentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm">Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="mt-1 bg-muted/50 border-border"><SelectValue placeholder="Select tone" /></SelectTrigger>
            <SelectContent>{toneOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-full sm:w-auto px-8 animate-pulse-glow">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : "Generate 10 Ideas"}
          </Button>
        </div>
      </motion.div>

      {loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-5 space-y-3 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {ideas.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{idea.title}</h3>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{idea.format}</span>
                  <LikeBtn id={`idea-${i}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{idea.description}</p>
              <div className="flex gap-2">
                <CopyBtn text={`${idea.title}: ${idea.description}`} id={`idea-copy-${i}`} />
                <SaveBtn id={`idea-save-${i}`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && ideas.length === 0 && (
        <EmptyState
          icon={Lightbulb}
          emoji="💡"
          title="No ideas generated yet"
          description="Fill in the fields above and hit Generate to get 10 tailored content ideas for your niche."
          actionLabel="Fill in & Generate"
          onAction={() => document.querySelector('input')?.focus()}
        />
      )}
    </div>
  );
};

export default ContentIdeas;
