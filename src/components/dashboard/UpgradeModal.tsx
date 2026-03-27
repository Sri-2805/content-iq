import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Crown, Sparkles, Zap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initiateRazorpayPayment, PLAN_PRICES } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  onUpgradeSuccess?: (plan: string) => void;
}

const features = [
  { feature: "AI Generations", free: "10/month", pro: "Unlimited", agency: "Unlimited" },
  { feature: "Platforms", free: "1", pro: "All", agency: "All" },
  { feature: "Content Calendar", free: "Basic", pro: "Full + Drag & Drop", agency: "Full + Drag & Drop" },
  { feature: "Save Content", free: "—", pro: "Unlimited", agency: "Unlimited" },
  { feature: "Caption Generator", free: "—", pro: "✓", agency: "✓" },
  { feature: "Hashtag Generator", free: "—", pro: "✓", agency: "✓" },
  { feature: "Best Time to Post", free: "—", pro: "✓", agency: "✓" },
  { feature: "Team Members", free: "—", pro: "—", agency: "Up to 5" },
  { feature: "Analytics", free: "—", pro: "—", agency: "✓" },
  { feature: "Priority Support", free: "—", pro: "—", agency: "✓" },
];

const UpgradeModal = ({ open, onClose, onUpgradeSuccess }: UpgradeModalProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpgrade = async (planId: "pro" | "agency") => {
    setLoading(planId);
    await initiateRazorpayPayment({
      planId,
      onSuccess: (plan) => {
        setLoading(null);
        toast({ title: `🎉 Upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!` });
        onUpgradeSuccess?.(plan);
        onClose();
      },
      onError: (error) => {
        setLoading(null);
        toast({ title: error, variant: "destructive" });
      },
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-primary/20 glow-purple"
          >
            <div className="p-6 md:p-8">
              <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 border border-accent/20"
                >
                  <Zap className="w-3 h-3" /> Limited Time — 20% Off Annual Plans
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Unlock Unlimited <span className="gradient-text">Content Creation</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Join 12,000+ creators who've already upgraded their content game with ContentIQ Pro.
                </p>
              </div>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">12,847</strong> creators upgraded</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">1.2M+</strong> ideas generated</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Secure payment via Razorpay</span>
                </div>
              </div>

              {/* Plan cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="rounded-xl border border-primary/50 p-5 bg-primary/5 relative">
                  <div className="absolute -top-2.5 left-4 gradient-bg px-3 py-0.5 rounded-full text-[10px] font-bold text-primary-foreground">
                    MOST POPULAR
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <Crown className="w-5 h-5 text-primary mr-1" />
                    <span className="font-bold text-lg">Pro</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold">{PLAN_PRICES.pro.display}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">7-day free trial • No hidden charges</p>
                  <Button
                    onClick={() => handleUpgrade("pro")}
                    disabled={!!loading}
                    className="w-full gradient-bg border-0 text-primary-foreground hover:opacity-90 animate-pulse-glow"
                  >
                    {loading === "pro" ? "Processing..." : `Upgrade to Pro — ${PLAN_PRICES.pro.display}/month`}
                  </Button>
                </div>
                <div className="rounded-xl border border-border p-5">
                  <div className="flex items-baseline gap-1 mb-1">
                    <Crown className="w-5 h-5 text-accent mr-1" />
                    <span className="font-bold text-lg">Agency</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold">{PLAN_PRICES.agency.display}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">7-day free trial • Cancel anytime</p>
                  <Button
                    onClick={() => handleUpgrade("agency")}
                    disabled={!!loading}
                    variant="outline"
                    className="w-full border-border hover:bg-muted/50"
                  >
                    {loading === "agency" ? "Processing..." : "Go Agency"}
                  </Button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mb-6 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-success" /> Cancel anytime</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-success" /> Secure payment via Razorpay</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-success" /> Used by 500+ creators</span>
              </div>

              {/* Feature comparison */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-4 gap-0 text-xs font-semibold bg-muted/50 px-4 py-3">
                  <div>Feature</div>
                  <div className="text-center">Free</div>
                  <div className="text-center text-primary">Pro</div>
                  <div className="text-center">Agency</div>
                </div>
                {features.map((row, i) => (
                  <div key={row.feature} className={`grid grid-cols-4 gap-0 text-xs px-4 py-2.5 ${i % 2 === 0 ? "bg-card/50" : ""}`}>
                    <div className="text-muted-foreground">{row.feature}</div>
                    <div className="text-center text-muted-foreground">{row.free}</div>
                    <div className="text-center font-medium">{row.pro === "✓" ? <Check className="w-3.5 h-3.5 text-success mx-auto" /> : row.pro}</div>
                    <div className="text-center font-medium">{row.agency === "✓" ? <Check className="w-3.5 h-3.5 text-success mx-auto" /> : row.agency}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
