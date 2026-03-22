import React, { useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { AlertTriangle, ThumbsUp, WifiOff, HelpCircle, ChevronRight, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

const PositiveMismatchScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const [reasonOpen, setReasonOpen] = useState(false);

  return (
    <ScreenShell>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight text-foreground mb-2"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        Good to hear — but we noticed something
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground mb-6 leading-relaxed text-sm"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        You're happy with your WiFi, but our systems have picked up a potential issue. It may not affect you yet — but it's worth knowing about.
      </motion.p>

      {/* Data comparison */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full mb-8"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 text-center">
            <WifiOff className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-xs font-medium text-muted-foreground mb-1">Our data</p>
            <p className="text-sm font-bold text-warning">Possibly wobbly WiFi</p>
          </div>
          <div className="p-4 rounded-xl bg-success/5 border border-success/20 text-center">
            <ThumbsUp className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-xs font-medium text-muted-foreground mb-1">Your experience</p>
            <p className="text-sm font-bold text-success">Positive</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full flex flex-col gap-3"
      >
        <ActionButton onClick={() => setReasonOpen(true)} icon={<HelpCircle className="w-5 h-5" />}>
          What's the reason?
        </ActionButton>
        <ActionButton variant="outline" onClick={() => setCurrentState("positive_mismatch_actions")} icon={<ChevronRight className="w-5 h-5" />}>
          What should I do?
        </ActionButton>
      </motion.div>

      {/* Reason bottom sheet */}
      <Drawer open={reasonOpen} onOpenChange={setReasonOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left px-6 pt-6">
            <DrawerTitle className="text-xl font-bold">Sadly, we're not flawless</DrawerTitle>
            <DrawerDescription className="sr-only">Explanation of why there is a misalignment</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-4 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our monitoring systems continuously analyse your connection, but sometimes they detect issues that haven't impacted your day-to-day experience — yet.
            </p>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Why this can happen:</h3>
              <ul className="space-y-2">
                {[
                  "Early signs of degradation that haven't become noticeable",
                  "Intermittent signal instability during off-peak hours",
                  "Hardware indicators that suggest future problems",
                  "Network-level patterns that may worsen over time",
                ].map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0 mt-1.5" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Our suggestion:</span> You can ignore this for now, or take a look at the issue to prevent problems down the road.
              </p>
            </div>
          </div>
          <DrawerFooter className="px-6 pb-6">
            <DrawerClose asChild>
              <ActionButton variant="outline" onClick={() => setReasonOpen(false)}>
                Close
              </ActionButton>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ScreenShell>
  );
};

export default PositiveMismatchScreen;
