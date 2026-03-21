import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";

interface ScreenShellProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  hideClose?: boolean;
}

const ScreenShell: React.FC<ScreenShellProps> = ({ children, icon, title, subtitle, hideClose }) => {
  const { setCurrentState } = useDiagnostic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center px-6 py-10 max-w-md mx-auto min-h-[80vh] justify-center text-center"
    >
      {!hideClose && (
        <button
          onClick={() => setCurrentState("entry")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors active:scale-95"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          {icon}
        </motion.div>
      )}
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-foreground mb-2"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {title}
        </motion.h1>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-muted-foreground mb-8 leading-relaxed"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ScreenShell;
