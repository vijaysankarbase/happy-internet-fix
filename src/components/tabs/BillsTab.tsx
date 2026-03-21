import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const BillsTab: React.FC = () => (
  <div className="flex flex-col items-center justify-center px-5 pt-20 pb-20 min-h-[60vh]">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">Bills</h2>
      <p className="text-sm text-muted-foreground">No bills to display</p>
    </motion.div>
  </div>
);

export default BillsTab;
