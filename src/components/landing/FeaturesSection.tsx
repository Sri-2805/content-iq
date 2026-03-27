import { motion } from "framer-motion";
import { Brain, Calendar, Hash, Clock, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Content Ideas",
    description: "Generate 10+ unique content ideas tailored to your niche and platform in seconds.",
  },
  {
    icon: Zap,
    title: "Caption Generator",
    description: "Create engaging captions with the right tone, CTAs, and emojis for any platform.",
  },
  {
    icon: Hash,
    title: "Smart Hashtags",
    description: "Get 30 optimized hashtags grouped by reach — from niche to mega hashtags.",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description: "Plan and schedule your content on a visual drag-and-drop calendar.",
  },
  {
    icon: Clock,
    title: "Best Time to Post",
    description: "Know exactly when your audience is most active with personalized insights.",
  },
  {
    icon: BarChart3,
    title: "Analytics Overview",
    description: "Track your content performance and generation usage at a glance.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Create Smarter</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From ideation to scheduling, ContentIQ handles your entire content workflow with AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg-subtle flex items-center justify-center mb-4 group-hover:glow-purple transition-shadow">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
