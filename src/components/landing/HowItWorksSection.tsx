import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Tell Us About You",
    description: "Share your niche, platforms, and posting goals during a quick onboarding.",
  },
  {
    step: "02",
    title: "Generate with AI",
    description: "Get tailored content ideas, captions, and hashtags powered by artificial intelligence.",
  },
  {
    step: "03",
    title: "Plan & Execute",
    description: "Drag and drop your content onto a calendar and know the best times to post.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">Three simple steps to transform your content strategy.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="text-6xl font-black gradient-text opacity-30 mb-4">{s.step}</div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-12 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
