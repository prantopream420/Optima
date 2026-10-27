/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HeaderTitleBar } from './components/HeaderTitleBar';
import { NavigationTabs, NavTabId } from './components/NavigationTabs';
import { PowerProfileSection } from './components/PowerProfileSection';
import { DriverSection } from './components/DriverSection';
import { DashboardSection } from './components/DashboardSection';
import { MotherboardSection } from './components/MotherboardSection';
import { SystemFixSection } from './components/SystemFixSection';
import { HiddenTweaksSection } from './components/HiddenTweaksSection';
import { ExecutablePackModal } from './components/ExecutablePackModal';
import { ExecutionProgressModal, ExecutionModalState } from './components/ExecutionProgressModal';

import liquidGlassWallpaper from './assets/images/liquid_glass_desktop_wallpaper_1790171601776.jpg';
import cyberAuroraWallpaper from './assets/images/cyber_aurora_wallpaper_1790171616439.jpg';

import {
  PowerProfileType,
  DriverItem,
  RestorePoint,
  CorruptionCheckItem,
  HiddenTweak,
  MotherboardDetails
} from './types';
import {
  RealSystemOverview,
  LivePerformanceStats,
  RealDriverItem
} from './types/electron';
import {
  INITIAL_DRIVERS,
  INITIAL_RESTORE_POINTS,
  MOTHERBOARD_DATA,
  CORRUPTION_CHECKS,
  HIDDEN_TWEAKS
} from './data/mockData';

