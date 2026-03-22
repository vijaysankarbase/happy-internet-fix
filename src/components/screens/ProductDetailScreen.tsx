import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Wifi } from "lucide-react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { Progress } from "@/components/ui/progress";
import ServiceMomentCard from "@/components/ServiceMomentCard";
import { useTranslation } from "react-i18next";

const ProductDetailScreen: React.FC = () => {
  const { setCurrentState } = useDiagnostic();
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-6 px-5 pt-2 pb-20">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentState("entry")} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors active:scale-95" aria-label={t("productDetail.back")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground tracking-tight">{t("productDetail.title")}</h1>
      </div>
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Wifi className="w-5 h-5 text-primary" /></div>
          <div>
            <p className="text-sm font-semibold text-foreground">{t("productDetail.dataUsage")}</p>
            <p className="text-xs text-muted-foreground">{t("productDetail.currentPeriod")}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{t("productDetail.used", { used: 100 })}</span>
            <span>{t("productDetail.total", { total: 300 })}</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("start.quickActions")}</h2>
        <ServiceMomentCard variant="list-item" />
      </div>
    </motion.div>
  );
};

export default ProductDetailScreen;
