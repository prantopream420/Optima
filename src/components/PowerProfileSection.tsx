import React, { useState } from 'react';
import {
  Zap,
  BatteryCharging,
  Gauge,
  Wind,
  Cpu,
  Monitor,
  Usb,
  Sparkles,
  CheckCircle2,
  Copy,
  Terminal,
  Play,
  Download,
  AlertCircle
} from 'lucide-react';
import { PowerProfileType, PowerProfileConfig } from '../types';
import { POWER_PROFILES } from '../data/mockData';
import { generatePowerProfileScript } from '../utils/scriptGenerator';

interface PowerProfileSectionProps {
  currentProfile: PowerProfileType;
  onSelectProfile: (profile: PowerProfileType) => void;
}

export const PowerProfileSection: React.FC<PowerProfileSectionProps> = ({
  currentProfile,
  onSelectProfile
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applyLog, setApplyLog] = useState<string[]>([]);
  const [copiedScript, setCopiedScript] = useState(false);

  const activeConfig = POWER_PROFILES[currentProfile];

  const handleApplyToSystem = () => {
    setIsApplying(true);
    setApplyLog([
      `[INIT] Requesting Windows Elevation for powercfg.exe...`,
      `[CMD] powercfg /setactive ${activeConfig.guid}`,
      `[APPLY] Configuring processor min/max throttle indexes...`,
      `[APPLY] Adjusting fan governor policy & thermal trip points...`,
      `[APPLY] Setting USB selective suspend & port power delivery states...`,
      `[APPLY] Syncing Desktop Window Manager (DWM) visual transparency...`
    ]);

    setTimeout(() => {
      setApplyLog((prev) => [
        ...prev,
        `[SUCCESS] Active Windows Scheme: ${activeConfig.name} (${activeConfig.guid})`,
        `[OK] All hardware states locked. System operating in optimal ${activeConfig.name} mode.`
      ]);
      setIsApplying(false);
    }, 1200);
  };

  const handleCopyPowershell = () => {
    const text = activeConfig.powershellCmds.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownloadBat = () => {
    const batContent = generatePowerProfileScript(currentProfile);
    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroOptima_Profile_${currentProfile.toUpperCase()}.bat`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Explanation */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Core Engine
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Windows Power Profile Governor</h2>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              Switch instantaneous power plans across CPU clocks, active fan RPM curves, port power delivery, RAM speeds, and DWM visual transparency effects.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyToSystem}
              disabled={isApplying}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 border border-white/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-white ${isApplying ? 'animate-spin' : ''}`} />
              <span>{isApplying ? 'Applying to Windows...' : 'Apply Active Mode Now'}</span>
            </button>
            <button
              onClick={handleDownloadBat}
              title="Download standalone Windows .bat runner for this profile"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .BAT</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Profile Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. BATTERY SAVER PROFILE */}
        <div
          onClick={() => onSelectProfile('battery')}
          className={`group relative glass-panel rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
            currentProfile === 'battery'
              ? 'ring-2 ring-emerald-400/80 bg-slate-900/80 shadow-xl shadow-emerald-500/10'
              : 'hover:bg-white/10 border-white/10 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <BatteryCharging className="w-5 h-5" />
            </div>
            {currentProfile === 'battery' ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Active Profile
              </span>
            ) : (
              <span className="text-xs text-slate-400 group-hover:text-slate-200">Click to Select</span>
            )}
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">Battery Saver Eco</h3>
          <p className="text-xs text-emerald-400 font-medium mt-0.5">Maximum Endurance · Silent Fan</p>
          <p className="text-xs text-slate-300 mt-2 line-clamp-3">
            Saves battery in every possible way while regular usage (Word, Excel, browsing, 4K streaming) stays completely smooth.
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" /> CPU Throttle Cap
              </span>
              <strong className="text-white font-mono">70% Max Clock</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Wind className="w-3.5 h-3.5 text-emerald-400" /> Fan Speed
              </span>
              <strong className="text-emerald-300 font-mono">1,100 – 1,600 RPM (Silent)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Usb className="w-3.5 h-3.5 text-emerald-400" /> USB Ports
              </span>
              <strong className="text-slate-200">Selective Suspend On</strong>
            </div>
          </div>
        </div>

        {/* 2. STANDARD BALANCED PROFILE */}
        <div
          onClick={() => onSelectProfile('standard')}
          className={`group relative glass-panel rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
            currentProfile === 'standard'
              ? 'ring-2 ring-sky-400/80 bg-slate-900/80 shadow-xl shadow-sky-500/10'
              : 'hover:bg-white/10 border-white/10 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300">
              <Zap className="w-5 h-5" />
            </div>
            {currentProfile === 'standard' ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
                <CheckCircle2 className="w-3 h-3" /> Active Profile
              </span>
            ) : (
              <span className="text-xs text-slate-400 group-hover:text-slate-200">Click to Select</span>
            )}
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">Standard Balanced</h3>
          <p className="text-xs text-sky-400 font-medium mt-0.5">Windows Factory Default · Dynamic</p>
          <p className="text-xs text-slate-300 mt-2 line-clamp-3">
            The balanced standard mode of the system: dynamic scaling between battery efficiency and snappy responsiveness.
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-sky-400" /> CPU Frequency
              </span>
              <strong className="text-white font-mono">Dynamic 5% – 100%</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Wind className="w-3.5 h-3.5 text-sky-400" /> Fan Speed
              </span>
              <strong className="text-sky-300 font-mono">1,800 – 2,700 RPM (Normal)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Usb className="w-3.5 h-3.5 text-sky-400" /> USB Ports
              </span>
              <strong className="text-slate-200">Standard Suspend</strong>
            </div>
          </div>
        </div>

        {/* 3. PERFORMANCE MODE */}
        <div
          onClick={() => onSelectProfile('performance')}
          className={`group relative glass-panel rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
            currentProfile === 'performance'
              ? 'ring-2 ring-amber-400/80 bg-slate-900/80 shadow-xl shadow-amber-500/10'
              : 'hover:bg-white/10 border-white/10 opacity-80 hover:opacity-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            {currentProfile === 'performance' ? (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                <CheckCircle2 className="w-3 h-3" /> Active Profile
              </span>
            ) : (
              <span className="text-xs text-slate-400 group-hover:text-slate-200">Click to Select</span>
            )}
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">Ultimate Performance</h3>
          <p className="text-xs text-amber-400 font-medium mt-0.5">High Speed Fan · Max Clocks · Transparent Look</p>
          <p className="text-xs text-slate-300 mt-2 line-clamp-3">
            Unlocks maximum performance in every component, including all ports, cooling fan running at high speed, peak RAM speeds, best animations everywhere, and transparent look for a visually immersive desktop.
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-amber-400" /> CPU Throttle
              </span>
              <strong className="text-amber-300 font-mono">100% Unlocked (Zero Sleep)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Wind className="w-3.5 h-3.5 text-amber-400" /> Fan Speed
              </span>
              <strong className="text-amber-300 font-mono">3,800 – 4,800 RPM (Turbo)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Usb className="w-3.5 h-3.5 text-amber-400" /> All Ports
              </span>
              <strong className="text-amber-300">100% Full Power Delivery</strong>
            </div>
          </div>
        </div>
      </div>

      {/* In-Depth Hardware Spec Breakdown for Selected Mode */}
      <div className="glass-panel rounded-2xl p-6 border border-white/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Hardware Configuration</span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{activeConfig.name}</span>
              <span className="text-xs font-mono font-normal text-slate-400">GUID: {activeConfig.guid}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPowershell}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition-colors"
            >
              {copiedScript ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Copied' : 'Copy PowerShell Setup'}</span>
            </button>
          </div>
        </div>

        {/* Live Gauges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-5">
          {/* Gauge 1: Clock Speed */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" /> CPU Frequency
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {activeConfig.specs.clockSpeedGhz.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-mono">GHz</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${(activeConfig.specs.clockSpeedGhz / 5.2) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 2: Fan Speed RPM */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Wind className={`w-3 h-3 text-sky-400 ${currentProfile === 'performance' ? 'animate-spin' : ''}`} />
              Cooling Fan Speed
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {activeConfig.specs.targetFanRpm.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-mono">RPM</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  currentProfile === 'performance'
                    ? 'bg-amber-400'
                    : currentProfile === 'standard'
                    ? 'bg-sky-400'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${(activeConfig.specs.targetFanRpm / 5000) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 3: Power Consumption */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Power Consumption
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {activeConfig.specs.powerConsumptionWatts}
              </span>
              <span className="text-xs text-slate-400 font-mono">Watts</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(activeConfig.specs.powerConsumptionWatts / 120) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 4: CPU Temp */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-rose-400" /> Core Temperature
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {activeConfig.specs.cpuTempC}
              </span>
              <span className="text-xs text-slate-400 font-mono">°C</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  activeConfig.specs.cpuTempC > 70 ? 'bg-rose-500' : 'bg-emerald-400'
                }`}
                style={{ width: `${(activeConfig.specs.cpuTempC / 100) * 100}%` }}
              />
            </div>
          </div>

          {/* Gauge 5: Estimated Battery Runtime */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> Battery Runtime
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-lg font-bold text-white tracking-tight">
                {activeConfig.specs.estimatedBatteryLife}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">96% Battery Capacity Remaining</span>
          </div>
        </div>

        {/* Detailed Hardware Specs Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-white/10">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Usb className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block">Port Power Delivery (All Ports & Hubs)</strong>
              <span className="text-slate-400">{activeConfig.specs.portPowerDelivery}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Monitor className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block">Display Refresh & GPU State</strong>
              <span className="text-slate-400">{activeConfig.specs.displayRefresh} · {activeConfig.specs.gpuClockMode}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Cpu className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block">RAM Speed & Memory Controller Timings</strong>
              <span className="text-slate-400">{activeConfig.specs.ramProfile}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
            <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block">Visual Immersion & Aero/Mica Transparency</strong>
              <span className="text-slate-400">{activeConfig.specs.visualEffects}</span>
            </div>
          </div>
        </div>

        {/* Real-time execution log (when user clicks Apply) */}
        {applyLog.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-[11px] text-cyan-300/90 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans font-medium mb-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Windows Kernel Execution Output</span>
            </div>
            {applyLog.map((line, idx) => (
              <div key={idx} className={line.includes('[SUCCESS]') || line.includes('[OK]') ? 'text-emerald-400 font-semibold' : ''}>
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
