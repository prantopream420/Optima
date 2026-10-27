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
  const corruptedItems = corruptionChecks.filter(
    (c) => c.status === 'corrupted' || c.severity === 'Critical' || c.severity === 'Warning'
  );
  const cleanItems = corruptionChecks.filter((c) => c.status === 'clean' || c.status === 'repaired');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
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
              disabled={isScanning}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isScanning ? 'Diagnosing System...' : 'Scan for Errors'}</span>
            </button>

            {corruptedItems.length > 0 && (
              <button
                onClick={onFixAll}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-Click Auto-Repair All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Detected Corruptions List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Integrity Scan Results ({corruptedItems.length} Issues Detected, {cleanItems.length} Verified Clean)</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {corruptionChecks.map((check) => {
            const isCorrupt = check.status === 'corrupted' || check.severity === 'Critical' || check.severity === 'Warning';
            return (
              <div
                key={check.id}
                className={`glass-panel rounded-2xl p-4 border transition-all ${
                  isCorrupt
                    ? 'border-rose-500/40 bg-rose-950/10'
                    : 'border-emerald-500/20 bg-emerald-950/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{check.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                          check.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : check.severity === 'Warning'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {check.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{check.description}</p>
                    {check.detectedIssue && (
                      <p className="text-xs text-rose-300 font-mono mt-1">
                        ⚠️ Detected Anomaly: {check.detectedIssue}
                      </p>
                    )}
                    <div className="text-[11px] text-slate-400 font-mono mt-1 bg-black/30 px-2 py-1 rounded inline-block">
                      Command: {check.command}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isCorrupt ? (
                      <button
                        onClick={() => onFixSingle(check.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-semibold transition-colors shadow-sm"
                      >
                        Fix Now
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Clean</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
