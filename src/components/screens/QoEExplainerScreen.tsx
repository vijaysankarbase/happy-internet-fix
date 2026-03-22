import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertCircle, ChevronRight, WifiOff, Cable, Wrench, MapPin, RotateCcw, Cpu } from "lucide-react";
import type { ScreenState } from "@/types/diagnostic";

const QOE_INFO: Record<string, { label: string; description: string; icon: React.ReactNode; resolution: ScreenState }> = {
  modem_deregs: {
    label: "Local network issue",
    description: "Your modem has been experiencing signal deregistrations — brief moments where it loses sync with the network. This can cause intermittent drops or slowdowns.",
    icon: <RotateCcw className="w-8 h-8 text-warning" />,
    resolution: "qoe_modem_deregs",
  },
  dropcable: {
    label: "Cable signal issue",
    description: "We've detected signal degradation on the cable connecting your modem. This could be caused by a loose or damaged coaxial cable.",
    icon: <Cable className="w-8 h-8 text-warning" />,
    resolution: "qoe_dropcable",
  },
  coverage: {
    label: "WiFi coverage issue",
    description: "Parts of your home may have weak WiFi signal. This is usually caused by distance from the router, walls, or interference from other devices.",
    icon: <MapPin className="w-8 h-8 text-warning" />,
    resolution: "qoe_coverage",
  },
  filter: {
    label: "Technical issue",
    description: "A filter component in your connection needs attention. This requires a technician visit to resolve.",
    icon: <Wrench className="w-8 h-8 text-warning" />,
    resolution: "qoe_filter",
  },
  filter_hp47: {
    label: "Technical issue",
    description: "A specific filter component (HP47) has been flagged. A technician visit is required to inspect and replace it.",
    icon: <Wrench className="w-8 h-8 text-warning" />,
    resolution: "qoe_filter_hp47",
  },
  filter_tof: {
    label: "Technical issue",
    description: "A filter issue (TOF) has been detected in your line. This needs an on-site technician to resolve.",
    icon: <Wrench className="w-8 h-8 text-warning" />,
    resolution: "qoe_filter_tof",
  },
  dice: {
    label: "Technical issue",
    description: "A network component issue has been identified that requires professional attention from a technician.",
    icon: <Wrench className="w-8 h-8 text-warning" />,
    resolution: "qoe_dice",
  },
  broken_hardware_modem: {
    label: "Defective modem",
    description: "Our diagnostics indicate your modem may have a hardware fault. It might need to be replaced to ensure stable connectivity.",
    icon: <Cpu className="w-8 h-8 text-destructive" />,
    resolution: "qoe_broken_hardware_modem",
  },
};

const QoEExplainerScreen: React.FC = () => {
  const { qoeSelected, setCurrentState } = useDiagnostic();

  const qoeType = qoeSelected?.type || "modem_deregs";
  const info = QOE_INFO[qoeType] || QOE_INFO.modem_deregs;

  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
          {info.icon}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight text-foreground mb-2"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {info.label}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground mb-8 leading-relaxed text-sm"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        {info.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full"
      >
        <ActionButton onClick={() => setCurrentState(info.resolution)} icon={<ChevronRight className="w-5 h-5" />}>
          What can I do?
        </ActionButton>
      </motion.div>
    </ScreenShell>
  );
};

export default QoEExplainerScreen;
