import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb, MessageSquare, Calendar, Zap, BookmarkCheck, PenTool, Flame,
  CheckCircle2, Circle, Quote, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TrialBanner from "@/components/dashboard/TrialBanner";
import UpgradeModal from "@/components/dashboard/UpgradeModal";

const motivationalQuotes = [
  { text: "Consistency is the key to success. Show up every day.", author: "Unknown" },
  { text: "Content is king, but distribution is queen.", author: "Jonathan Perelman" },
  { text: "Your audience doesn't care about your strategy. They care about value.", author: "Gary Vaynerchuk" },
  { text: "The best time to post was yesterday. The second best is now.", author: "Unknown" },
  { text: "Create content that teaches. You can't give up on that.", author: "Neil Patel" },
  { text: "Marketing is telling the world you're a rock star. Content marketing is showing it.", author: "Robert Rose" },
  { text: "Don't find customers for your products, find products for your customers.", author: "Seth Godin" },
];

const getDailyQuote = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};

const stats = [
  { label: "Posts Planned", value: "12", icon: Calendar },
  { label: "Ideas Saved", value: "34", icon: BookmarkCheck },
  { label: "Captions Generated", value: "8", icon: PenTool },
  { label: "Days Streak", value: "5", icon: Flame },
];

const quickActions = [
  { label: "Generate Ideas", icon: Lightbulb, path: "/dashboard/ideas", color: "text-primary" },
  { label: "Create Caption", icon: MessageSquare, path: "/dashboard/captions", color: "text-accent" },
  { label: "View Calendar", icon: Calendar, path: "/dashboard/calendar", color: "text-success" },
];

const getNext7Days = () => {
  const days = [];
  const today = new Date();
  const sampleContent = [
    { title: "5 Tips Carousel", platform: "Instagram" },
    null,
    { title: "Behind the Scenes", platform: "TikTok" },
    null,
    { title: "Tutorial Video", platform: "YouTube" },
    { title: "Industry Take", platform: "LinkedIn" },
    null,
  ];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      date: d,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      isToday: i === 0,
      content: sampleContent[i],
    });
  }
  return days;
};

const recentActivity = [
  { text: "Generated 10 content ideas for Instagram", time: "2 hours ago" },
  { text: "Created a caption for TikTok", time: "5 hours ago" },
  { text: "Saved 5 hashtag sets", time: "1 day ago" },
  { text: "Planned 3 posts for next week", time: "2 days ago" },
];

const platformColors: Record<string, string> = {
  Instagram: "bg-accent/20 text-accent",
  TikTok: "bg-primary/20 text-primary",
  YouTube: "bg-destructive/20 text-destructive",
  LinkedIn: "bg-blue-500/20 text-blue-400",
};

const DashboardHome = () => {
  const quote = useMemo(() => getDailyQuote(), []);
  const weekDays = useMemo(() => getNext7Days(), []);
  const [checklist, setChecklist] = useState([
    { id: "profile", label: "Complete your profile", done: true },
    { id: "idea", label: "Generate your first content idea", done: false },
    { id: "calendar", label: "Save content to calendar", done: false },
    { id: "caption", label: "Generate your first caption", done: false },
    { id: "feedback", label: "Share feedback with us", done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  };

  const completedCount = checklist.filter((c) => c.done).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your content overview for today.</p>
      </motion.div>

      {/* Daily Quote */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-5 gradient-bg-subtle border-primary/10">
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm italic leading-relaxed">"{quote.text}"</p>
            <p className="text-xs text-muted-foreground mt-1">— {quote.author}</p>
          </div>
        </div>
      </motion.div>

      {/* Usage bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">AI Generations Used</span>
          <span className="text-sm text-muted-foreground">3 of 10</span>
        </div>
        <Progress value={30} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          <Zap className="w-3 h-3 inline text-primary mr-1" />
          Upgrade to Pro for unlimited generations
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card rounded-xl p-5 hover:scale-[1.03] hover:border-primary/20 transition-all duration-200"
          >
            <stat.icon className="w-5 h-5 text-primary mb-3" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly plan + Onboarding checklist */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Content Plan This Week</h2>
            <Link to="/dashboard/calendar" className="text-xs text-primary hover:underline flex items-center gap-1">
              View full calendar <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className={`glass-card rounded-xl p-3 text-center min-h-[120px] flex flex-col hover:scale-[1.03] transition-all duration-200 ${
                  day.isToday ? "border-primary/40 glow-purple" : ""
                }`}
              >
                <span className="text-[10px] text-muted-foreground">{day.dayName}</span>
                <span className={`text-sm font-bold mb-2 ${day.isToday ? "text-primary" : ""}`}>{day.dayNum}</span>
                {day.content ? (
                  <div className={`mt-auto text-[9px] px-1.5 py-1 rounded-md font-medium ${platformColors[day.content.platform] || "bg-muted"}`}>
                    {day.content.title}
                  </div>
                ) : (
                  <div className="mt-auto text-[10px] text-muted-foreground/50">—</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Onboarding checklist */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
          <div className="glass-card rounded-xl p-5 space-y-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{completedCount} of {checklist.length} complete</span>
              <span className="text-xs font-medium text-primary">{Math.round((completedCount / checklist.length) * 100)}%</span>
            </div>
            <Progress value={(completedCount / checklist.length) * 100} className="h-1.5 mb-4" />
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center gap-3 w-full py-2 px-1 rounded-md hover:bg-muted/30 transition-colors text-left"
              >
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : ""}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <div className="glass-card rounded-xl p-5 hover:border-primary/30 hover:scale-[1.03] transition-all duration-200 cursor-pointer group">
                <action.icon className={`w-6 h-6 ${action.color} mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="glass-card rounded-xl divide-y divide-border/50">
          {recentActivity.map((a, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
              <span className="text-sm">{a.text}</span>
              <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
