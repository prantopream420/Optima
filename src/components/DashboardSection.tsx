import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Cpu,
  Monitor,
  HardDrive,
  BatteryCharging,
  Wind,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Layers,
  Key
} from 'lucide-react';
import { PowerProfileType, MicrosoftAppStatus } from '../types';
import { MICROSOFT_APPS } from '../data/mockData';

interface DashboardSectionProps {
  currentProfile: PowerProfileType;
  driverLogs: { id: string; timestamp: string; message: string; type: 'info' | 'success' | 'warn' }[];
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  currentProfile,
  driverLogs
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Productivity' | 'Runtime' | 'Core OS' | 'Gaming'>('All');

  const filteredApps = filterType === 'All'
    ? MICROSOFT_APPS
    : MICROSOFT_APPS.filter((a) => a.category === filterType);

  return (
    <div className="space-y-6">
      {/* Top Health Overview & OS Version Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Overall System Health Score */}
        <div className="glass-panel rounded-2xl p-5 border border-white/15 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">System Diagnostics</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Optimal State
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white font-mono tracking-tight">98%</span>
              <span className="text-sm font-semibold text-emerald-400">System Health Score</span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Kernel stability verified. Drivers are cryptographically signed and thermals are within safe manufacturer limits.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Battery Wear Level</span>
              <p className="text-white font-mono font-semibold">3.8% (96.2% Health)</p>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">NVMe SMART Life</span>
              <p className="text-white font-mono font-semibold">99% Remaining</p>
            </div>
          </div>
        </div>

        {/* Windows Version & Genuine Activation Status */}
        <div className="glass-panel rounded-2xl p-5 border border-white/15 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Windows OS & Licensing Environment</h3>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Key className="w-3 h-3 text-emerald-400" /> Activated (Digital License)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-xs">
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 text-[11px] block">Edition</span>
                <strong className="text-white text-sm font-medium">Windows 11 Pro (64-bit)</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Version & OS Build</span>
                <span className="text-cyan-300 font-mono">24H2 · Build 26100.1742</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Feature Experience Pack</span>
                <span className="text-slate-300 font-mono">1000.26100.1000.0</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400 text-[11px] block">Activation Channel</span>
                <span className="text-white font-medium">Retail Channel · Digital Entitlement</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Core Isolation (HVCI)</span>
                <span className="text-emerald-400 font-medium">Memory Integrity Active</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Hardware Security</span>
                <span className="text-slate-300">TPM 2.0 Enabled · Secure Boot On</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Hardware Performance Metrics Grid */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <h3 className="text-sm font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Real-Time Performance Telemetry & Hardware Gauges</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Metric 1: CPU */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>CPU Load</span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">18%</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">16 Threads · 3.4 GHz</div>
          </div>

          {/* Metric 2: GPU */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>GPU Load</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">12%</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">RTX 4070 · 48°C</div>
          </div>

          {/* Metric 3: RAM */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Memory</span>
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">10.4 GB</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">of 32 GB DDR5-5600</div>
          </div>

          {/* Metric 4: Storage */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>NVMe Storage</span>
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">412 GB</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">Free of 1,000 GB</div>
          </div>

          {/* Metric 5: Fan RPM */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Cooling Fan</span>
              <Wind className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">
              {currentProfile === 'performance' ? '4,200' : currentProfile === 'standard' ? '2,150' : '1,250'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">RPM ({currentProfile})</div>
          </div>

          {/* Metric 6: Battery */}
          <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Battery State</span>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold font-mono text-white">96%</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">Discharging (Nominal)</div>
          </div>
        </div>
      </div>

      {/* Installed Microsoft Apps Status & Activation Details */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Installed Microsoft Applications & Activation Status</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live license validation, subscription states, and runtime components installed on this machine.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['All', 'Productivity', 'Runtime', 'Core OS', 'Gaming'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  filterType === cat
                    ? 'bg-white/20 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="glass-panel-subtle rounded-xl p-3.5 border border-white/10 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-semibold text-white tracking-tight leading-snug">{app.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {app.activationStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                <div>
                  <span className="block text-[10px] text-slate-400">License / Channel</span>
                  <span className="text-slate-300 truncate block">{app.licenseType}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Version</span>
                  <span className="text-cyan-300 font-mono truncate block">{app.version}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Driver & Hardware Activity Logs */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Recent Driver & System Activity Logs</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Event Tracer</span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {driverLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono"
            >
              <span className="text-slate-400 shrink-0 text-[11px]">{log.timestamp}</span>
              <span className="text-slate-500 shrink-0">·</span>
              <span
                className={`truncate ${
                  log.type === 'success'
                    ? 'text-emerald-300'
                    : log.type === 'warn'
                    ? 'text-amber-300'
                    : 'text-slate-300'
                }`}
              >
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
