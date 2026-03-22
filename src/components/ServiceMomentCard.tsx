import React from "react";
import { motion } from "framer-motion";
import { Wifi, X } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { useTranslation } from "react-i18next";
import type { Sentiment } from "@/types/diagnostic";

interface ServiceMomentCardProps {
  variant?: "card" | "list-item";
  onDismiss?: () => void;
}

const options: { sentiment: Sentiment; emoji: string }[] = [
  { sentiment: "negative", emoji: "😡" },
  { sentiment: "neutral", emoji: "😐" },
  { sentiment: "positive", emoji: "😊" },
];

const ServiceMomentCard: React.FC<ServiceMomentCardProps> = ({ variant = "card", onDismiss }) => {
  const { setSentiment, setCurrentState } = useDiagnostic();
  const { t } = useTranslation();

  const handleSelect = (s: Sentiment) => {
    setSentiment(s);
    setCurrentState("intro");
  };

  if (variant === "list-item") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Wifi className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{t("serviceMoment.title")}</p>
          <p className="text-xs text-muted-foreground">{t("serviceMoment.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          {options.map((opt) => (
            <button
              key={opt.sentiment}
              onClick={() => handleSelect(opt.sentiment)}
              className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-lg hover:bg-secondary hover:border-primary/30 transition-all duration-200 active:scale-93 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={opt.sentiment}
            >
              {opt.emoji}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 pt-5 pb-2">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <Wifi className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{t("serviceMoment.title")}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors active:scale-95"
            aria-label={t("serviceMoment.dismiss")}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="px-5 pb-2">
        <h2 className="text-base font-bold text-foreground tracking-tight">{t("serviceMoment.subtitle")}</h2>
      </div>
      <div className="flex items-center justify-center gap-4 px-5 py-4">
        {options.map((opt, i) => (
          <motion.button
            key={opt.sentiment}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileTap={{ scale: 0.93 }}
            onClick={() => handleSelect(opt.sentiment)}
            className="w-14 h-14 rounded-full border-2 border-border bg-background flex items-center justify-center text-3xl hover:bg-secondary hover:border-primary/30 transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={opt.sentiment}
          >
            {opt.emoji}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceMomentCard;
