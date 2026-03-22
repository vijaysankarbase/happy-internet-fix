import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, ChevronRight } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Progress } from "@/components/ui/progress";
import ServiceMomentCard from "@/components/ServiceMomentCard";
import DiagnosticPanel from "@/components/DiagnosticPanel";

const StartTab: React.FC = () => {
  const { setCurrentState, serviceMomentDismissed, dismissServiceMoment } = useDiagnostic();

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-20">
      <DiagnosticPanel />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hello Vijay</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Welcome back</p>
      </motion.div>

      {/* Service Moment Card */}
      <AnimatePresence>
        {!serviceMomentDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, overflow: "hidden" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceMomentCard variant="card" onDismiss={dismissServiceMoment} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your Products */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Products</h2>
        <button
          onClick={() => setCurrentState("product_detail")}
          className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors active:scale-[0.98] text-left"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Wifi className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <p className="text-sm font-semibold text-foreground">Limited Internet</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">100 GB / 300 GB used</span>
              </div>
              <Progress value={33} className="h-1.5" />
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        </button>
      </motion.div>
    </div>
  );
};

export default StartTab;
