import React from "react";
import { motion } from "framer-motion";
import ScreenShell from "@/components/ScreenShell";
import ActionButton from "@/components/ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";

const RetestWarningScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();

  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-warning/15 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight text-foreground mb-3"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        Before you retest
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground mb-4 leading-relaxed text-sm"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        Our diagnostic data is not updated in real time. After a fix has been applied, it can take up to <strong className="text-foreground font-semibold">one week</strong> for new results to appear.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.5 }}
        className="w-full bg-warning/10 border border-warning/20 rounded-xl px-4 py-3 mb-8 flex items-start gap-3"
      >
        <Clock className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          Running a scan now may show outdated information and give an incorrect result.
        </p>
      </motion.div>

      <div className="w-full flex flex-col gap-3">
        <ActionButton onClick={() => setCurrentState("scanning")} icon={<ArrowRight className="w-5 h-5" />}>
          Continue anyway
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("entry")}>
          Come back later
        </ActionButton>
      </div>
    </ScreenShell>
  );
};

export default RetestWarningScreen;
