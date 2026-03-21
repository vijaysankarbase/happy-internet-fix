import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScreenShell from "../ScreenShell";
import { Wifi } from "lucide-react";

const ScanningScreen: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScreenShell title={`Scanning your connection${dots}`} subtitle="We're checking your modem, network, and signal quality.">
      <div className="flex justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [0.9, 1.4], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-primary/15"
            animate={{ scale: [0.9, 1.3], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          />
          <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Wifi className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
    </ScreenShell>
  );
};

export default ScanningScreen;
