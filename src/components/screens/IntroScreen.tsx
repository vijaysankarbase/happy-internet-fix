import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Sparkles, Heart, Search, LogOut, Wifi, MapPin, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const addresses = [
  { id: "1", product: "Internet Limited", address: "Liersesteenweg 4, Mechelen" },
  { id: "2", product: "Internet Unlimited", address: "Winketkaai 20, Mechelen" },
];

const AddressSheet: React.FC<{ open: boolean; onClose: () => void; onSelect: (id: string) => void }> = ({ open, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl border-t border-border shadow-xl max-w-md mx-auto"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div>
                <h2 className="text-lg font-bold text-foreground">Select an address</h2>
                <p className="text-sm text-muted-foreground">To start the diagnosis</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 pb-6 pt-3 space-y-3">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => onSelect(addr.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:bg-secondary/50 transition-colors active:scale-[0.98] text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Wifi className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{addr.product}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <p className="text-xs text-muted-foreground truncate">{addr.address}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const IntroScreen: React.FC = () => {
  const { isPositive, setCurrentState, panelInputs, selectedProduct } = useDiagnostic();
  const { t } = useTranslation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleStartDiagnosis = () => {
    // If user already selected a specific product (e.g. Internet Unlimited from Start),
    // skip the address sheet even if multipleHomes is on
    if (panelInputs.multipleHomes && selectedProduct === "limited") {
      setSheetOpen(true);
    } else {
      setCurrentState("pre_scan");
    }
  };

  const handleAddressSelect = (_id: string) => {
    setSheetOpen(false);
    setCurrentState("pre_scan");
  };

  const icon = isPositive ? (
    <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
      <Sparkles className="w-10 h-10 text-success" />
    </div>
  ) : (
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
      <Heart className="w-10 h-10 text-primary" />
    </div>
  );

  const title = isPositive ? t("intro.positiveTitle") : t("intro.negativeTitle");
  const subtitle = isPositive ? t("intro.positiveSubtitle") : t("intro.negativeSubtitle");

  return (
    <ScreenShell hideClose>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        {icon}
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
        {title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="text-muted-foreground mb-8 leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
        {subtitle}
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full flex flex-col gap-3">
        <ActionButton onClick={handleStartDiagnosis} icon={<Search className="w-5 h-5" />}>{t("intro.startDiagnosis")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("entry")} icon={<LogOut className="w-5 h-5" />}>{t("intro.exit")}</ActionButton>
      </motion.div>
      <AddressSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onSelect={handleAddressSelect} />
    </ScreenShell>
  );
};

export default IntroScreen;
