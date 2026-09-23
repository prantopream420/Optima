import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  Download,
  Copy,
  Terminal,
  AlertCircle,
  Sparkles,
  Info,
  ShieldAlert
} from 'lucide-react';
import { HiddenTweak } from '../types';

interface HiddenTweaksSectionProps {
  tweaks: HiddenTweak[];
  onToggleTweak: (tweakId: string) => void;
  onApplyAllTweaks: () => void;
}

export const HiddenTweaksSection: React.FC<HiddenTweaksSectionProps> = ({
  tweaks,
  onToggleTweak,
  onApplyAllTweaks
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTweak, setSelectedTweak] = useState<HiddenTweak | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const categories = ['All', 'Performance', 'UI & Visuals', 'Privacy', 'System Power'];

  const filteredTweaks = activeCategory === 'All'
    ? tweaks
    : tweaks.filter((t) => t.category === activeCategory);

  const enabledCount = tweaks.filter((t) => t.enabled).length;

  const handleToggle = (id: string, name: string, willBeEnabled: boolean) => {
    onToggleTweak(id);
    setAppliedNotification(`Updated "${name}" in Windows Registry: ${willBeEnabled ? 'Enabled' : 'Disabled'}`);
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const handleExportReg = () => {
    let regContent = 'Windows Registry Editor Version 5.00\r\n\r\n';
    tweaks.filter((t) => t.enabled).forEach((t) => {
      regContent += `; ${t.name}\r\n[${t.registryPath}]\r\n"${t.valueName}"=dword:${t.enabledValue === 1 ? '00000001' : '00000000'}\r\n\r\n`;
    });

    const blob = new Blob([regContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AeroOptima_Tweaks.reg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportBat = () => {
    let batContent = `@echo off\r\n:: AeroOptima Pro Registry Tweaks\r\nnet session >nul 2>&1 || (powershell -Command "Start-Process '%~f0' -Verb runAs" & exit /b)\r\n\r\n`;
    tweaks.filter((t) => t.enabled).forEach((t) => {
      batContent += `echo [*] Applying ${t.name}...\r\nreg add "${t.registryPath}" /v "${t.valueName}" /t REG_DWORD /d ${t.enabledValue} /f >nul\r\n\r\n`;
    });
    batContent += `echo [SUCCESS] All selected hidden Windows settings applied!\r\npause\r\n`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Apply_AeroOptima_Tweaks.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Registry Engine
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Hidden Windows Settings & Feature Enabler</h2>
            </div>
            <p className="text-sm text-slate-300">
              Unlocks hidden Windows 10/11 operating system features, removes telemetry tracking, restores classic context menus, and enables extreme gaming optimizations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportReg}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .REG File</span>
            </button>
            <button
              onClick={handleExportBat}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold border border-cyan-400/30 shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .BAT Runner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applied Notification */}
      {appliedNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* Categories & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-white/20 text-white border border-white/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-300 font-mono">
          <span>Active Tweaks: <strong className="text-cyan-300">{enabledCount}</strong> / {tweaks.length}</span>
        </div>
      </div>

      {/* Tweaks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTweaks.map((tweak) => (
          <div
            key={tweak.id}
            className={`glass-panel rounded-2xl p-5 border transition-all ${
              tweak.enabled ? 'border-cyan-500/30 bg-cyan-950/15' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                    {tweak.category}
                  </span>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{tweak.name}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{tweak.description}</p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => handleToggle(tweak.id, tweak.name, !tweak.enabled)}
                role="switch"
                aria-checked={tweak.enabled}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  tweak.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    tweak.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Impact & Registry Details */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex items-start gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>Impact: <strong className="text-white font-normal">{tweak.impact}</strong></span>
              </div>

              <div className="p-2 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-slate-400 break-all select-all">
                <span className="text-cyan-400">{tweak.registryPath}</span>
                <span className="text-slate-500"> → </span>
                <span className="text-amber-300">{tweak.valueName}</span>
                <span className="text-slate-500"> = </span>
                <span className="text-emerald-400">{tweak.enabled ? String(tweak.enabledValue) : String(tweak.disabledValue)}</span>
              </div>

              {tweak.requiresRestart && (
                <div className="text-[10px] text-amber-300/80 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Requires explorer.exe or system restart to take effect</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
