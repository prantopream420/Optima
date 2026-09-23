import React, { useState } from 'react';
import {
  Cpu,
  RefreshCw,
  Download,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
  History,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { DriverItem, RestorePoint } from '../types';

interface DriverSectionProps {
  drivers: DriverItem[];
  restorePoints: RestorePoint[];
  onUpdateDriver: (driverId: string) => void;
  onUpdateAllDrivers: () => void;
  onCreateRestorePoint: (name: string) => RestorePoint;
  onRollback: (rpId: string) => void;
  isScanning: boolean;
  onScanSystem: () => void;
  lastCreatedRestorePoint: RestorePoint | null;
}

export const DriverSection: React.FC<DriverSectionProps> = ({
  drivers,
  restorePoints,
  onUpdateDriver,
  onUpdateAllDrivers,
  onCreateRestorePoint,
  onRollback,
  isScanning,
  onScanSystem,
  lastCreatedRestorePoint
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDriver, setSelectedDriver] = useState<DriverItem | null>(null);
  const [isUpdatingAll, setIsUpdatingAll] = useState(false);
  const [updateStepText, setUpdateStepText] = useState<string>('');
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [selectedRpForRollback, setSelectedRpForRollback] = useState<RestorePoint | null>(null);
  const [rollbackSuccessMsg, setRollbackSuccessMsg] = useState<string | null>(null);

  const pendingUpdates = drivers.filter((d) => d.status === 'update-available');
  const upToDateCount = drivers.filter((d) => d.status === 'up-to-date' || d.status === 'updated').length;

  const categories = ['All', 'Display', 'Chipset', 'Network', 'Audio', 'Storage', 'Security'];

  const filteredDrivers = activeCategory === 'All'
    ? drivers
    : drivers.filter((d) => d.category === activeCategory);

  const handleStartUpdateAll = () => {
    setIsUpdatingAll(true);
    setUpdateStepText('Creating pre-installation System Restore Point in C:\\System Volume Information...');

    setTimeout(() => {
      // Step 1: Create restore point
      const newRp = onCreateRestorePoint('AeroOptima_DriverUpdate_RestorePoint');
      setUpdateStepText(`Restore Point Created: ${newRp.name} at ${newRp.directoryPath}`);

      setTimeout(() => {
        setUpdateStepText('Validating WHQL cryptographic signatures from Microsoft Windows Update...');
        setTimeout(() => {
          setUpdateStepText('Installing display and chipset bus drivers...');
          setTimeout(() => {
            onUpdateAllDrivers();
            setIsUpdatingAll(false);
            setUpdateStepText('');
          }, 1500);
        }, 1200);
      }, 1000);
    }, 1200);
  };

  const handleTriggerRollback = (rp: RestorePoint) => {
    setSelectedRpForRollback(rp);
    setShowRollbackModal(true);
  };

  const confirmRollback = () => {
    if (selectedRpForRollback) {
      onRollback(selectedRpForRollback.id);
      setShowRollbackModal(false);
      setRollbackSuccessMsg(`System rollback initiated to ${selectedRpForRollback.name}. Drivers reverted successfully.`);
      setTimeout(() => setRollbackSuccessMsg(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Scan Controls */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
                PnP Device Subsystem
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">System Driver Scanner & 1-Click Updater</h2>
            </div>
            <p className="text-sm text-slate-300">
              Scans all hardware components, validates Microsoft WHQL certificates, and installs updates with automated restore point creation for zero-risk rollback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onScanSystem}
              disabled={isScanning}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isScanning ? 'Scanning Hardware Devices...' : 'Scan Entire System'}</span>
            </button>

            <button
              onClick={handleStartUpdateAll}
              disabled={pendingUpdates.length === 0 || isUpdatingAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 border border-white/20 transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install All Available Updates ({pendingUpdates.length})</span>
            </button>
          </div>
        </div>

        {/* Update Progress Feedback */}
        {isUpdatingAll && (
          <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-cyan-400" />
            <div className="space-y-0.5">
              <strong className="block text-white font-medium">1-Click Driver Installation in Progress</strong>
              <p className="text-cyan-200/90 font-mono text-[11px]">{updateStepText}</p>
            </div>
          </div>
        )}
      </div>

      {/* Prominent Restore Point Directory Notice (User Requirement) */}
      {lastCreatedRestorePoint && (
        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mt-0.5">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-semibold text-white">Pre-Installation Restore Point Created</strong>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                    Seq #{lastCreatedRestorePoint.sequenceNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Created directory location for instant rollback:
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-xs font-mono bg-black/40 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30 select-all">
                    {lastCreatedRestorePoint.directoryPath}
                  </code>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTriggerRollback(lastCreatedRestorePoint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 text-xs font-medium border border-emerald-500/40 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rollback to this Point</span>
            </button>
          </div>
        </div>
      )}

      {/* Rollback Success Banner */}
      {rollbackSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{rollbackSuccessMsg}</span>
        </div>
      )}

      {/* Quick Summary Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
          <span className="text-[11px] text-slate-400">Total Scanned Hardware</span>
          <div className="mt-1 text-xl font-bold font-mono text-white tabular-nums">{drivers.length} Devices</div>
          <span className="text-[10px] text-slate-400">PCIe, USB, ACPI, Audio</span>
        </div>

        <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
          <span className="text-[11px] text-slate-400">Updates Ready</span>
          <div className="mt-1 text-xl font-bold font-mono text-amber-300 tabular-nums">{pendingUpdates.length} Drivers</div>
          <span className="text-[10px] text-amber-400/80">WHQL Verified Packages</span>
        </div>

        <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
          <span className="text-[11px] text-slate-400">Up to Date</span>
          <div className="mt-1 text-xl font-bold font-mono text-emerald-400 tabular-nums">{upToDateCount} Drivers</div>
          <span className="text-[10px] text-emerald-400/80">Optimal Firmware State</span>
        </div>

        <div className="glass-panel-subtle rounded-xl p-3 border border-white/10">
          <span className="text-[11px] text-slate-400">Active Restore Points</span>
          <div className="mt-1 text-xl font-bold font-mono text-cyan-300 tabular-nums">{restorePoints.length} Points</div>
          <span className="text-[10px] text-cyan-400/80">Rollback Ready</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
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

      {/* Drivers List */}
      <div className="space-y-3">
        {filteredDrivers.map((driver) => {
          const isPending = driver.status === 'update-available';
          const isUpdated = driver.status === 'updated' || driver.status === 'up-to-date';

          return (
            <div
              key={driver.id}
              className="glass-panel rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                      {driver.category}
                    </span>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{driver.name}</h4>
                    {driver.whqlCertified && (
                      <span className="flex items-center gap-1 text-[10px] text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                        <ShieldCheck className="w-3 h-3 text-sky-400" /> WHQL Certified
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        driver.criticality === 'Security'
                          ? 'bg-rose-500/20 text-rose-300'
                          : driver.criticality === 'Performance'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-500/20 text-slate-300'
                      }`}
                    >
                      {driver.criticality}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{driver.releaseNotes}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span>Installed: <strong className="text-slate-300 font-mono">{driver.installedVersion}</strong></span>
                    {isPending && (
                      <>
                        <span className="text-slate-600">→</span>
                        <span>Latest: <strong className="text-cyan-300 font-mono">{driver.latestVersion}</strong></span>
                        <span>Size: <strong className="text-slate-300">{driver.downloadSize}</strong></span>
                        <span>Released: <strong className="text-slate-300">{driver.releaseDate}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isPending ? (
                    <button
                      onClick={() => onUpdateDriver(driver.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-medium border border-cyan-500/40 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Update Driver</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Up to Date
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restore Points & Rollback Management Section */}
      <div className="glass-panel rounded-2xl p-5 border border-white/15 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">System Restore Points & Rollback Management</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Location: C:\System Volume Information</span>
        </div>

        <p className="text-xs text-slate-300">
          Before any driver is modified or installed, AeroOptima creates a hardware checkpoint. If a newly installed driver causes instability, select a previous restore point below to immediately roll back.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3">Seq #</th>
                <th className="py-2.5 px-3">Restore Point Name</th>
                <th className="py-2.5 px-3">Created Timestamp</th>
                <th className="py-2.5 px-3">Directory Location</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {restorePoints.map((rp) => (
                <tr key={rp.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-cyan-300">#{rp.sequenceNumber}</td>
                  <td className="py-2.5 px-3 text-white font-sans font-medium">{rp.name}</td>
                  <td className="py-2.5 px-3 text-slate-400">{rp.createdAt}</td>
                  <td className="py-2.5 px-3 text-slate-300 truncate max-w-xs text-[11px]">{rp.directoryPath}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <button
                      onClick={() => handleTriggerRollback(rp)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-rose-500/20 hover:text-rose-200 text-slate-300 text-[11px] transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rollback</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Rollback */}
      {showRollbackModal && selectedRpForRollback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Confirm Driver Rollback</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to revert system drivers to the state saved at:{' '}
              <strong className="text-white block font-mono mt-1">{selectedRpForRollback.name}</strong>
              <span className="text-slate-400 block mt-1">Directory: {selectedRpForRollback.directoryPath}</span>
            </p>
            <div className="p-3 rounded-lg bg-white/5 text-[11px] text-slate-400 space-y-1">
              <p>• Windows will reload previous INF package versions.</p>
              <p>• Personal files, documents, and games are never affected.</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRollbackModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRollback}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-colors"
              >
                Confirm Rollback Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
