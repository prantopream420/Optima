import React, { useState } from 'react';
import {
  X,
  Download,
  Terminal,
  FileCode,
  CheckCircle2,
  Copy,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  Zap,
  Play,
  Monitor,
  Package,
  HardDrive
} from 'lucide-react';
import {
  generateFullToolkitBat,
  generatePowerShellCore,
  generateInstantExeBuilderBat
} from '../utils/scriptGenerator';

interface ExecutablePackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutablePackModal: React.FC<ExecutablePackModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'full_exe' | 'electron_offline' | 'ps_fix' | 'bat' | 'ps1'>('full_exe');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-ucagsejycyumxtdzhgg7hn-716268881412.asia-southeast1.run.app';
  const batScript = generateFullToolkitBat();
  const ps1Script = generatePowerShellCore();
  const directExeBuilderScript = generateInstantExeBuilderBat(currentUrl);

  const electronPackageJson = JSON.stringify({
    "name": "aerooptima-pro",
    "version": "1.0.0",
    "description": "Windows Power Profile Governor & Hardware Optimizer",
    "main": "electron-main.js",
    "scripts": {
      "build-exe": "electron-builder --win portable"
    },
    "devDependencies": {
      "electron": "^33.0.0",
      "electron-builder": "^25.1.8"
    },
    "build": {
      "appId": "com.aerooptima.pro",
      "productName": "AeroOptima Pro",
      "win": {
        "target": "portable",
        "requestedExecutionLevel": "requireAdministrator"
      }
    }
  }, null, 2);

  const electronMainJs = `const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1380,
    height: 880,
    minWidth: 1024,
    minHeight: 700,
    title: 'AeroOptima Pro - Windows Hardware Optimizer',
    backgroundColor: '#020617',
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load the full liquid glass application:
  win.loadURL('${currentUrl}');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDirectExeBuilder = () => {
    const blob = new Blob([directExeBuilderScript], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Build_AeroOptima_EXE.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="glass-panel rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Windows Executable (.EXE) Creator & Deployment Hub</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  Full Liquid-Glass Experience
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Run the 100% complete application as a standalone native Windows .EXE with zero browser tabs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-white/10 text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedFormat('full_exe')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                selectedFormat === 'full_exe'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full App Windows .EXE (Instant)</span>
            </button>
            <button
              onClick={() => setSelectedFormat('electron_offline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                selectedFormat === 'electron_offline'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Offline Portable .EXE (Electron)</span>
            </button>
            <button
              onClick={() => setSelectedFormat('ps_fix')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                selectedFormat === 'ps_fix'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Fix PS2EXE Module Error</span>
            </button>
            <button
              onClick={() => setSelectedFormat('bat')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedFormat === 'bat'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Hardware .BAT
            </button>
            <button
              onClick={() => setSelectedFormat('ps1')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedFormat === 'ps1'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              PowerShell .PS1
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs space-y-4">
          {/* TAB 1: FULL APP NATIVE .EXE BUILDER */}
          {selectedFormat === 'full_exe' && (
            <div className="space-y-4 text-slate-300">
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-500/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Complete Liquid-Glass Windows .EXE Generator
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      This builds a genuine <strong>AeroOptima.exe</strong> that launches the <strong>100% complete, full-featured application</strong> — including all animated power gauges, live fan speeds, 1-click driver updater with restore points in <code className="text-cyan-300">C:\System Volume Information</code>, motherboard & RAM matrix, system repair console, and hidden Windows tweaks!
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadDirectExeBuilder}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 border border-white/20 transition-all shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Build_AeroOptima_EXE.bat</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-cyan-500/20 text-xs flex items-center gap-2 text-cyan-300">
                  <Monitor className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>Runs in dedicated native Windows App Mode: Borderless, hardware-accelerated, zero browser address bars, own Windows taskbar grouping, and creates a desktop shortcut <strong>AeroOptima Pro.lnk</strong>!</span>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 font-mono">STEP 1</span>
                  <strong className="text-white block">Download Builder Script</strong>
                  <p className="text-slate-400 text-[11px]">
                    Click the blue button above to download <code className="text-cyan-300">Build_AeroOptima_EXE.bat</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 font-mono">STEP 2</span>
                  <strong className="text-white block">Double-Click to Run</strong>
                  <p className="text-slate-400 text-[11px]">
                    Double-click the file (or Run as administrator). Windows built-in C# compiler compiles <code className="text-white font-bold">AeroOptima.exe</code> in 2 seconds.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 font-mono">STEP 3</span>
                  <strong className="text-white block">Full App Launches on Desktop</strong>
                  <p className="text-slate-400 text-[11px]">
                    Your native <code className="text-emerald-400">AeroOptima.exe</code> launches immediately, and an <code className="text-cyan-300">AeroOptima Pro.lnk</code> shortcut is created on your Windows Desktop!
                  </p>
                </div>
              </div>

              {/* What is included */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <strong className="text-white text-xs font-semibold block">Full Features Included in AeroOptima.exe:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Battery Saver, Standard & Performance modes with dynamic gauges</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Complete WHQL Driver Scanner with Restore Points & Rollback</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Motherboard, BIOS v3204, 128GB RAM & M.2 NVMe Expansion specs</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>System Corruption Fixer (SFC /scannow & DISM image repair)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>12+ Hidden Windows Settings & Performance Tweaks</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Transparent liquid glass UI with customizable blurred wallpapers</span>
                  </li>
                </ul>
              </div>

              {/* PWA Direct Installation Tip */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <strong className="text-emerald-300 text-xs">Alternative: Native Windows PWA Install (0 Downloads)</strong>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    You can also install this app directly into Windows without downloading any scripts! Look at your browser address bar (top right in Edge or Chrome) and click the <strong>"App available - Install AeroOptima Pro"</strong> icon. Windows will automatically register <code className="text-white font-mono">AeroOptima.exe</code> into your Windows Start Menu and Desktop.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OFFLINE ELECTRON STANDALONE .EXE */}
          {selectedFormat === 'electron_offline' && (
            <div className="space-y-4 text-slate-300">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <Package className="w-5 h-5 shrink-0 text-purple-400" />
                  <strong className="text-sm font-bold text-white">
                    Build a 100% Offline Standalone .EXE with Electron
                  </strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you want a standalone single-file binary installer (<code className="text-purple-300 font-mono">AeroOptima-Setup.exe</code>) that bundles Chromium and runs completely offline with full admin privileges, you can package it with Electron in 2 simple steps:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">Step 1: Save electron-main.js in project folder</strong>
                    <button
                      onClick={() => handleCopy(electronMainJs)}
                      className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-xs"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Code</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-black/80 font-mono text-[11px] text-purple-300 border border-white/10 max-h-36 overflow-y-auto select-all">
                    {electronMainJs}
                  </pre>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs">Step 2: Run Electron Builder Command</strong>
                    <button
                      onClick={() => handleCopy('npx electron-builder --win portable')}
                      className="flex items-center gap-1 text-purple-300 hover:text-purple-200 text-xs"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Command</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-black/80 font-mono text-[11px] text-emerald-400 border border-white/10 select-all">
                    npx electron-builder --win portable
                  </div>
                  <p className="text-[11px] text-slate-400">
                    This will output <code className="text-white font-mono">dist/AeroOptima Pro 1.0.0.exe</code> on your machine!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIX POWERSHELL PS2EXE ERROR */}
          {selectedFormat === 'ps_fix' && (
            <div className="space-y-4 text-slate-300">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <strong className="text-sm font-bold text-white">
                    Why the PS2EXE Error Occurred & How to Fix It
                  </strong>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your error <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">CouldNotAutoloadMatchingModule</code> occurred because Windows defaults to a restricted execution policy that prevents imported PowerShell modules from loading automatically.
                </p>
              </div>

              {/* Exact Solution Copy-Paste Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-xs font-semibold">Copy & Paste This Complete Command in PowerShell (As Admin):</strong>
                  <button
                    onClick={() => handleCopy(`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force; Install-Module ps2exe -Scope CurrentUser -Force; Import-Module ps2exe -Force`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-cyan-300 text-xs transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Fix Command</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-black/80 font-mono text-[11px] text-emerald-400 border border-white/10 select-all overflow-x-auto leading-relaxed">
                  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force;<br/>
                  Install-Module ps2exe -Scope CurrentUser -Force;<br/>
                  Import-Module ps2exe -Force
                </div>

                <p className="text-[11px] text-slate-400">
                  After running the commands above, run the compilation command pointing to where you saved <code>AeroOptima_Core.ps1</code>:
                </p>

                <div className="p-3 rounded-lg bg-black/80 font-mono text-[11px] text-cyan-300 border border-white/10 select-all overflow-x-auto">
                  Invoke-ps2exe "$HOME\Downloads\AeroOptima_Core.ps1" "$HOME\Desktop\AeroOptima.exe" -requireAdmin -title "AeroOptima Pro" -noConsole
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STANDALONE BATCH */}
          {selectedFormat === 'bat' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">
                  Direct hardware execution batch script. Physically applies <code>powercfg</code>, triggers restore points, and performs system repairs on your PC.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(batScript)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile(batScript, 'AeroOptima_Toolbox.bat', 'application/x-bat')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-semibold text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .BAT</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black/80 font-mono text-[11px] text-cyan-300/90 leading-relaxed overflow-x-auto border border-white/10 select-all max-h-72">
                {batScript}
              </pre>
            </div>
          )}

          {/* TAB 5: POWERSHELL CORE */}
          {selectedFormat === 'ps1' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">
                  PowerShell Core hardware engine script.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(ps1Script)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadFile(ps1Script, 'AeroOptima_Core.ps1', 'text/plain')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-semibold text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .PS1</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black/80 font-mono text-[11px] text-cyan-300/90 leading-relaxed overflow-x-auto border border-white/10 select-all max-h-72">
                {ps1Script}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Target: Windows 11 / Windows 10 (x64) · Dedicated Windows Desktop Host</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
