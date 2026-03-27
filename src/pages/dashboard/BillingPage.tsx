import { motion } from "framer-motion";
import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["10 AI generations/month", "1 platform", "Basic calendar", "No saving"],
    current: true,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: ["Unlimited AI generations", "All platforms", "Full calendar + drag & drop", "Unlimited saves", "Caption + hashtag generator", "Best time to post"],
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$79",
    period: "/month",
    features: ["Everything in Pro", "5 team members", "White label option", "Priority support", "Analytics overview", "Bulk content generation"],
  },
];

const BillingPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Crown className="w-6 h-6 text-primary" /> Billing & Upgrade
        </h1>
        <p className="text-muted-foreground text-sm">Manage your subscription and billing.</p>
      </motion.div>

      {/* Current plan */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current Plan</div>
            <div className="text-xl font-bold">Free Plan</div>
            <div className="text-xs text-muted-foreground mt-1">3 of 10 generations used this month</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">Active</span>
        </div>
      </motion.div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`rounded-xl p-6 border ${plan.highlighted ? "border-primary/50 glow-purple bg-card" : "border-border bg-card/50"} ${plan.current ? "ring-1 ring-primary/30" : ""}`}
          >
            <h3 className="font-semibold mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-3 h-3 text-success mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {plan.current ? (
              <Button disabled className="w-full text-sm" variant="outline">Current Plan</Button>
            ) : (
              <Button
                className={`w-full text-sm ${plan.highlighted ? "gradient-bg border-0 text-primary-foreground hover:opacity-90" : "bg-muted hover:bg-muted/80 border border-border"}`}
                onClick={() => toast({ title: "Stripe checkout will be connected here" })}
              >
                Upgrade to {plan.name}
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Invoice history */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Invoice History</h3>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No invoices yet. Upgrade to Pro to get started!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;
