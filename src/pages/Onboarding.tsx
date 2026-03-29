import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const niches = ["Fashion", "Tech", "Food", "Fitness", "Business", "Travel", "Beauty", "Gaming", "Education", "Other"];
const platforms = ["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter/X", "Facebook"];
const frequencies = ["Daily", "3x per week", "Weekly"];
const goals = ["Grow followers", "Drive sales", "Build brand", "Get clients"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    niche: "",
    platforms: [] as string[],
    frequency: "",
    goal: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    {
      title: "What is your niche?",
      subtitle: "This helps us tailor content ideas for you",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {niches.map((n) => (
            <button
              key={n}
              onClick={() => setData({ ...data, niche: n })}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                data.niche === n
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      ),
      valid: !!data.niche,
    },
    {
      title: "Which platforms do you post on?",
      subtitle: "Select all that apply",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => {
                const selected = data.platforms.includes(p)
                  ? data.platforms.filter((x) => x !== p)
                  : [...data.platforms, p];
                setData({ ...data, platforms: selected });
              }}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                data.platforms.includes(p)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      ),
      valid: data.platforms.length > 0,
    },
    {
      title: "How often do you want to post?",
      subtitle: "We'll plan your calendar accordingly",
      content: (
        <div className="space-y-3">
          {frequencies.map((f) => (
            <button
              key={f}
              onClick={() => setData({ ...data, frequency: f })}
              className={`w-full p-4 rounded-lg border text-sm font-medium text-left transition-all ${
                data.frequency === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      ),
      valid: !!data.frequency,
    },
    {
      title: "What is your main goal?",
      subtitle: "This shapes the type of content we suggest",
      content: (
        <div className="space-y-3">
          {goals.map((g) => (
            <button
              key={g}
              onClick={() => setData({ ...data, goal: g })}
              className={`w-full p-4 rounded-lg border text-sm font-medium text-left transition-all ${
                data.goal === g
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      ),
      valid: !!data.goal,
    },
  ];

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!steps[step].valid) {
      toast({ title: "Please make a selection", variant: "destructive" });
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("profiles").update({
            niche: data.niche,
            platforms: data.platforms,
            posting_frequency: data.frequency,
            goal: data.goal,
            onboarding_completed: true,
          }).eq("user_id", user.id);
        }
        toast({ title: "Profile saved! 🎉" });
        navigate("/dashboard");
      } catch (error: any) {
        toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <div className="relative w-full max-w-lg">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl">ContentIQ</span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "gradient-bg" : "bg-muted"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card rounded-xl p-8"
          >
            <h1 className="text-2xl font-bold mb-1">{steps[step].title}</h1>
            <p className="text-muted-foreground text-sm mb-6">{steps[step].subtitle}</p>
            {steps[step].content}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="border-border">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              )}
              <Button onClick={handleNext} disabled={loading} className="flex-1 gradient-bg border-0 text-primary-foreground hover:opacity-90">
                {step === steps.length - 1 ? (loading ? "Saving..." : "Finish Setup") : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
