import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { RotateCcw, Cable, MapPin, Wrench, CheckCircle2, XCircle, AlertTriangle, Info, Loader2, Image } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

/* ─── Shared modem reboot bottom sheet ─── */
const ModemRebootDrawer: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
  onFail: () => void;
}> = ({ open, onOpenChange, onSuccess, onFail }) => {
  const [restarting, setRestarting] = useState(false);
  const [restartDone, setRestartDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!restarting) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setRestarting(false);
          setRestartDone(true);
          return 100;
        }
        return p + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [restarting]);

  const handleStart = () => {
    setRestarting(true);
    setProgress(0);
    setRestartDone(false);
  };

  return (
    <Drawer open={open} onOpenChange={(v) => { if (!restarting) onOpenChange(v); }}>
      <DrawerContent>
        <DrawerHeader className="text-left px-6 pt-6">
          <DrawerTitle className="text-xl font-bold">
            {restartDone ? "Modem restarted" : restarting ? "Restarting modem…" : "Restart your modem"}
          </DrawerTitle>
          <DrawerDescription className="sr-only">Modem restart information</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 pb-4">
          {restartDone ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
              </div>
              <p className="text-sm text-foreground font-medium text-center">Did your experience improve?</p>
              <div className="flex flex-col gap-3">
                <ActionButton onClick={() => { onOpenChange(false); onSuccess(); }} icon={<CheckCircle2 className="w-5 h-5" />}>
                  Yes, it's better!
                </ActionButton>
                <ActionButton variant="outline" onClick={() => { onOpenChange(false); onFail(); }} icon={<XCircle className="w-5 h-5" />}>
                  No, I still need help
                </ActionButton>
              </div>
            </div>
          ) : restarting ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
              </div>
              <p className="text-sm text-muted-foreground text-center">Please wait while we restart your modem…</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Before you start</p>
                  <p>The reboot will take approximately <span className="font-medium text-foreground">5 minutes</span> to complete. You will <span className="font-medium text-foreground">lose your internet connection</span> during this time.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!restarting && !restartDone && (
          <DrawerFooter className="px-6 pb-6 flex flex-col gap-3">
            <ActionButton onClick={handleStart} icon={<RotateCcw className="w-5 h-5" />}>Start</ActionButton>
            <DrawerClose asChild>
              <ActionButton variant="outline" onClick={() => {}}>Back</ActionButton>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

/* ─── Modem Deregs ─── */
const QoEModemDeregsScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions">("cause");
  const [rebootOpen, setRebootOpen] = useState(false);

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-warning" /></div>}
        title="Possible solutions"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Restart your modem</p>
              <p className="text-sm text-muted-foreground mt-1">A reboot can often resolve signal issues with your modem.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setRebootOpen(true)} icon={<RotateCcw className="w-5 h-5" />}>
            Initiate modem reboot
          </ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>
            This suggestion is not helpful
          </ActionButton>
        </div>
        <ModemRebootDrawer
          open={rebootOpen}
          onOpenChange={setRebootOpen}
          onSuccess={() => setCurrentState("success")}
          onFail={() => setCurrentState("support")}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><RotateCcw className="w-8 h-8 text-warning" /></div>}
      title="Poor or no connectivity"
      subtitle="We detect that you may have poor or no connectivity. The most probable cause is a malfunctioning modem caused by a signal issue."
    >
      <ActionButton onClick={() => setStep("solutions")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Dropcable ─── */
const QoEDropcableScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "solutions" | "verify">("cause");

  if (step === "verify") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-primary" /></div>}
        title="Did it improve your experience?"
      >
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes, it's better!</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>No, I still need help</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  if (step === "solutions") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Cable className="w-8 h-8 text-warning" /></div>}
        title="Possible solutions"
      >
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border text-left">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
              <Cable className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Tighten cable at your modem</p>
              <p className="text-sm text-muted-foreground mt-1">Make sure the coax cable is firmly screwed into the back of your modem.</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 rounded-xl bg-muted/30 border border-border">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Image className="w-10 h-10" />
              <p className="text-xs">Visual guide: tighten cable connection</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setStep("verify")} icon={<CheckCircle2 className="w-5 h-5" />}>Done</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")} icon={<XCircle className="w-5 h-5" />}>This suggestion is not helpful</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Cable className="w-8 h-8 text-warning" /></div>}
      title="Poor or no connectivity"
      subtitle="We detect that you may have poor or no connectivity. The most probable cause is a cabling issue."
    >
      <ActionButton onClick={() => setStep("solutions")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Coverage ─── */
const QoECoverageScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [phase, setPhase] = useState<"confirm" | "tips" | "verify">("confirm");

  if (phase === "verify") {
    return (
      <ScreenShell title="Did repositioning help?">
        <div className="flex flex-col gap-3">
          <ActionButton onClick={() => setCurrentState("success")} icon={<CheckCircle2 className="w-5 h-5" />}>Yes, much better!</ActionButton>
          <ActionButton variant="outline" onClick={() => setCurrentState("support")}>No, I need more help</ActionButton>
        </div>
      </ScreenShell>
    );
  }

  if (phase === "tips") {
    const tips = [
      "Move your router to a central, elevated location",
      "Keep it away from walls, microwaves, and other electronics",
      "Consider a WiFi booster for hard-to-reach areas",
    ];
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-primary" /></div>}
        title="Coverage tips"
        subtitle="Here are some things that can improve your WiFi coverage:"
      >
        <div className="flex flex-col gap-3 mb-6 text-left">
          {tips.map((tip, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-foreground text-sm">{tip}</p>
            </div>
          ))}
        </div>
        <ActionButton onClick={() => setPhase("verify")}>I've tried these</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><MapPin className="w-8 h-8 text-warning" /></div>}
      title="WiFi coverage issues detected"
      subtitle="Does this match what you're experiencing — weak signal in parts of your home?"
    >
      <div className="flex flex-col gap-3">
        <ActionButton onClick={() => setPhase("tips")}>Yes, that sounds right</ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("support")}>No, my issue is different</ActionButton>
      </div>
    </ScreenShell>
  );
};

/* ─── Technician (filter / dice) ─── */
const QoETechnicianScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "resolution">("cause");

  if (step === "resolution") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>}
        title="A technician visit is required"
        subtitle="This issue requires an on-site inspection by one of our technicians. Please contact us to schedule a visit."
      >
        <ActionButton onClick={() => setCurrentState("support")}>Contact support</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>}
      title="Poor or no connectivity"
      subtitle="We detect that you may have poor or no connectivity. The most probable cause is a network issue outside your home."
    >
      <ActionButton onClick={() => setStep("resolution")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

/* ─── Broken Hardware Modem ─── */
const QoEBrokenHardwareScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [step, setStep] = useState<"cause" | "resolution">("cause");

  if (step === "resolution") {
    return (
      <ScreenShell
        icon={<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-destructive" /></div>}
        title="Modem replacement needed"
        subtitle="Your modem needs to be replaced. Please contact our support team to arrange a replacement."
      >
        <ActionButton onClick={() => setCurrentState("support")}>Schedule replacement</ActionButton>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      icon={<div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center"><Wrench className="w-8 h-8 text-warning" /></div>}
      title="Poor or no connectivity"
      subtitle="We detect that you have poor or no connectivity. The most probable cause is a defective modem."
    >
      <ActionButton onClick={() => setStep("resolution")}>What can I do?</ActionButton>
    </ScreenShell>
  );
};

export { QoEModemDeregsScreen, QoEDropcableScreen, QoECoverageScreen, QoETechnicianScreen, QoEBrokenHardwareScreen };
