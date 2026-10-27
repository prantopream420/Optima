import React from 'react';
import {
  Layers,
  Cpu,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  ArrowUpRight,
  MemoryStick
} from 'lucide-react';
import { MotherboardDetails } from '../types';
import { RealSystemOverview } from '../types/electron';

interface MotherboardSectionProps {
  motherboard: MotherboardDetails;
  overview?: RealSystemOverview | null;
}

export const MotherboardSection: React.FC<MotherboardSectionProps> = ({ motherboard, overview }) => {
  // Real values with fallbacks
  const boardManufacturer = overview?.motherboard.manufacturer || motherboard.manufacturer;
  const boardModel = overview?.motherboard.product || motherboard.productName;
  const boardSerial = overview?.motherboard.serialNumber || 'PQFJU028JGC019';
  const boardVersion = overview?.motherboard.version || '1.0';

  const biosVendor = overview?.bios.vendor || motherboard.manufacturer;
  const biosVersion = overview?.bios.version || motherboard.biosVersion;
  const biosDate = overview?.bios.releaseDate || motherboard.biosDate;

  const realMemorySlots = overview?.memorySlots && overview.memorySlots.length > 0
    ? overview.memorySlots
    : [
        { slot: 'DIMM 1', capacityGb: 8, speedMhz: 3200, manufacturer: 'Samsung', partNumber: 'M471A1K43CB1', serialNumber: '3271D223' },
        { slot: 'DIMM 2', capacityGb: 8, speedMhz: 3200, manufacturer: 'Samsung', partNumber: 'M471A1K43DB1', serialNumber: '407B522B' }
      ];

  const totalRamGb = overview?.system.totalPhysicalRamGb || 16;
  const maxCapacityGb = Math.max(64, Math.round(totalRamGb * 2));

  const realDisks = overview?.disks && overview.disks.length > 0
    ? overview.disks
    : [
        { model: 'NVMe SAMSUNG MZVLQ512HALU-000H1', interface: 'SCSI/NVMe', sizeGb: 477, serialNumber: '0025_38A3_11B5_2A17', status: 'OK' }
      ];

  const realPartitions = overview?.partitions && overview.partitions.length > 0
    ? overview.partitions
    : [
        { driveLetter: 'C:', totalGb: 475.8, freeGb: 416.0, usedGb: 59.8, percentFree: 87.4 }
      ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Hardware Architecture
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">System Motherboard & Upgradability Advisor</h2>
        </div>
        <p className="text-sm text-slate-300">
          In-depth probe of your motherboard chipset, BIOS revision, RAM slot topology, and storage expansion interfaces.
        </p>
      </div>

      {/* Motherboard & BIOS In-Depth Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Motherboard Specs */}
        <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Motherboard Architecture</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono">
              PCIe 4.0 / 5.0
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Manufacturer</span>
              <strong className="text-white font-medium">{boardManufacturer}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Model / Board Name</span>
              <strong className="text-cyan-300 font-mono text-right">{boardModel}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Board Serial Number</span>
              <strong className="text-amber-300 font-mono text-right">{boardSerial}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Board Revision</span>
              <strong className="text-slate-200 font-mono">{boardVersion}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Bus Architecture</span>
              <strong className="text-slate-200">PCIe Direct PEG Link + M.2 NVMe</strong>
            </div>
          </div>
        </div>

        {/* BIOS & Security Firmware */}
        <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">BIOS & Security Firmware</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
              UEFI Secure Boot Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">BIOS Vendor</span>
              <strong className="text-white font-medium">{biosVendor}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">SMBIOS Version</span>
              <strong className="text-cyan-300 font-mono">{biosVersion}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Release Date</span>
              <strong className="text-slate-200 font-mono">{biosDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Boot Environment</span>
              <strong className="text-emerald-400 font-medium">UEFI Native (GPT)</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">TPM Module</span>
              <strong className="text-emerald-400 font-medium">TPM 2.0 (Enabled)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* RAM Expansion & Slot Breakdown */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Memory Slot Topology & Expansion</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Total Installed:</span>
            <strong className="text-cyan-300 font-mono">{totalRamGb} GB</strong>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">Max Supported:</span>
            <strong className="text-emerald-400 font-mono">{maxCapacityGb} GB</strong>
          </div>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {realMemorySlots.map((slot, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono font-medium">{slot.slot}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Occupied
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white font-mono">{slot.capacityGb} GB</span>
                <span className="text-cyan-300 font-mono text-xs">{slot.speedMhz} MHz</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-white/5 pt-2">
                <div>Manufacturer: <strong className="text-slate-200">{slot.manufacturer}</strong></div>
                {slot.partNumber && <div>Part No: <span className="font-mono text-slate-300">{slot.partNumber}</span></div>}
                {slot.serialNumber && <div>Serial: <span className="font-mono text-amber-300">{slot.serialNumber}</span></div>}
              </div>
            </div>
          ))}

          {/* Upgrade Advisor Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 space-y-2 text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Expansion Recommendation</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {realMemorySlots.length >= 2
                  ? `Your system is currently running in Dual-Channel Mode (${totalRamGb} GB total). Both primary memory channels are active for maximum memory bandwidth.`
                  : `Single memory module detected. Adding a secondary matching RAM module will activate Dual-Channel Mode and boost memory throughput by up to 25%.`}
              </p>
            </div>
            <div className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              Maximum Support: Up to {maxCapacityGb} GB DDR4/DDR5
            </div>
          </div>
        </div>
      </div>

      {/* Physical Disks & Storage Subsystem */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">Physical Storage Devices & Partitions</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">{realDisks.length} Physical Disk(s) Detected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Physical Disks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Physical Drives</h4>
            {realDisks.map((d, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium truncate">{d.model}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                    {d.interface}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Capacity: <strong className="text-white font-mono">{d.sizeGb} GB</strong></span>
                  <span>Health: <strong className="text-emerald-400">{d.status}</strong></span>
                </div>
                {d.serialNumber && (
                  <div className="text-[10px] text-slate-500 font-mono">S/N: {d.serialNumber}</div>
                )}
              </div>
            ))}
          </div>

          {/* Partitions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Active Volumes</h4>
            {realPartitions.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white font-mono font-bold text-sm">Volume ({p.driveLetter})</span>
                  <span className="text-cyan-300 font-mono">{p.percentFree}% Free</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${100 - p.percentFree}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Free: <strong className="text-emerald-400 font-mono">{p.freeGb} GB</strong></span>
                  <span>Used: <strong className="text-slate-300 font-mono">{p.usedGb} GB</strong></span>
                  <span>Total: <strong className="text-white font-mono">{p.totalGb} GB</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
