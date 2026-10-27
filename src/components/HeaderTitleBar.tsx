import React, { useState, useEffect } from 'react';
import {
  Zap,
  Activity,
  Layers,
  Wrench,
  Download,
  Image as ImageIcon,
  Minus,
  Square,
  X,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { PowerProfileType } from '../types';

interface HeaderTitleBarProps {
  currentProfile: PowerProfileType;
  currentWallpaper: string;
  onSelectWallpaper: (wp: string) => void;
  onOpenExeModal: () => void;
  wallpapers: { id: string; name: string; path: string }[];
}

export const HeaderTitleBar: React.FC<HeaderTitleBarProps> = ({
  currentProfile,
  currentWallpaper,
  onSelectWallpaper,
  onOpenExeModal,
  wallpapers
}) => {
  const [showWpDropdown, setShowWpDropdown] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.aeroOptimaNative?.isNative) {
      setIsNative(true);
      window.aeroOptimaNative.checkAdmin().then((admin) => setIsAdmin(admin)).catch(() => {});
    }
  }, []);

  const getProfileBadge = () => {
    switch (currentProfile) {
      case 'battery':
        return { label: 'Battery Saver Eco', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'performance':
        return { label: 'Ultimate Performance', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      default:
        return { label: 'Standard Balanced', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
    }
  };

  const badge = getProfileBadge();

  const handleMinimize = () => {
    if (window.aeroOptimaNative?.minimize) {
      window.aeroOptimaNative.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.aeroOptimaNative?.maximize) {
      window.aeroOptimaNative.maximize();
    }
  };

  const handleClose = () => {
    if (window.aeroOptimaNative?.close) {
      window.aeroOptimaNative.close();
    }
  };

  return (
    <header
      className="relative z-30 flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left: App Branding & Window Identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/80 via-blue-600 to-indigo-700 shadow-md shadow-cyan-500/20 border border-white/20">
          <Zap className="w-4 h-4 text-white fill-white/80" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-white drop-shadow-sm">AeroOptima Pro</span>
            <span className="text-[10px] text-slate-400 font-mono">v2.4.0 (x64)</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full border ${badge.color} font-medium tracking-wide transition-all`}>
              {badge.label}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {isNative ? (
              <span className="text-cyan-400 font-medium">Native Windows Desktop Engine {isAdmin ? '· Elevated (Admin)' : ''}</span>
            ) : (
              'Windows 11 Hardware & Power Optimization Suite'
            )}
          </p>
        </div>
      </div>

      {/* Middle: Live Quick Status Pill */}
      <div className="hidden lg:flex items-center gap-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>System Integrity: <strong className="text-emerald-400 font-medium">Optimal</strong></span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>DirectX 12 DWM: <strong className="text-sky-300 font-medium">Liquid Glass Active</strong></span>
        </div>
      </div>

      {/* Right: Actions, Wallpaper & Windows Controls */}
      <div
        className="flex items-center gap-2"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {/* Wallpaper Picker */}
        <div className="relative">
          <button
            onClick={() => setShowWpDropdown(!showWpDropdown)}
            title="Change Desktop Wallpaper & Glass Accent"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Wallpaper</span>
          </button>

          {showWpDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel p-2 shadow-2xl z-50">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Liquid Glass Backdrop
              </div>
              <div className="space-y-1 mt-1">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => {
                      onSelectWallpaper(wp.path);
                      setShowWpDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                      currentWallpaper === wp.path
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{wp.name}</span>
                    {currentWallpaper === wp.path && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download Standalone EXE / Script Pack */}
        <button
          onClick={onOpenExeModal}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-sm border border-cyan-400/30 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Standalone EXE / Bat</span>
        </button>

        {/* Realistic Windows Frame Controls */}
        <div className="flex items-center ml-2 border-l border-white/10 pl-2">
          <button
            onClick={handleMinimize}
            title="Minimize"
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            title="Maximize / Restore"
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={handleClose}
            title="Close"
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600/80 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
