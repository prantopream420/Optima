# ⚡ AeroOptima Pro — Windows 11 Power & Hardware Optimizer

> **AeroOptima Pro** is a high-performance Windows PC and laptop hardware governor, power profile manager, automated driver updater with restore point management, motherboard expansion advisor, system corruption repair toolkit, and hidden Windows tweaks manager featuring a fluid liquid-glass (Windows Mica/Acrylic) interface.

---

## 🌟 Key Features

### 1. ⚡ Power Profile Governor
- **Battery Saver Eco (Max Endurance)**: Caps CPU max throttle to 70%, forces low-power core parking, enables aggressive USB selective suspend, drops display idle timeout to 3 minutes, and optimizes battery life.
- **Standard Balanced (Dynamic Scaler)**: Default dynamic frequency scaling (5% min to 100% max), balanced cooling governor.
- **Ultimate Performance (Uncapped Clocks)**: Unlocks the hidden Windows Ultimate Performance scheme GUID (`e9a42b02-d5df-448d-aa00-03f14749eb61`), locks 100% min/max CPU clocks (zero downclocking), disables port power suspend, maximizes active cooling fan profiles, and enables high-FPS DWM transparency animations.

### 2. 🛡️ Driver Management & Safe Restore Points
- **Automated Pre-Installation Restore Points**: Automatically creates a system restore snapshot in `C:\System Volume Information\` before touching any device drivers.
- **PnP Hardware Bus Enumeration**: Directly scans system hardware buses via `pnputil.exe /scan-devices`.
- **1-Click Driver Rollback**: Built-in snapshot manager and 1-click rollback capability.

### 3. 🖥️ Motherboard & Expansion Advisor
- **Live Hardware Inspection**: Leverages Windows CIM/WMI (`Win32_BaseBoard`, `Win32_BIOS`, `Win32_Processor`, `Win32_PhysicalMemory`) to detect genuine board manufacturer, chipset, BIOS version, RAM channel topology, and memory capacity limits.
- **Upgradability Insights**: Visualizes available and occupied RAM slots, M.2 NVMe PCIe lanes, and SATA channels.

### 4. 🔧 Self-Healing System Fix & Corruption Repair
- **DISM Online Image Repair**: `DISM /Online /Cleanup-Image /RestoreHealth` restores the WinSxS component store from Microsoft Update servers.
- **System File Checker**: `sfc /scannow` validates and replaces corrupted Windows core DLLs.
- **Windows Update Cache Purge**: Safely stops `wuauserv` & `bits`, deletes orphaned downloads from `C:\Windows\SoftwareDistribution\Download`, and restarts servicing engines.
- **Network Stack Reset**: Rebuilds the TCP/IP Winsock catalog (`netsh winsock reset`) and flushes DNS resolvers.

### 5. 🎛️ Hidden Windows Tweaks & Optimizations
- **Windows 11 Classic Context Menu**: Restores full right-click options without the "Show More Options" delay.
- **Diagnostic Telemetry Toggle**: Disables background Microsoft usage data collection.
- **Bing Search Removal**: Removes web suggestions from the Windows Start Menu search bar.
- **Taskbar "End Task" Option**: Adds direct process termination to taskbar icon context menus.
- **Network Throttling Index**: Removes network packet bandwidth bottlenecks for low-latency online gaming and streaming.

---

## 📦 Built Executables & Installation

The project includes pre-built, production-ready Windows binaries located in the `release/` directory:

| Binary | Path | Description |
|---|---|---|
| **Windows Setup Installer** | `release/AeroOptima Pro Setup 1.0.0.exe` | Full NSIS installer with desktop shortcut, Start Menu entry, uninstaller, and elevation support. |
| **Portable Executable** | `release/AeroOptima Pro 1.0.0.exe` | Zero-install standalone binary that can be launched directly from any folder or USB drive. |
| **Lightweight C# Native Host** | `AeroOptima_Host.exe` | Ultra-fast native launcher (5 KB) compiled via Windows built-in .NET `csc.exe`. |

---

## 🛠️ Development & Build Guide

### Prerequisites
- Windows 10/11 (x64)
- Node.js 18+ (tested with Node.js v22.14 LTS)
- PowerShell 5.1+

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Launch with Electron in development
npm run electron:dev
```

### Building Executables
```bash
# Compile the React frontend UI to dist/
npm run build

# Build both NSIS Setup Installer and Portable Executables
npm run build:exe

# Or double-click the included batch builder
build_all_executables.bat
```

---

## 🏗️ Architecture Overview

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Desktop Runtime**: Electron 45 with secure context isolation, preload script bridge, and custom borderless liquid-glass frame.
- **Native OS Bridge**: PowerShell CIM commands, Windows `powercfg`, `pnputil`, `reg.exe`, `sfc`, and `DISM`.
- **Packaging**: `electron-builder` producing NSIS installers and portable executables.

---

## 📄 License
Apache-2.0 License.
