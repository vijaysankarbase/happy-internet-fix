import React from "react";
import ScreenShell from "../ScreenShell";
import ActionButton from "../ActionButton";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SuccessScreen: React.FC = () => {
  const { reset } = useDiagnostic();
  const { t } = useTranslation();

  return (
    <ScreenShell
      icon={<motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center"><PartyPopper className="w-10 h-10 text-success" /></motion.div>}
      title={t("success.title")}
      subtitle={t("success.subtitle")}
    >
      <ActionButton onClick={reset}>{t("success.done")}</ActionButton>
    </ScreenShell>
  );
};

export default SuccessScreen;