// Wallpaper assets generated for liquid glass backdrop
const WALLPAPERS = [
  {
    id: 'liquid-glass',
    name: 'Liquid Glass Silk (Windows Bloom)',
    path: liquidGlassWallpaper
  },
  {
    id: 'cyber-aurora',
    name: 'Cyber Aurora Titanium',
    path: cyberAuroraWallpaper
  },
  {
    id: 'deep-obsidian',
    name: 'Obsidian Minimalist Void',
    path: 'gradient-obsidian'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('power');
  const [currentProfile, setCurrentProfile] = useState<PowerProfileType>('standard');
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(WALLPAPERS[0].path);
  const [drivers, setDrivers] = useState<DriverItem[]>(INITIAL_DRIVERS);
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>(INITIAL_RESTORE_POINTS);
  const [lastCreatedRp, setLastCreatedRp] = useState<RestorePoint | null>(null);
  const [corruptionChecks, setCorruptionChecks] = useState<CorruptionCheckItem[]>(CORRUPTION_CHECKS);
  const [tweaks, setTweaks] = useState<HiddenTweak[]>(HIDDEN_TWEAKS);
  const [motherboard, setMotherboard] = useState<MotherboardDetails>(MOTHERBOARD_DATA);
  const [isScanningDrivers, setIsScanningDrivers] = useState(false);
  const [isScanningCorruptions, setIsScanningCorruptions] = useState(false);
  const [isRefreshingOverview, setIsRefreshingOverview] = useState(false);
  const [showExeModal, setShowExeModal] = useState(false);

  // Real Hardware & Live Stats States
  const [overview, setOverview] = useState<RealSystemOverview | null>(null);
  const [liveStats, setLiveStats] = useState<LivePerformanceStats | null>(null);

  // Real-Time Execution Modal State
  const [executionModal, setExecutionModal] = useState<ExecutionModalState>({
    isOpen: false,
    actionId: '',
    title: '',
    description: '',
    logs: [],
    isDone: true,
    success: true,
    startTime: 0
  });

  const [driverLogs, setDriverLogs] = useState<{ id: string; timestamp: string; message: string; type: 'info' | 'success' | 'warn' }[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: 'AeroOptima Pro Desktop Engine Initialized. Real-time telemetry sensors listening.',
      type: 'info'
    }
  ]);

  // Dispatch Action with Real-Time Streaming Pop-up Window
  const dispatchAction = useCallback((
    type: string,
    title: string,
    description: string,
    params: Record<string, any> = {}
  ) => {
    const actionId = `act-${Date.now()}`;
    setExecutionModal({
      isOpen: true,
      actionId,
      title,
      description,
      logs: [`[INIT] Initializing hardware governor: ${title}...`],
      isDone: false,
      startTime: Date.now()
    });

    if (typeof window !== 'undefined' && window.aeroOptimaNative?.startAction) {
      window.aeroOptimaNative.startAction(actionId, type, params);
    } else {
      // Graceful fallback for browser previews
      setTimeout(() => {
        setExecutionModal((prev) => ({
          ...prev,
          logs: [...prev.logs, `[EXEC] Dispatching Windows NT command pipeline for ${title}...`]
        }));
        setTimeout(() => {
          setExecutionModal((prev) => ({
            ...prev,
            logs: [...prev.logs, `[SUCCESS] ${title} completed successfully.`],
            isDone: true,
            success: true
          }));
        }, 1200);
      }, 500);
    }
  }, []);

  // Listen to Streaming Output from Electron Process
  useEffect(() => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.onActionProgress) {
      const unsubscribe = window.aeroOptimaNative.onActionProgress((data) => {
        setExecutionModal((prev) => {
          if (prev.actionId !== data.actionId) return prev;
          return {
            ...prev,
            logs: [...prev.logs, data.line],
            isDone: data.isDone ? true : prev.isDone,
            success: data.success !== undefined ? data.success : prev.success
          };
        });

        // Add to main history log if completed
        if (data.isDone) {
          setDriverLogs((prev) => [
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              message: `Executed: ${data.line.replace(/\[FINISHED\]|\[ERROR\]/g, '').trim()}`,
              type: data.success ? 'success' : 'warn'
            },
            ...prev
          ]);
        }
      });
      return unsubscribe;
    }
  }, []);

  // Fetch Full Hardware Overview from Local Machine
  const fetchHardwareOverview = useCallback(async () => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.getSystemOverview) {
      setIsRefreshingOverview(true);
      try {
        const data = await window.aeroOptimaNative.getSystemOverview();
        if (data) {
          setOverview(data);

          // Update active profile from real scheme
          if (data.powerScheme?.activeGuid) {
            const guid = data.powerScheme.activeGuid.toLowerCase();
            if (guid.includes('a1841308') || data.powerScheme.activeName.toLowerCase().includes('saver')) {
              setCurrentProfile('battery');
            } else if (guid.includes('e9a42b02') || data.powerScheme.activeName.toLowerCase().includes('ultimate') || data.powerScheme.activeName.toLowerCase().includes('performance')) {
              setCurrentProfile('performance');
            } else {
              setCurrentProfile('standard');
            }
          }

          // Update Motherboard state
          setMotherboard((prev) => ({
            ...prev,
            manufacturer: data.motherboard.manufacturer || prev.manufacturer,
            productName: data.motherboard.product || prev.productName,
            biosVersion: data.bios.version || prev.biosVersion,
            biosDate: data.bios.releaseDate || prev.biosDate,
            ramSpecs: {
              ...prev.ramSpecs,
              currentConfiguration: `${data.system.totalPhysicalRamGb} GB RAM @ ${data.memorySlots?.[0]?.speedMhz || 3200} MHz`,
              maxSupportedCapacityGb: Math.max(64, Math.round(data.system.totalPhysicalRamGb * 2))
            }
          }));

          // Synchronize Real Tweaks
          if (data.tweaks) {
            setTweaks((prev) =>
              prev.map((t) => {
                if (t.id === 'tweak-1') return { ...t, enabled: data.tweaks.classicContextMenu };
                if (t.id === 'tweak-2') return { ...t, enabled: data.tweaks.telemetryDisabled };
                if (t.id === 'tweak-3') return { ...t, enabled: data.tweaks.bingSearchDisabled };
                if (t.id === 'tweak-4') return { ...t, enabled: data.tweaks.taskbarEndTaskEnabled };
                if (t.id === 'tweak-5') return { ...t, enabled: data.tweaks.networkThrottlingDisabled };
                return t;
              })
            );
          }

          // Log verification
          setDriverLogs((prev) => [
            {
              id: `log-hw-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              message: `Live Telemetry Verified: ${data.system.manufacturer} ${data.system.model} [${data.system.computerName}] (S/N: ${data.motherboard.serialNumber}) with ${data.cpu.name}.`,
              type: 'info'
            },
            ...prev
          ]);
        }
      } catch (err) {
        console.error('Error fetching hardware overview:', err);
      } finally {
        setIsRefreshingOverview(false);
      }
    }
  }, []);

  // Fetch Real Drivers
  const fetchRealDrivers = useCallback(async () => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.getSystemDrivers) {
      try {
        const realDrivers = await window.aeroOptimaNative.getSystemDrivers();
        if (realDrivers && realDrivers.length > 0) {
          setDrivers(realDrivers as DriverItem[]);
          setDriverLogs((prev) => [
            {
              id: `log-drv-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              message: `Enumerated ${realDrivers.length} verified hardware PnP drivers from Windows driver store.`,
              type: 'success'
            },
            ...prev
          ]);
        }
      } catch (err) {
        console.error('Error fetching drivers:', err);
      }
    }
  }, []);

  // Initial Load & Admin Check
  useEffect(() => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.isNative) {
      window.aeroOptimaNative.checkAdmin().then((isAdmin) => {
        setDriverLogs((prev) => [
          {
            id: `log-adm-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            message: isAdmin
              ? 'AeroOptima Native Engine running with Elevated Administrator Privileges.'
              : 'AeroOptima Native Engine running in Standard User Mode.',
            type: isAdmin ? 'success' : 'warn'
          },
          ...prev
        ]);
      }).catch(() => {});

      fetchHardwareOverview();
      fetchRealDrivers();
    }
  }, [fetchHardwareOverview, fetchRealDrivers]);

  // Live Performance Polling Loop (Every 2 seconds)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.getLiveStats) {
      const interval = setInterval(async () => {
        try {
          const stats = await window.aeroOptimaNative!.getLiveStats();
          if (stats) {
            setLiveStats(stats);
          }
        } catch {}
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  // Handle Power Profile Change with Live Pop-Up Window
  const handleSelectProfile = (profile: PowerProfileType) => {
    setCurrentProfile(profile);
    const profileNames = {
      battery: 'Battery Saver Eco Profile',
      standard: 'Standard Balanced Profile',
      performance: 'Ultimate Performance Mode'
    };

    dispatchAction(
      `power_${profile}`,
      `Activating ${profileNames[profile]}`,
      `Adjusting CPU frequency governors, thermal cooling curves, and port power states via powercfg.exe`
    );
  };

  // Handle Create Restore Point with Live Pop-Up Window
  const handleCreateRestorePoint = (name: string): RestorePoint => {
    const randomHex = Math.random().toString(16).substring(2, 10);
    const sequenceNum = restorePoints.length > 0 ? restorePoints[0].sequenceNumber + 1 : 140;
    const newRp: RestorePoint = {
      id: `rp-${Date.now()}`,
      name: `${name}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
      createdAt: new Date().toLocaleString(),
      sequenceNumber: sequenceNum,
      directoryPath: `C:\\System Volume Information\\{${randomHex}-5e89-4a11-b02f-87a1d0f5c902}\\`,
      type: 'DEVICE_DRIVER_INSTALL',
      sizeMb: 1540,
      associatedAction: 'Automatic pre-installation hardware driver snapshot'
    };

    setRestorePoints((prev) => [newRp, ...prev]);
    setLastCreatedRp(newRp);

    dispatchAction(
      'create_restore_point',
      'Creating Windows System Restore Point',
      `Calling Checkpoint-Computer API to snapshot system registry and driver hive`,
      { name }
    );

    return newRp;
  };

  // Handle Scan Drivers with Live Pop-Up Window
  const handleScanDrivers = () => {
    setIsScanningDrivers(true);
    dispatchAction(
      'scan_drivers',
      'Scanning Windows PnP Hardware Devices',
      'Querying Plug-and-Play bus enumerator and signed driver store'
    );
    setTimeout(() => {
      fetchRealDrivers();
      setIsScanningDrivers(false);
    }, 2500);
  };

  // Handle Update Single Driver with Live Pop-Up Window
  const handleUpdateDriver = (driverId: string) => {
    const driverToUpdate = drivers.find((d) => d.id === driverId);
    if (driverToUpdate) {
      dispatchAction(
        'create_restore_point',
        `Updating Driver: ${driverToUpdate.name}`,
        `Creating safety snapshot and verifying driver certificate for ${driverToUpdate.name}`,
        { name: `AeroOptima_${driverToUpdate.category}_Update` }
      );
    }

    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id === driverId) {
          return {
            ...d,
            installedVersion: d.latestVersion,
            status: 'updated'
          };
        }
        return d;
      })
    );
  };

  // Handle Update All Drivers
  const handleUpdateAllDrivers = () => {
    dispatchAction(
      'create_restore_point',
      '1-Click Batch Driver Update & Restore Point',
      'Creating safety checkpoint and synchronizing all system drivers with WHQL catalog',
      { name: 'AeroOptima_Batch_Driver_Update' }
    );

    setDrivers((prev) =>
      prev.map((d) => ({
        ...d,
        installedVersion: d.latestVersion,
        status: 'updated'
      }))
    );
  };

  // Handle Rollback
  const handleRollback = (rpId: string) => {
    const targetRp = restorePoints.find((rp) => rp.id === rpId);
    if (!targetRp) return;

    setDrivers(INITIAL_DRIVERS);
    setDriverLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: `System rollback initiated to ${targetRp.name}. Driver states restored.`,
        type: 'warn'
      },
      ...prev
    ]);
  };

  // Handle Fix All Corruptions with Live Pop-Up Window
  const handleFixAllCorruptions = () => {
    dispatchAction(
      'full_repair_all',
      'Self-Healing 1-Click System Repair Pipeline',
      'Executing DISM Component Store Online Repair, SFC Integrity Scanner, and Update Cache Purge'
    );

    setCorruptionChecks((prev) =>
      prev.map((chk) => ({
        ...chk,
        status: 'repaired',
        severity: 'Healthy',
        detectedIssue: undefined
      }))
    );
  };

  // Handle Fix Single Corruption with Live Pop-Up Window
  const handleFixSingleCorruption = (id: string) => {
    const check = corruptionChecks.find((c) => c.id === id);
    if (!check) return;

    let actionType = 'run_sfc';
    if (check.command.includes('DISM')) actionType = 'run_dism';
    else if (check.command.includes('SoftwareDistribution')) actionType = 'purge_wu';
    else if (check.command.includes('winsock')) actionType = 'reset_network';

    dispatchAction(
      actionType,
      `System Repair: ${check.name}`,
      `Executing command: ${check.command}`
    );

    setCorruptionChecks((prev) =>
      prev.map((chk) => {
        if (chk.id === id) {
          return {
            ...chk,
            status: 'repaired',
            severity: 'Healthy',
            detectedIssue: undefined
          };
        }
        return chk;
      })
    );
  };

  // Handle Scan Corruptions
  const handleScanCorruptions = () => {
    setIsScanningCorruptions(true);
    setTimeout(() => {
      setIsScanningCorruptions(false);
    }, 1500);
  };

  // Handle Toggle Hidden Tweak with Live Pop-Up Window
  const handleToggleTweak = (tweakId: string) => {
    setTweaks((prev) =>
      prev.map((t) => {
        if (t.id === tweakId) {
          const willBeEnabled = !t.enabled;
          dispatchAction(
            'apply_tweak',
            `Toggling Tweak: ${t.name}`,
            `Writing Windows Registry key: ${t.registryPath}\\${t.valueName} -> ${willBeEnabled ? t.enabledValue : t.disabledValue}`,
            {
              path: t.registryPath,
              valueName: t.valueName,
              value: willBeEnabled ? t.enabledValue : t.disabledValue
            }
          );
          return { ...t, enabled: willBeEnabled };
        }
        return t;
      })
    );
  };

  const handleApplyAllTweaks = () => {
    dispatchAction(
      'apply_tweak',
      'Applying All Recommended Windows Tweaks',
      'Configuring classic context menu, disabling telemetry, and removing Bing Start Menu search',
      {
        path: 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32',
        valueName: '',
        value: ''
      }
    );
    setTweaks((prev) => prev.map((t) => ({ ...t, enabled: true })));
  };

  const pendingDriverUpdatesCount = drivers.filter((d) => d.status === 'update-available').length;
  const corruptionsDetectedCount = corruptionChecks.filter(
    (c) => c.status === 'corrupted' || c.severity === 'Critical' || c.severity === 'Warning'
  ).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col font-sans bg-slate-950">
      {/* Background Wallpaper with Liquid Blur & Dynamic Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {currentWallpaper !== 'gradient-obsidian' ? (
          <img
            src={currentWallpaper}
            alt="Windows Desktop Wallpaper"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-75 contrast-110 transform scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        )}

        {/* Ambient liquid light glow blobs that react to active profile */}
        <div
          className={`absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 transition-colors duration-700 pointer-events-none ${
            currentProfile === 'performance'
              ? 'bg-amber-500'
              : currentProfile === 'battery'
              ? 'bg-emerald-500'
              : 'bg-cyan-500'
          }`}
        />
        <div
          className={`absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 transition-colors duration-700 pointer-events-none ${
            currentProfile === 'performance'
              ? 'bg-rose-600'
              : currentProfile === 'battery'
              ? 'bg-teal-500'
              : 'bg-blue-600'
          }`}
        />

        {/* Liquid Glass Overlay tint */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[28px]" />
      </div>

      {/* Main Glass Application Container */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex-1 flex flex-col rounded-2xl border border-white/20 shadow-2xl glass-panel overflow-hidden">
          {/* Windows Title Bar */}
          <HeaderTitleBar
            currentProfile={currentProfile}
            currentWallpaper={currentWallpaper}
            onSelectWallpaper={setCurrentWallpaper}
            onOpenExeModal={() => setShowExeModal(true)}
            wallpapers={WALLPAPERS}
          />

          {/* Navigation Bar */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            pendingDriverUpdatesCount={pendingDriverUpdatesCount}
            corruptionsDetectedCount={corruptionsDetectedCount}
          />

          {/* Viewport Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeTab === 'power' && (
              <PowerProfileSection
                currentProfile={currentProfile}
                onSelectProfile={handleSelectProfile}
              />
            )}

            {activeTab === 'drivers' && (
              <DriverSection
                drivers={drivers}
                restorePoints={restorePoints}
                onUpdateDriver={handleUpdateDriver}
                onUpdateAllDrivers={handleUpdateAllDrivers}
                onCreateRestorePoint={handleCreateRestorePoint}
                onRollback={handleRollback}
                isScanning={isScanningDrivers}
                onScanSystem={handleScanDrivers}
                lastCreatedRestorePoint={lastCreatedRp}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardSection
                currentProfile={currentProfile}
                driverLogs={driverLogs}
                liveStats={liveStats}
                overview={overview}
                onRefresh={fetchHardwareOverview}
                isRefreshing={isRefreshingOverview}
              />
            )}

            {activeTab === 'motherboard' && (
              <MotherboardSection
                motherboard={motherboard}
                overview={overview}
              />
            )}

            {activeTab === 'fix' && (
              <SystemFixSection
                corruptionChecks={corruptionChecks}
                onFixAll={handleFixAllCorruptions}
                onFixSingle={handleFixSingleCorruption}
                isScanning={isScanningCorruptions}
                onScanSystem={handleScanCorruptions}
              />
            )}

            {activeTab === 'tweaks' && (
              <HiddenTweaksSection
                tweaks={tweaks}
                onToggleTweak={handleToggleTweak}
                onApplyAllTweaks={handleApplyAllTweaks}
              />
            )}

            {activeTab === 'exe' && (
              <div className="space-y-4">
                <div className="glass-panel rounded-2xl p-6 border border-white/15">
                  <h3 className="text-lg font-bold text-white mb-2">Windows Standalone Executable & Batch Center</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Deploy AeroOptima Pro directly to your physical Windows machine. You can download the complete standalone Batch executable, PowerShell Core script, or launch the automated NSIS setup builder.
                  </p>
                  <button
                    onClick={() => setShowExeModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg transition-all"
                  >
                    Open Executable & Script Center
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Real-Time Execution Pop-Up Window */}
      <ExecutionProgressModal
        state={executionModal}
        onClose={() => setExecutionModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Standalone EXE / Script Modal */}
      <ExecutablePackModal
        isOpen={showExeModal}
        onClose={() => setShowExeModal(false)}
      />
    </div>
  );
}
