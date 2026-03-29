import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { initiateRazorpayPayment, PLAN_PRICES } from "@/lib/razorpay";
import { Progress } from "@/components/ui/progress";

const plans = [
  {
    name: "Free",
    price: PLAN_PRICES.free.display,
    period: PLAN_PRICES.free.period,
    features: ["10 AI generations/month", "1 platform", "Basic calendar", "No saving"],
    current: true,
    planId: null as null,
  },
  {
    name: "Pro",
    price: PLAN_PRICES.pro.display,
    period: PLAN_PRICES.pro.period,
    features: ["Unlimited AI generations", "All platforms", "Full calendar + drag & drop", "Unlimited saves", "Caption + hashtag generator", "Best time to post", "7-day free trial"],
    highlighted: true,
    planId: "pro" as const,
  },
  {
    name: "Agency",
    price: PLAN_PRICES.agency.display,
    period: PLAN_PRICES.agency.period,
    features: ["Everything in Pro", "5 team members", "White label option", "Priority support", "Analytics overview", "Bulk content generation", "7-day free trial"],
    planId: "agency" as const,
  },
];

const mockPayments = [
  { date: "2024-03-15", plan: "Pro", amount: "₹499", paymentId: "pay_OxKj7H8kJl", status: "Success" },
  { date: "2024-02-15", plan: "Pro", amount: "₹499", paymentId: "pay_OwLk9I2mNp", status: "Success" },
];

const BillingPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpgrade = async (planId: "pro" | "agency") => {
    setLoading(planId);
    await initiateRazorpayPayment({
      planId,
      onSuccess: (plan) => {
        setLoading(null);
        toast({ title: `🎉 Upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!` });
      },
      onError: (error) => {
        setLoading(null);
        toast({ title: error, variant: "destructive" });
      },
    });
  };

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current Plan</div>
            <div className="text-xl font-bold flex items-center gap-2">
              Free Plan
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">Active</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{PLAN_PRICES.free.display}/month</div>
          </div>
          <CreditCard className="w-8 h-8 text-muted-foreground/30" />
        </div>
        <div className="mb-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Generations used this month</span>
            <span className="text-muted-foreground">3 of 10</span>
          </div>
          <Progress value={30} className="h-2" />
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
            ) : plan.planId ? (
              <Button
                className={`w-full text-sm ${plan.highlighted ? "gradient-bg border-0 text-primary-foreground hover:opacity-90" : "bg-muted hover:bg-muted/80 border border-border"}`}
                disabled={!!loading}
                onClick={() => handleUpgrade(plan.planId!)}
              >
                {loading === plan.planId ? "Processing..." : `Upgrade to ${plan.name}`}
              </Button>
            ) : null}
          </motion.div>
        ))}
      </div>

      {/* Payment history */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">Payment History</h3>
        {mockPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-2 font-medium">Date</th>
                  <th className="text-left py-2 font-medium">Plan</th>
                  <th className="text-left py-2 font-medium">Amount</th>
                  <th className="text-left py-2 font-medium">Payment ID</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-right py-2 font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((p, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="py-3">{p.date}</td>
                    <td className="py-3">{p.plan}</td>
                    <td className="py-3 font-medium">{p.amount}</td>
                    <td className="py-3 text-xs text-muted-foreground font-mono">{p.paymentId}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "Success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Download className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No payments yet. Upgrade to Pro to get started!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BillingPage;
