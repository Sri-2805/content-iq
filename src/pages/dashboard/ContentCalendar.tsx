import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const platformColors: Record<string, string> = {
  Instagram: "bg-accent/20 text-accent border-accent/30",
  TikTok: "bg-primary/20 text-primary border-primary/30",
  YouTube: "bg-destructive/20 text-destructive border-destructive/30",
  LinkedIn: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const sampleEvents = [
  { day: 3, title: "5 Tips Carousel", platform: "Instagram", type: "Carousel" },
  { day: 5, title: "Behind the Scenes", platform: "TikTok", type: "Reel" },
  { day: 8, title: "Tutorial Video", platform: "YouTube", type: "Video" },
  { day: 12, title: "Industry Hot Take", platform: "LinkedIn", type: "Post" },
  { day: 15, title: "Q&A Stories", platform: "Instagram", type: "Story" },
  { day: 18, title: "Day in My Life", platform: "TikTok", type: "Reel" },
  { day: 22, title: "Product Review", platform: "YouTube", type: "Video" },
  { day: 25, title: "Weekly Recap", platform: "Instagram", type: "Carousel" },
];

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" /> Content Calendar
          </h1>
          <p className="text-muted-foreground text-sm">Plan and visualize your content schedule.</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" className="border-border" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold">{monthName}</h2>
          <Button variant="outline" size="sm" className="border-border" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
          ))}
          {days.map((day, i) => {
            const events = day ? sampleEvents.filter((e) => e.day === day) : [];
            return (
              <div
                key={i}
                className={`min-h-[100px] border border-border/30 rounded-md p-1.5 ${day ? "hover:border-primary/30 transition-colors" : "opacity-0"}`}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{day}</span>
                      <button className="w-4 h-4 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Plus className="w-2.5 h-2.5 text-muted-foreground" />
                      </button>
                    </div>
                    {events.map((event, j) => (
                      <div key={j} className={`text-[10px] px-1.5 py-1 rounded border mb-0.5 truncate ${platformColors[event.platform] || "bg-muted text-foreground"}`}>
                        {event.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(platformColors).map(([platform, cls]) => (
          <div key={platform} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`w-3 h-3 rounded-full border ${cls}`} />
            {platform}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCalendar;
