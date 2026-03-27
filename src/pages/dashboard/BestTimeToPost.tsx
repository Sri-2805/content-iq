import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Simulated engagement data (0-100)
const generateHeatmap = () => {
  const data: number[][] = [];
  for (let d = 0; d < 7; d++) {
    const row: number[] = [];
    for (let h = 0; h < 24; h++) {
      // Higher engagement around 9-11am, 12-2pm, 7-9pm
      let base = 10;
      if (h >= 9 && h <= 11) base = 60 + Math.random() * 30;
      else if (h >= 12 && h <= 14) base = 50 + Math.random() * 25;
      else if (h >= 19 && h <= 21) base = 70 + Math.random() * 30;
      else if (h >= 7 && h <= 22) base = 20 + Math.random() * 20;
      // Weekends slightly different
      if (d >= 5) base = base * 0.8 + Math.random() * 10;
      row.push(Math.min(100, Math.round(base)));
    }
    data.push(row);
  }
  return data;
};

const heatmapData = generateHeatmap();

const getColor = (value: number) => {
  if (value >= 80) return "bg-primary";
  if (value >= 60) return "bg-primary/70";
  if (value >= 40) return "bg-primary/40";
  if (value >= 20) return "bg-primary/20";
  return "bg-muted";
};

const BestTimeToPost = () => {
  const [platform, setPlatform] = useState("Instagram");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" /> Best Time to Post
        </h1>
        <p className="text-muted-foreground text-sm">Find the optimal posting times for maximum engagement.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Label className="text-sm">Platform</Label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="mt-1 bg-muted/50 border-border w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X"].map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 mb-2">
            <div />
            {hours.map((h) => (
              <div key={h} className="text-[9px] text-muted-foreground text-center">{h.split(":")[0]}</div>
            ))}
          </div>
          {days.map((day, di) => (
            <div key={day} className="grid grid-cols-[60px_repeat(24,1fr)] gap-1 mb-1">
              <div className="text-xs text-muted-foreground flex items-center">{day}</div>
              {heatmapData[di].map((val, hi) => (
                <div
                  key={hi}
                  className={`h-6 rounded-sm ${getColor(val)} transition-colors hover:ring-1 hover:ring-primary/50 cursor-pointer`}
                  title={`${day} ${hours[hi]}: ${val}% engagement`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded-sm bg-muted" />
            <div className="w-4 h-4 rounded-sm bg-primary/20" />
            <div className="w-4 h-4 rounded-sm bg-primary/40" />
            <div className="w-4 h-4 rounded-sm bg-primary/70" />
            <div className="w-4 h-4 rounded-sm bg-primary" />
          </div>
          <span>High</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-2">💡 Personalized Tip</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Based on your niche, the best times to post on {platform} are <strong className="text-foreground">9:00 AM</strong>, <strong className="text-foreground">12:30 PM</strong>, and <strong className="text-foreground">7:00 PM</strong> on weekdays. Your audience tends to be most active during morning commutes and evening wind-down.
        </p>
      </motion.div>
    </div>
  );
};

export default BestTimeToPost;
