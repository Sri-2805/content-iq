import { motion } from "framer-motion";
import { Zap, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

const TrialBanner = ({ daysRemaining, onUpgrade }: TrialBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isUrgent = daysRemaining <= 1;
  const isWarning = daysRemaining <= 2;

  const bgClass = isUrgent
    ? "bg-destructive/10 border-destructive/30"
    : isWarning
    ? "bg-orange-500/10 border-orange-500/30"
    : "gradient-bg-subtle border-primary/20";

  const textClass = isUrgent
    ? "text-destructive"
    : isWarning
    ? "text-orange-400"
    : "text-primary";

  const Icon = isUrgent || isWarning ? AlertTriangle : Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 border ${bgClass} flex items-center justify-between gap-4 mb-6`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${textClass} shrink-0`} />
        <div>
          <p className={`text-sm font-medium ${textClass}`}>
            {daysRemaining <= 0
              ? "Your free trial has ended"
              : `🎉 You're on a free Pro trial — ${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`}
          </p>
          <p className="text-xs text-muted-foreground">
            {daysRemaining <= 0
              ? "Upgrade to keep your content library and unlimited generations"
              : "Upgrade now to keep access to all Pro features"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button onClick={onUpgrade} size="sm" className={`text-xs ${isUrgent ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "gradient-bg border-0 text-primary-foreground hover:opacity-90"}`}>
          Upgrade to Pro — ₹999/mo
        </Button>
        <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default TrialBanner;
