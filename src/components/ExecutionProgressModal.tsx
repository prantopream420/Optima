import React, { useEffect, useRef } from 'react';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  X,
  RefreshCw,
  Zap,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Copy
} from 'lucide-react';

export interface ExecutionModalState {
  isOpen: boolean;
  actionId: string;
  title: string;
  description?: string;
  logs: string[];
  isDone: boolean;
  success?: boolean;
  startTime: number;
}

interface ExecutionProgressModalProps {
  state: ExecutionModalState;
  onClose: () => void;
}

export const ExecutionProgressModal: React.FC<ExecutionProgressModalProps> = ({ state, onClose }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = React.useState('00:00.0');
  const [copied, setCopied] = React.useState(false);

  // Auto-scroll terminal
  useEffect(() => {
    if (state.isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.logs, state.isOpen]);

  // Elapsed timer
  useEffect(() => {
    if (!state.isOpen) return;
    if (state.isDone) return;

    const interval = setInterval(() => {
      const diffMs = Date.now() - state.startTime;
      const totalSec = Math.floor(diffMs / 1000);
      const min = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const sec = (totalSec % 60).toString().padStart(2, '0');
      const dec = Math.floor((diffMs % 1000) / 100);
      setElapsed(`${min}:${sec}.${dec}`);
    }, 100);

    return () => clearInterval(interval);
  }, [state.isOpen, state.isDone, state.startTime]);

  if (!state.isOpen) return null;

  // Compute progress approximation from logs
  const totalSteps = state.logs.filter((l) => l.includes('[STEP') || l.includes('[1/') || l.includes('[2/') || l.includes('[3/') || l.includes('[4/')).length || 1;
  const progressPercent = state.isDone ? 100 : Math.min(92, Math.max(15, totalSteps * 25));

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(state.logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border ${
                state.isDone
                  ? state.success !== false
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
              }`}
            >
              {state.isDone ? (
                state.success !== false ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )
              ) : (
                <RefreshCw className="w-5 h-5 animate-spin" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">{state.title}</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    state.isDone
                      ? state.success !== false
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse'
                  }`}
                >
                  {state.isDone ? (state.success !== false ? 'COMPLETED' : 'FINISHED WITH WARNING') : 'EXECUTING LIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {state.description || 'Windows OS hardware governor active dispatch'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Animated Progress Bar */}
        <div className="px-5 pt-3 pb-1 bg-slate-950/40">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="w-3.5 h-3.5" />
              <span>Real-Time Execution Pipeline</span>
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-white/10">
            <div
              className={`h-full transition-all duration-300 ease-out rounded-full ${
                state.isDone
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Live Streaming Terminal */}
        <div className="flex-1 p-5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>STDOUT STREAM · POWERSHELL EXECUTION</span>
            </div>
            <button
              onClick={handleCopyLogs}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? 'Copied' : 'Copy Logs'}</span>
            </button>
          </div>

          <div className="flex-1 min-h-[220px] max-h-[340px] bg-black/85 rounded-xl border border-white/10 p-3.5 font-mono text-xs overflow-y-auto space-y-1 select-text">
            {state.logs.length === 0 ? (
              <div className="text-slate-500 italic">Initializing execution worker pipeline...</div>
            ) : (
              state.logs.map((log, index) => {
                let color = 'text-slate-300';
                if (log.includes('[SUCCESS]') || log.includes('[FINISHED]')) color = 'text-emerald-400 font-semibold';
                else if (log.includes('[STEP') || log.includes('[1/') || log.includes('[2/') || log.includes('[3/') || log.includes('[4/')) color = 'text-amber-300 font-semibold';
                else if (log.includes('[ERROR]') || log.includes('[WARN]')) color = 'text-rose-400 font-semibold';
                else if (log.includes('[INIT]') || log.includes('[CMD]')) color = 'text-cyan-300';
                return (
                  <div key={index} className={`leading-relaxed break-words ${color}`}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-slate-950/60 text-xs">
          <div className="flex items-center gap-3 font-mono text-slate-400">
            <span>Elapsed: <strong className="text-slate-200">{elapsed}</strong></span>
            <span>·</span>
            <span>Status: <strong className={state.isDone ? 'text-emerald-400' : 'text-cyan-400'}>{state.isDone ? 'Ready' : 'Streaming'}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-1.5 rounded-lg font-medium text-xs transition-all ${
                state.isDone
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              {state.isDone ? 'Done / Dismiss' : 'Run in Background'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
