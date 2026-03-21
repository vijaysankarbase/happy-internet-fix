import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  icon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, variant = "primary", className, icon }) => {
  const base = "w-full rounded-xl px-6 py-4 text-base font-semibold transition-[box-shadow,transform] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-md",
    outline: "border-2 border-border bg-card text-foreground hover:border-primary/40 hover:shadow-sm",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      <span className="flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
};

export default ActionButton;
