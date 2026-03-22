import React from "react";
import { ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
  { code: "fr", label: "FR" },
] as const;

const QOE_TYPES = [
  { value: "filter_hp47", label: "filter_hp47" },
  { value: "filter_tof", label: "filter_tof" },
  { value: "dropcable", label: "dropcable" },
  { value: "dice", label: "dice" },
  { value: "modem_deregs", label: "modem_deregs" },
  { value: "broken_hardware_modem", label: "broken_hardware_modem" },
  { value: "coverage", label: "coverage" },
] as const;

const DiagnosticPanel: React.FC = () => {
  const { panelInputs, setPanelInputs } = useDiagnostic();
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  const toggleQoe = (type: string) => {
    setPanelInputs((prev) => ({
      ...prev,
      selectedQoe: prev.selectedQoe.includes(type)
        ? prev.selectedQoe.filter((t) => t !== type)
        : [...prev.selectedQoe, type],
    }));
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-card border-b border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <span>🛠 Diagnostic Input Panel</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-4 bg-card border-b border-border space-y-4">
          {/* Language selector */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language</p>
            <div className="flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    i18n.language === lang.code
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* ELT */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">ELT (Service Moment)</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{panelInputs.eltEnabled ? "On" : "Off"}</span>
              <Switch checked={panelInputs.eltEnabled} onCheckedChange={(v) => setPanelInputs((p) => ({ ...p, eltEnabled: v }))} />
            </div>
          </div>

          {/* Modem */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{t("diagnosticPanel.modemInService")}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{panelInputs.modemInService ? t("diagnosticPanel.modemOnline") : t("diagnosticPanel.modemOffline")}</span>
              <Switch checked={panelInputs.modemInService} onCheckedChange={(v) => setPanelInputs((p) => ({ ...p, modemInService: v }))} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{t("diagnosticPanel.modemWifiOn")}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{panelInputs.modemWifiOn ? t("diagnosticPanel.on") : t("diagnosticPanel.off")}</span>
              <Switch checked={panelInputs.modemWifiOn} onCheckedChange={(v) => setPanelInputs((p) => ({ ...p, modemWifiOn: v }))} />
            </div>
          </div>

          {/* Network toggles */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("diagnosticPanel.network")}</p>
            {[
              { label: t("diagnosticPanel.incidentActive"), key: "incidentActive" as const },
              { label: t("diagnosticPanel.changeActive"), key: "changeActive" as const },
              { label: t("diagnosticPanel.problemActive"), key: "problemActive" as const },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.label}</span>
                <Switch
                  checked={panelInputs[item.key]}
                  onCheckedChange={(v) => setPanelInputs((p) => ({ ...p, [item.key]: v }))}
                />
              </div>
            ))}
          </div>

          {/* QOE multi-select */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("diagnosticPanel.qoeTypes")}</p>
            <div className="grid grid-cols-2 gap-2">
              {QOE_TYPES.map((qoe) => (
                <label
                  key={qoe.value}
                  className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <Checkbox
                    checked={panelInputs.selectedQoe.includes(qoe.value)}
                    onCheckedChange={() => toggleQoe(qoe.value)}
                  />
                  <span className="text-xs font-medium text-foreground">{qoe.label}</span>
                </label>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">{t("diagnosticPanel.selectSentiment")}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DiagnosticPanel;
