import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { RotateCcw, ExternalLink, Wifi, XCircle, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";

const WifiHelpScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();
  const [restartOpen, setRestartOpen] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [restartDone, setRestartDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!restarting) return;
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(interval); setRestarting(false); setRestartDone(true); return 100; } return p + 1; });
    }, 100);
    return () => clearInterval(interval);
  }, [restarting]);

  const handleStartRestart = () => { setRestarting(true); setProgress(0); setRestartDone(false); };

  const options = [
    { icon: <RotateCcw className="w-5 h-5" />, label: t("wifiHelp.modemRestart"), desc: t("wifiHelp.modemRestartDesc"), onClick: () => setRestartOpen(true) },
    { icon: <ExternalLink className="w-5 h-5" />, label: t("wifiHelp.diyTips"), desc: t("wifiHelp.diyTipsDesc"), onClick: () => window.open("https://www.base.be/en/support/internet/problem-with-internet-or-wifi/problem-with-wi-fi-at-home.html", "_blank") },
    { icon: <Wifi className="w-5 h-5" />, label: t("wifiHelp.orderBooster"), desc: t("wifiHelp.orderBoosterDesc"), onClick: () => window.open("https://www.base.be/en/internet/wifi-booster.html", "_blank") },
    { icon: <XCircle className="w-5 h-5" />, label: t("wifiHelp.notHelpful"), desc: t("wifiHelp.notHelpfulDesc"), onClick: () => setCurrentState("support") },
  ];

  return (
    <ScreenShell icon={<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-10 h-10 text-primary" /></div>} title={t("wifiHelp.title")} subtitle={t("wifiHelp.subtitle")}>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <motion.button key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }} whileTap={{ scale: 0.97 }} onClick={opt.onClick} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left transition-[box-shadow] hover:shadow-sm active:scale-[0.97] w-full">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">{opt.icon}</div>
            <div className="min-w-0"><p className="font-semibold text-foreground text-sm">{opt.label}</p><p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p></div>
          </motion.button>
        ))}
      </div>
      <Drawer open={restartOpen} onOpenChange={(open) => { if (!restarting) setRestartOpen(open); }}>
        <DrawerContent>
          <DrawerHeader className="text-left px-6 pt-6">
            <DrawerTitle className="text-xl font-bold">{restartDone ? t("modemReboot.restartedTitle") : restarting ? t("modemReboot.restartingTitle") : t("modemReboot.title")}</DrawerTitle>
            <DrawerDescription className="sr-only">Modem restart</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-4">
            {restartDone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center"><div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-success" /></div></div>
                <p className="text-sm text-foreground font-medium text-center">{t("modemReboot.didItImprove")}</p>
                <div className="flex flex-col gap-3">
                  <ActionButton onClick={() => { setRestartOpen(false); setCurrentState("success"); }} icon={<CheckCircle2 className="w-5 h-5" />}>{t("modemReboot.yesBetter")}</ActionButton>
                  <ActionButton variant="outline" onClick={() => { setRestartOpen(false); setCurrentState("support"); }} icon={<XCircle className="w-5 h-5" />}>{t("modemReboot.noStillNeed")}</ActionButton>
                </div>
              </div>
            ) : restarting ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden"><motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} /></div>
                <p className="text-sm text-muted-foreground text-center">{t("modemReboot.rebootWait")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">{t("modemReboot.beforeStart")}</p>
                    <p dangerouslySetInnerHTML={{ __html: t("modemReboot.rebootInfo") }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          {!restarting && !restartDone && (
            <DrawerFooter className="px-6 pb-6 flex flex-col gap-3">
              <ActionButton onClick={handleStartRestart} icon={<RotateCcw className="w-5 h-5" />}>{t("modemReboot.start")}</ActionButton>
              <DrawerClose asChild><ActionButton variant="outline" onClick={() => setRestartOpen(false)}>{t("common.close")}</ActionButton></DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </ScreenShell>
  );
};

export default WifiHelpScreen;
