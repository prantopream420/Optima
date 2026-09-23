import React from 'react';
import {
  Zap,
  Cpu,
  Activity,
  Layers,
  Wrench,
  Sliders,
  Terminal,
  ChevronRight
} from 'lucide-react';

export type NavTabId = 'power' | 'drivers' | 'dashboard' | 'motherboard' | 'fix' | 'tweaks' | 'exe';

interface NavigationTabsProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  pendingDriverUpdatesCount: number;
  corruptionsDetectedCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  pendingDriverUpdatesCount,
  corruptionsDetectedCount
}) => {
  const tabs = [
    {
      id: 'power' as NavTabId,
      label: 'Power Profiles',
      sublabel: 'Battery · Standard · Performance',
      icon: Zap,
      badge: null
    },
    {
      id: 'drivers' as NavTabId,
      label: 'Driver Center',
      sublabel: 'Restore Points & 1-Click Updates',
      icon: Cpu,
      badge: pendingDriverUpdatesCount > 0 ? `${pendingDriverUpdatesCount} Updates` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'dashboard' as NavTabId,
      label: 'System Dashboard',
      sublabel: 'Health, Specs & Microsoft Apps',
      icon: Activity,
      badge: null
    },
    {
      id: 'motherboard' as NavTabId,
      label: 'Motherboard & Upgrades',
      sublabel: 'RAM & SSD Expansion Matrix',
      icon: Layers,
      badge: 'Upgradable',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'fix' as NavTabId,
      label: 'System Fix & Repair',
      sublabel: 'SFC · DISM · CHKDSK · Cache',
      icon: Wrench,
      badge: corruptionsDetectedCount > 0 ? `${corruptionsDetectedCount} Issues` : 'Clean',
      badgeColor: corruptionsDetectedCount > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'tweaks' as NavTabId,
      label: 'Hidden Windows Tweaks',
      sublabel: '12+ Registry & Power Settings',
      icon: Sliders,
      badge: 'Advanced',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'exe' as NavTabId,
      label: 'Standalone EXE & Scripts',
      sublabel: 'Real Windows PowerShell / Bat',
      icon: Terminal,
      badge: 'Installer',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    }
  ];

  return (
    <nav className="w-full border-b border-white/10 bg-slate-950/30 backdrop-blur-md px-3 py-1.5 overflow-x-auto select-none">
      <div className="flex items-center gap-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white shadow-lg shadow-black/20 border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div
                className={`p-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/30'
                    : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs font-semibold tracking-tight">{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase border ${
                        tab.badgeColor || 'bg-white/10 text-slate-300 border-white/10'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 font-normal">{tab.sublabel}</p>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
