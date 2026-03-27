import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const AnalyticsOverview = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Analytics Overview
        </h1>
        <p className="text-muted-foreground text-sm">Track your content performance and usage.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total Generations", value: "47", change: "+12 this week" },
          { label: "Content Saved", value: "34", change: "+8 this week" },
          { label: "Calendar Events", value: "18", change: "+5 this week" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5">
            <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-success mt-1">{stat.change}</div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Generation History (Last 7 Days)</h3>
        <div className="flex items-end gap-2 h-40">
          {[3, 7, 5, 9, 4, 8, 6].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full gradient-bg rounded-t-md transition-all" style={{ height: `${val * 10}%` }} />
              <span className="text-[10px] text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Content by Platform</h3>
        <div className="space-y-3">
          {[
            { platform: "Instagram", count: 18, pct: 38 },
            { platform: "TikTok", count: 12, pct: 26 },
            { platform: "LinkedIn", count: 9, pct: 19 },
            { platform: "YouTube", count: 5, pct: 11 },
            { platform: "Twitter/X", count: 3, pct: 6 },
          ].map((p) => (
            <div key={p.platform} className="flex items-center gap-3">
              <span className="text-sm w-20 shrink-0">{p.platform}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-bg rounded-full transition-all" style={{ width: `${p.pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{p.count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsOverview;
