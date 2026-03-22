import React, { useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, Zap, Frown, ChevronRight, HelpCircle } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";

const SentimentMismatchScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [reasonOpen, setReasonOpen] = useState(false);
  const whyReasons = t("mismatch.whyReasons", { returnObjects: true }) as string[];

  return (
    <ScreenShell>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto"><AlertTriangle className="w-10 h-10 text-warning" /></div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-2xl font-bold tracking-tight text-foreground mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>{t("mismatch.title")}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-muted-foreground mb-6 leading-relaxed text-sm" style={{ textWrap: "pretty" } as React.CSSProperties}>{t("mismatch.subtitle")}</motion.p>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="w-full mb-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-success/5 border border-success/20 text-center">
            <Zap className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-xs font-medium text-muted-foreground mb-1">{t("mismatch.ourData")}</p>
            <p className="text-sm font-bold text-success">{t("mismatch.superchargedWifi")}</p>
          </div>
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-center">
            <Frown className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-xs font-medium text-muted-foreground mb-1">{t("mismatch.yourExperience")}</p>
            <p className="text-sm font-bold text-destructive">{t("mismatch.negative")}</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="w-full flex flex-col gap-3">
        <ActionButton onClick={() => setReasonOpen(true)} icon={<HelpCircle className="w-5 h-5" />}>{t("mismatch.whatsTheReason")}</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("mismatch_actions")} icon={<ChevronRight className="w-5 h-5" />}>{t("mismatch.whatShouldIDo")}</ActionButton>
      </motion.div>
      <Drawer open={reasonOpen} onOpenChange={setReasonOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left px-6 pt-6">
            <DrawerTitle className="text-xl font-bold">{t("mismatch.reasonTitle")}</DrawerTitle>
            <DrawerDescription className="sr-only">Explanation</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-4 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{t("mismatch.reasonBody")}</p>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{t("mismatch.whyTitle")}</h3>
              <ul className="space-y-2">
                {whyReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0 mt-1.5" />{reason}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{t("mismatch.suggestion")}</span> {t("mismatch.suggestionBody")}</p>
            </div>
          </div>
          <DrawerFooter className="px-6 pb-6">
            <DrawerClose asChild><ActionButton variant="outline" onClick={() => setReasonOpen(false)}>{t("mismatch.close")}</ActionButton></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ScreenShell>
  );
};

export default SentimentMismatchScreen;
