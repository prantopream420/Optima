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
  ArrowUpRight
} from 'lucide-react';
import { MotherboardDetails } from '../types';

interface MotherboardSectionProps {
  motherboard: MotherboardDetails;
}

export const MotherboardSection: React.FC<MotherboardSectionProps> = ({ motherboard }) => {
  const { ramSpecs, storageSpecs } = motherboard;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Hardware Architecture
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">System Motherboard & Upgradability Advisor</h2>
        </div>
        <p className="text-sm text-slate-300">
          Simplified breakdown of your motherboard chipset, BIOS version, memory slots, and maximum supported RAM & SSD expansion limits.
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
              {motherboard.pcieGeneration}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Manufacturer</span>
              <strong className="text-white font-medium">{motherboard.manufacturer}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Model / Board Name</span>
              <strong className="text-cyan-300 font-mono text-right">{motherboard.productName}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">System Chipset</span>
              <strong className="text-white font-mono">{motherboard.chipset}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Form Factor</span>
              <strong className="text-slate-200">{motherboard.formFactor}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Bus Architecture</span>
              <strong className="text-slate-200">PCIe 5.0 (x16 PEG + 4x M.2 Direct Link)</strong>
            </div>
          </div>
        </div>

        {/* BIOS & Security Firmware */}
        <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">BIOS & Firmware Security</h3>
            </div>
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> TPM 2.0 Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">BIOS Version</span>
              <strong className="text-sky-300 font-mono">{motherboard.biosVersion}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Release Date</span>
              <strong className="text-slate-200 font-mono">{motherboard.biosDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Firmware Boot Mode</span>
              <strong className="text-slate-200">{motherboard.uefiMode}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Secure Boot Status</span>
              <span className="text-emerald-400 font-medium">Enabled (Active Hardware Guard)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Resizable BAR (ReBAR)</span>
              <span className="text-cyan-300 font-medium">Enabled (Full VRAM addressing)</span>
            </div>
          </div>
        </div>
      </div>

      {/* RAM UPGRADABILITY MATRIX */}
      <div className="glass-panel rounded-2xl p-6 border border-white/15 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">System RAM Expansion & Upgradability Limits</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                2 Slots Available
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Detailed physical slot configuration, maximum supported memory limits, and recommended upgrade kits.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">Installed</span>
              <strong className="text-white text-sm">32 GB</strong>
            </div>
            <div className="text-slate-600">/</div>
            <div>
              <span className="text-slate-400 text-[10px] block">Max Supported</span>
              <strong className="text-cyan-300 text-sm">{ramSpecs.maxSupportedCapacityGb} GB</strong>
            </div>
          </div>
        </div>

        {/* Visual RAM Slot Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ramSpecs.slots.map((slot) => (
            <div
              key={slot.slotNumber}
              className={`p-4 rounded-xl border transition-all ${
                slot.occupied
                  ? 'glass-panel-subtle border-cyan-500/30 bg-cyan-950/20'
                  : 'glass-panel-subtle border-dashed border-white/20 bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300">DIMM Slot #{slot.slotNumber}</span>
                {slot.occupied ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                    Occupied
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                    Empty / Ready
                  </span>
                )}
              </div>

              {slot.occupied ? (
                <div className="space-y-1 text-xs">
                  <div className="text-lg font-bold text-white font-mono">{slot.capacityGb} GB DDR5</div>
                  <div className="text-cyan-300 font-mono text-[11px]">{slot.speedMhz} MHz · {slot.manufacturer}</div>
                  <div className="text-[10px] text-slate-400 truncate">{slot.partNumber}</div>
                </div>
              ) : (
                <div className="py-2 text-center text-xs text-slate-400">
                  <span className="block text-slate-300 font-medium">+ Ready for Expansion</span>
                  <span className="text-[11px] text-slate-400">Supports up to 32GB DDR5-5600/6000</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RAM Capability & Upgrade Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white block font-semibold">Supported Memory Speeds & Technology</strong>
            <div className="flex flex-wrap gap-1.5">
              {ramSpecs.supportedSpeeds.map((spd) => (
                <span key={spd} className="px-2 py-0.5 rounded bg-black/40 text-slate-300 font-mono text-[11px] border border-white/10">
                  {spd}
                </span>
              ))}
            </div>
            <p className="text-slate-400 text-[11px]">
              Architecture: {ramSpecs.channelMode} · Intel XMP 3.0 & AMD EXPO One-Click Tuning Supported.
            </p>
          </div>

          <div className="space-y-2 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <strong className="text-emerald-300 block font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Simplified Upgrade Recommendation
            </strong>
            <p className="text-slate-300 text-xs leading-relaxed">
              {ramSpecs.upgradeAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* STORAGE & SSD EXPANSION MATRIX */}
      <div className="glass-panel rounded-2xl p-6 border border-white/15 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">M.2 NVMe & SSD Storage Expansion Slots</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-500/30">
                2 M.2 Slots Available
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect primary OS drive performance and view empty PCIe Gen 4.0 / 5.0 high-speed expansion slots.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">M.2 Slots</span>
              <strong className="text-white text-sm">3 Total (1 Used)</strong>
            </div>
            <div className="text-slate-600">/</div>
            <div>
              <span className="text-slate-400 text-[10px] block">SATA III 6G</span>
              <strong className="text-cyan-300 text-sm">4 Ports (4 Free)</strong>
            </div>
          </div>
        </div>

        {/* Visual Storage Slots */}
        <div className="space-y-3">
          {storageSpecs.m2Slots.map((slot, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                slot.occupied
                  ? 'glass-panel-subtle border-emerald-500/30 bg-emerald-950/15'
                  : 'glass-panel-subtle border-dashed border-white/20 bg-white/5'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <HardDrive className={`w-4 h-4 ${slot.occupied ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <strong className="text-sm font-semibold text-white">{slot.slot}</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-cyan-300 font-mono border border-white/10">
                    {slot.speedGen}
                  </span>
                  {slot.occupied ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                      Installed Drive
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium">
                      Open for Upgrade
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-slate-300">
                  {slot.occupied ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Drive: <strong className="text-white font-medium">{slot.driveName}</strong></span>
                      <span>Capacity: <strong className="text-cyan-300 font-mono">{slot.driveSize}</strong></span>
                      <span>Throughput: <strong className="text-emerald-300 font-mono">{slot.readSpeed}</strong></span>
                    </div>
                  ) : (
                    <div className="text-slate-400">
                      Supports: <strong className="text-white font-medium">{slot.maxSupportedSize}</strong>
                    </div>
                  )}
                </div>
              </div>

              {!slot.occupied && (
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs text-sky-300 font-medium px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/30">
                    <span>Plug & Play Upgrade</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Simplified Storage Upgrade Advice */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
          <strong className="text-cyan-300 flex items-center gap-1.5 font-semibold">
            <Info className="w-3.5 h-3.5" /> Simplified SSD Upgrade Advice
          </strong>
          <p className="text-slate-300 leading-relaxed">
            {storageSpecs.upgradeAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};
