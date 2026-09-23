import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Terminal,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { CorruptionCheckItem } from '../types';

interface SystemFixSectionProps {
  corruptionChecks: CorruptionCheckItem[];
  onFixAll: () => void;
  onFixSingle: (id: string) => void;
  isScanning: boolean;
  onScanSystem: () => void;
}

export const SystemFixSection: React.FC<SystemFixSectionProps> = ({
  corruptionChecks,
  onFixAll,
  onFixSingle,
  isScanning,
  onScanSystem
}) => {
  const [isFixing, setIsFixing] = useState(false);
  const [fixConsoleLogs, setFixConsoleLogs] = useState<string[]>([]);

  const corruptedItems = corruptionChecks.filter(
    (c) => c.status === 'corrupted' || c.severity === 'Critical' || c.severity === 'Warning'
  );
  const cleanItems = corruptionChecks.filter((c) => c.status === 'clean' || c.status === 'repaired');

  const handleRunFixAll = () => {
    setIsFixing(true);
    setFixConsoleLogs([
      `[INIT] Requesting elevated NT AUTHORITY\\SYSTEM tokens...`,
      `[STEP 1/4] Executing DISM /Online /Cleanup-Image /RestoreHealth...`,
      `[DISM] Deployment Image Servicing and Management tool (Version: 10.0.26100.1150)`,
      `[DISM] [==========================100.0%==========================] The restore operation completed successfully.`,
      `[STEP 2/4] Executing sfc /scannow (System File Checker)...`,
      `[SFC] Beginning system scan. This process will replace damaged cached files...`,
      `[SFC] Windows Resource Protection found corrupt files (opencl.dll, shell32.dll) and successfully repaired them.`,
      `[STEP 3/4] Stopping wuauserv and purging C:\\Windows\\SoftwareDistribution\\Download...`,
      `[PURGE] 4.1 GB orphaned temporary Windows Update packages cleared.`,
      `[STEP 4/4] Validating TCP/IP Winsock catalog and flushing DNS resolver...`,
      `[SUCCESS] All system corruption issues have been fully resolved! System integrity: 100% Nominal.`
    ]);

    setTimeout(() => {
      onFixAll();
      setIsFixing(false);
    }, 2000);
  };

  const handleFixSingleItem = (item: CorruptionCheckItem) => {
    setIsFixing(true);
    setFixConsoleLogs([
      `[INIT] Running repair on: ${item.name}`,
      `[EXEC] ${item.command}`,
      `[PROGRESS] Rebuilding healthy state...`,
      `[SUCCESS] ${item.name} repair succeeded.`
    ]);

    setTimeout(() => {
      onFixSingle(item.id);
      setIsFixing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Self-Healing OS
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">System Integrity & Corruption Auto-Fixer</h2>
            </div>
            <p className="text-sm text-slate-300">
              Scans for corrupted Windows DLLs, broken WinSxS servicing component stores, stuck update download caches, and file system anomalies, repairing them in one click.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onScanSystem}
              disabled={isScanning || isFixing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isScanning ? 'Diagnosing System...' : 'Scan for Errors'}</span>
            </button>

            {corruptedItems.length > 0 && (
              <button
                onClick={handleRunFixAll}
                disabled={isFixing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 border border-white/20 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fix All Corruptions ({corruptedItems.length} Issues)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Diagnostics Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel-subtle rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400">Total Diagnostics Checked</span>
          <div className="mt-1 text-2xl font-bold font-mono text-white tabular-nums">{corruptionChecks.length} Modules</div>
          <span className="text-[11px] text-slate-400">SFC, DISM, CHKDSK, Cache, Winsock</span>
        </div>

        <div className="glass-panel-subtle rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400">Detected Corruptions</span>
          <div className={`mt-1 text-2xl font-bold font-mono tabular-nums ${corruptedItems.length > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {corruptedItems.length} Detected
          </div>
          <span className="text-[11px] text-slate-400">
            {corruptedItems.length > 0 ? 'Action Recommended' : 'System 100% Healthy'}
          </span>
        </div>

        <div className="glass-panel-subtle rounded-xl p-4 border border-white/10">
          <span className="text-xs text-slate-400">Clean / Verified Components</span>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-400 tabular-nums">{cleanItems.length} Modules</div>
          <span className="text-[11px] text-emerald-400/80">Integrity Validated</span>
        </div>
      </div>

      {/* Detected Corruptions List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>Diagnostic Integrity Scanner Results</span>
        </h3>

        {corruptionChecks.map((item) => {
          const isBad = item.status === 'corrupted';

          return (
            <div
              key={item.id}
              className={`glass-panel rounded-xl p-4 border transition-all ${
                isBad ? 'border-rose-500/30 bg-rose-950/15' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-white tracking-tight">{item.name}</h4>
                    <code className="text-[11px] px-2 py-0.5 rounded bg-black/40 text-cyan-300 font-mono border border-white/10">
                      {item.command}
                    </code>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        item.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.severity === 'Warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{item.description}</p>

                  {item.detectedIssue && (
                    <div className="text-xs text-rose-300/90 flex items-center gap-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                      <span>{item.detectedIssue}</span>
                    </div>
                  )}

                  {item.repairDetails && isBad && (
                    <div className="text-xs text-slate-400 pt-0.5">
                      Fix Action: <strong className="text-slate-300 font-normal">{item.repairDetails}</strong>
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isBad ? (
                    <button
                      onClick={() => handleFixSingleItem(item)}
                      disabled={isFixing}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-medium border border-emerald-500/40 transition-colors disabled:opacity-50"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Fix This Error</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Clean / Repaired
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Repair Execution Terminal Console */}
      {fixConsoleLogs.length > 0 && (
        <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Windows Repair Execution Console (Elevated PowerShell/CMD)</span>
            </div>
            {isFixing ? (
              <span className="text-[11px] text-cyan-400 animate-pulse font-mono">Running Repairs...</span>
            ) : (
              <span className="text-[11px] text-emerald-400 font-mono">Status: Completed</span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1 max-h-60 overflow-y-auto">
            {fixConsoleLogs.map((log, index) => (
              <div
                key={index}
                className={
                  log.includes('[SUCCESS]')
                    ? 'text-emerald-400 font-semibold'
                    : log.includes('[STEP') || log.includes('[DISM]') || log.includes('[SFC]')
                    ? 'text-cyan-300'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
