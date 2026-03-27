import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the AI generate content ideas?",
    a: "ContentIQ uses advanced AI models to analyze your niche, platform, and audience preferences to generate unique, trending content ideas tailored to your brand.",
  },
  {
    q: "Can I use ContentIQ for multiple platforms?",
    a: "Yes! Pro and Agency plans support all major platforms including Instagram, TikTok, YouTube, LinkedIn, Twitter/X, and Facebook. The Free plan supports one platform.",
  },
  {
    q: "What happens when I hit my free generation limit?",
    a: "You'll see a friendly upgrade prompt. Your existing saved content remains accessible, but you'll need to upgrade to Pro for unlimited generations.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. You can cancel or downgrade at any time from your Settings page. Your access continues until the end of your billing period.",
  },
  {
    q: "Is the content calendar shareable?",
    a: "On the Agency plan, you can invite up to 5 team members to collaborate on your content calendar. Pro users can export their calendar as PDF.",
  },
  {
    q: "Do you store my generated content?",
    a: "Only content you explicitly save is stored in your account. Unsaved generations are not kept. You can delete saved content anytime.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card rounded-xl px-6 border-border/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-sm font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
