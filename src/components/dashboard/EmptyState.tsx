import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
  children?: ReactNode;
}

const EmptyState = ({ icon: Icon, emoji, title, description, actionLabel, actionPath, onAction, children }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 rounded-2xl gradient-bg-subtle flex items-center justify-center mx-auto">
          {emoji ? (
            <span className="text-3xl">{emoji}</span>
          ) : (
            <Icon className="w-8 h-8 text-primary" />
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
          <span className="text-xs">✨</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>
      {actionLabel && actionPath && (
        <Link to={actionPath}>
          <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
          {actionLabel}
        </Button>
      )}
      {children}
    </motion.div>
  );
};

export default EmptyState;
