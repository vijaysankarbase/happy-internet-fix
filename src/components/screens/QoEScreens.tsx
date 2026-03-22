import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { RotateCcw, Cable, Wrench, CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from "lucide-react";
import modemCableImg from "@/assets/modem-cable-tighten.jpg";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";

const ModemRebootDrawer: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void; onSuccess: () => void; onFail: () => void }> = ({ open, onOpenChange, onSuccess, onFail }) => {
  const { t } = useTranslation();
  const [restarting, setRestarting] = useState(false);
  const [restartDone, setRestartDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!restarting) return;
    const interval = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); setRestarting(false); setRestartDone(true); return 100; } return p + 1; }); }, 100);
    return () => clearInterval(interval);
  }, [restarting]);

  return (
    <Drawer open={open} onOpenChange={(v) => { if (!restarting) onOpenChange(v); }}>
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
                <ActionButton onClick={() => { onOpenChange(false); onSuccess(); }} icon={<CheckCircle2 className="w-5 h-5" />}>{t("modemReboot.yesBetter")}</ActionButton>
                <ActionButton variant="outline" onClick={() => { onOpenChange(false); onFail(); }} icon={<XCircle className="w-5 h-5" />}>{t("modemReboot.noStillNeed")}</ActionButton>
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
                <div className="text-sm text-muted-foreground"><p className="font-medium text-foreground mb-1">{t("modemReboot.beforeStart")}</p><p dangerouslySetInnerHTML={{ __html: t("modemReboot.rebootInfo") }} /></div>
              </div>
            </div>
          )}
        </div>
        {!restarting && !restartDone && (
          <DrawerFooter className="px-6 pb-6 flex flex-col gap-3">
            <ActionButton onClick={() => { setRestarting(true); setProgress(0); setRestartDone(false); }} icon={<RotateCcw className="w-5 h-5" />}>{t("modemReboot.start")}</ActionButton>
            <DrawerClose asChild><ActionButton variant="outline" onClick={() => {}}>{t("modemReboot.back")}</ActionButton></DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const QoEModemDeregsScreen: React.FC = () => {
  const { setCurrentState, previousState } = useDiagnostic();
  const { t } = useTranslation();
  const fromExplainer = previousState === "qoe_explainer";
  const [step, setStep] = useState<"cause" | "solutions">(fromExplainer ? "solutions" : "cause");
  const [rebootOpen, setRebootOpen] = useState(false);

  if (step === "solutions") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-warning" /></div>} title={t("qoe.modemDeregs.solutionsTitle")}>
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><RotateCcw className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("qoe.modemDeregs.restartModem")}</p><p className="text-sm text-muted-foreground mt-1">{t("qoe.modemDeregs.restartModemDesc")}</p></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setRebootOpen(true)} icon={<RotateCcw className="w-5 h-5" />}>{t("qoe.modemDeregs.initiateReboot")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("qoe.modemDeregs.notHelpful")}</ActionButton>
        </div>
        <ModemRebootDrawer open={rebootOpen} onOpenChange={setRebootOpen} onSuccess={() => setCurrentState("success")} onFail={() => setCurrentState("support")} />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-warning" /></div>} title={t("qoe.modemDeregs.title")} subtitle={t("qoe.modemDeregs.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const QoEDropcableScreen: React.FC = () => {
  const { setCurrentState, previousState } = useDiagnostic();
  const { t } = useTranslation();
  const fromExplainer = previousState === "qoe_explainer";
  const [step, setStep] = useState<"cause" | "solutions" | "verify">(fromExplainer ? "solutions" : "cause");

  if (step === "verify") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-primary" /></div>} title={t("qoe.dropcable.didItImprove")}>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("common.yesBetter")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("common.noStillNeed")}</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  if (step === "solutions") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Cable className="w-8 h-8 text-warning" /></div>} title={t("qoe.dropcable.solutionsTitle")}>
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground"><Cable className="w-5 h-5" /></div>
            <div><p className="font-semibold text-foreground">{t("qoe.dropcable.tightenCable")}</p><p className="text-sm text-muted-foreground mt-1">{t("qoe.dropcable.tightenCableDesc")}</p></div>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <img src={modemCableImg} alt={t("qoe.dropcable.tightenCable")} className="w-full h-auto object-cover" />
            <p className="text-xs text-muted-foreground text-center py-2 px-3">{t("qoe.dropcable.visualGuide")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setStep("verify")} icon={<CheckCircle2 className="w-5 h-5" />}>{t("qoe.dropcable.done")}</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>{t("qoe.dropcable.notHelpful")}</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Cable className="w-8 h-8 text-warning" /></div>} title={t("qoe.dropcable.title")} subtitle={t("qoe.dropcable.subtitle")}>
      <ActionButton onClick={() => setStep("solutions")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const QoETechnicianScreen: React.FC = () => {
  const { setCurrentState, previousState } = useDiagnostic();
  const { t } = useTranslation();
  const fromExplainer = previousState === "qoe_explainer";
  const [step, setStep] = useState<"cause" | "resolution">(fromExplainer ? "resolution" : "cause");

  if (step === "resolution") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>} title={t("qoe.technician.resolutionTitle")} subtitle={t("qoe.technician.resolutionSubtitle")}>
        <ActionButton onClick={() => setCurrentState("support")}>{t("qoe.technician.contactSupport")}</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>} title={t("qoe.technician.causeTitle")} subtitle={t("qoe.technician.causeSubtitle")}>
      <ActionButton onClick={() => setStep("resolution")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

const QoEBrokenHardwareScreen: React.FC = () => {
  const { setCurrentState, previousState } = useDiagnostic();
  const { t } = useTranslation();
  const fromExplainer = previousState === "qoe_explainer";
  const [step, setStep] = useState<"cause" | "resolution">(fromExplainer ? "resolution" : "cause");

  if (step === "resolution") {
    return (
      <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>} title={t("qoe.brokenHardware.resolutionTitle")} subtitle={t("qoe.brokenHardware.resolutionSubtitle")}>
        <ActionButton onClick={() => setCurrentState("support")}>{t("qoe.brokenHardware.scheduleReplacement")}</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>} title={t("qoe.brokenHardware.causeTitle")} subtitle={t("qoe.brokenHardware.causeSubtitle")}>
      <ActionButton onClick={() => setStep("resolution")}>{t("common.whatCanIDo")}</ActionButton>
    </ScreenShell>
  );
};

export { QoEModemDeregsScreen, QoEDropcableScreen, QoETechnicianScreen, QoEBrokenHardwareScreen };
