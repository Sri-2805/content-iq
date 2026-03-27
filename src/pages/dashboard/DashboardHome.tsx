import { motion } from "framer-motion";
import { Lightbulb, MessageSquare, Calendar, Zap, BookmarkCheck, PenTool, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

const recentActivity = [
  { text: "Generated 10 content ideas for Instagram", time: "2 hours ago" },
  { text: "Created a caption for TikTok", time: "5 hours ago" },
  { text: "Saved 5 hashtag sets", time: "1 day ago" },
  { text: "Planned 3 posts for next week", time: "2 days ago" },
];

const DashboardHome = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your content overview for today.</p>
      </motion.div>

      {/* Usage bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-5">
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
            className="glass-card rounded-xl p-5"
          >
            <stat.icon className="w-5 h-5 text-primary mb-3" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <div className="glass-card rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer group">
                <action.icon className={`w-6 h-6 ${action.color} mb-3`} />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="glass-card rounded-xl divide-y divide-border/50">
          {recentActivity.map((a, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
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
