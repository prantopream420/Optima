/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderTitleBar } from './components/HeaderTitleBar';
import { NavigationTabs, NavTabId } from './components/NavigationTabs';
import { PowerProfileSection } from './components/PowerProfileSection';
import { DriverSection } from './components/DriverSection';
import { DashboardSection } from './components/DashboardSection';
import { MotherboardSection } from './components/MotherboardSection';
import { SystemFixSection } from './components/SystemFixSection';
import { HiddenTweaksSection } from './components/HiddenTweaksSection';
import { ExecutablePackModal } from './components/ExecutablePackModal';

import {
  PowerProfileType,
  DriverItem,
  RestorePoint,
  CorruptionCheckItem,
  HiddenTweak
} from './types';
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
    path: '/src/assets/images/liquid_glass_desktop_wallpaper_1790171601776.jpg'
  },
  {
    id: 'cyber-aurora',
    name: 'Cyber Aurora Titanium',
    path: '/src/assets/images/cyber_aurora_wallpaper_1790171616439.jpg'
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
  const [isScanningDrivers, setIsScanningDrivers] = useState(false);
  const [isScanningCorruptions, setIsScanningCorruptions] = useState(false);
  const [showExeModal, setShowExeModal] = useState(false);

  const [driverLogs, setDriverLogs] = useState<{ id: string; timestamp: string; message: string; type: 'info' | 'success' | 'warn' }[]>([
    {
      id: 'log-1',
      timestamp: 'Today 14:32:05',
      message: 'System power profile switched to Standard Balanced (381b4222-f694-41f0-9685-ff5bb260df2e).',
      type: 'info'
    },
    {
      id: 'log-2',
      timestamp: 'Today 14:15:20',
      message: 'PnP hardware bus scan completed: 9 drivers enumerated, 6 new WHQL updates available.',
      type: 'warn'
    },
    {
      id: 'log-3',
      timestamp: 'Sep 21 09:12:44',
      message: 'System Restore Point created in C:\\System Volume Information\\{3b7a12c8-99e4-4fa0-82d2-5a1c90f23b12}\\',
      type: 'success'
    }
  ]);

  // Handle Power Profile Change
  const handleSelectProfile = (profile: PowerProfileType) => {
    setCurrentProfile(profile);
    const profileNames = {
      battery: 'Battery Saver Eco',
      standard: 'Standard Balanced',
      performance: 'Ultimate Performance'
    };
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: `Activated ${profileNames[profile]} profile. Adjusted CPU clock governors, fan RPM curve, and port power.`,
      type: profile === 'performance' ? 'success' as const : 'info' as const
    };
    setDriverLogs((prev) => [newLog, ...prev]);
  };

  // Handle System Restore Point Creation
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

    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: `System Restore Point created at ${newRp.directoryPath}`,
      type: 'success' as const
    };
    setDriverLogs((prev) => [logEntry, ...prev]);

    return newRp;
  };

  // Handle Update Single Driver
  const handleUpdateDriver = (driverId: string) => {
    // Automatically create restore point first
    const driverToUpdate = drivers.find((d) => d.id === driverId);
    if (driverToUpdate) {
      handleCreateRestorePoint(`AeroOptima_${driverToUpdate.category}_DriverUpdate`);
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

    if (driverToUpdate) {
      setDriverLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          message: `Successfully installed updated WHQL driver for ${driverToUpdate.name} (${driverToUpdate.latestVersion}).`,
          type: 'success'
        },
        ...prev
      ]);
    }
  };

  // Handle Update All Drivers (with automated restore point)
  const handleUpdateAllDrivers = () => {
    setDrivers((prev) =>
      prev.map((d) => ({
        ...d,
        installedVersion: d.latestVersion,
        status: 'updated'
      }))
    );

    setDriverLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: 'Completed 1-Click Update of all system drivers with WHQL cryptographic verification.',
        type: 'success'
      },
      ...prev
    ]);
  };

  // Handle Rollback
  const handleRollback = (rpId: string) => {
    const targetRp = restorePoints.find((rp) => rp.id === rpId);
    if (!targetRp) return;

    // Reset drivers back to original initial versions
    setDrivers(INITIAL_DRIVERS);

    setDriverLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: `System rollback executed to ${targetRp.name} (${targetRp.directoryPath}). Driver versions reverted.`,
        type: 'warn'
      },
      ...prev
    ]);
  };

  // Handle Scan Drivers
  const handleScanDrivers = () => {
    setIsScanningDrivers(true);
    setTimeout(() => {
      setIsScanningDrivers(false);
      setDriverLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          message: 'PnP utility scanned 9 hardware bus controllers. All hardware device instances verified.',
          type: 'info'
        },
        ...prev
      ]);
    }, 1400);
  };

  // Handle Fix All Corruptions
  const handleFixAllCorruptions = () => {
    setCorruptionChecks((prev) =>
      prev.map((chk) => ({
        ...chk,
        status: 'repaired',
        severity: 'Healthy',
        detectedIssue: undefined
      }))
    );

    setDriverLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: 'System File Checker (SFC) and DISM repaired Component Store and DLL cache. 0 errors remaining.',
        type: 'success'
      },
      ...prev
    ]);
  };

  // Handle Fix Single Corruption
  const handleFixSingleCorruption = (id: string) => {
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

  // Handle Toggle Hidden Tweak
  const handleToggleTweak = (tweakId: string) => {
    setTweaks((prev) =>
      prev.map((t) => {
        if (t.id === tweakId) {
          return { ...t, enabled: !t.enabled };
        }
        return t;
      })
    );
  };

  const handleApplyAllTweaks = () => {
    setTweaks((prev) => prev.map((t) => ({ ...t, enabled: true })));
  };

  const pendingDriverUpdatesCount = drivers.filter((d) => d.status === 'update-available').length;
  const corruptionsDetectedCount = corruptionChecks.filter(
    (c) => c.status === 'corrupted' || c.severity === 'Critical' || c.severity === 'Warning'
  ).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col font-sans bg-slate-950">
      {/* Background Wallpaper with Liquid Blur & Glow */}
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

        {/* Ambient liquid light glow blobs */}
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
              />
            )}

            {activeTab === 'motherboard' && (
              <MotherboardSection motherboard={MOTHERBOARD_DATA} />
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
                    Deploy AeroOptima Pro directly to your physical Windows machine. You can download the complete standalone Batch executable, PowerShell Core script, or read the step-by-step native compilation instructions.
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

      {/* Standalone EXE / Script Modal */}
      <ExecutablePackModal
        isOpen={showExeModal}
        onClose={() => setShowExeModal(false)}
      />
    </div>
  );
}
