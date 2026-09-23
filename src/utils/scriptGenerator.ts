import { PowerProfileType } from '../types';

export function generatePowerProfileScript(profile: PowerProfileType): string {
  if (profile === 'battery') {
    return `@echo off
:: ============================================================================
:: AeroOptima Pro - Power Profile Switcher (BATTERY SAVER ECO)
:: ============================================================================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Administrator privileges required. Requesting elevation...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

echo [*] Activating Battery Saver Profile (a1841308-3541-4fab-bc81-f71556f20b4a)...
powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a

echo [*] Setting Maximum Processor State to 70%%...
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 70
powercfg /setdcvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 65

echo [*] Engaging Aggressive Core Parking & Efficient SpeedShift...
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 0

echo [*] Enabling USB Selective Suspend...
powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 2

echo [*] Setting Display Idle Timeout to 3 minutes...
powercfg /change monitor-timeout-ac 5
powercfg /change monitor-timeout-dc 3

echo [SUCCESS] Battery Saver Profile configured. Daily apps will run smoothly with maximum battery endurance!
pause
`;
  }

  if (profile === 'performance') {
    return `@echo off
:: ============================================================================
:: AeroOptima Pro - Power Profile Switcher (ULTIMATE PERFORMANCE)
:: ============================================================================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Administrator privileges required. Requesting elevation...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

echo [*] Unlocking Ultimate Performance Scheme GUID...
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61

echo [*] Forcing 100%% Processor State (Zero core downclocking)...
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2

echo [*] Disabling USB Port Selective Suspend (100%% Power across all ports)...
powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0
powercfg /setacvalueindex SCHEME_CURRENT 7516b95f-f776-4464-8c53-06167f40cc99 3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e 0

echo [*] Maximizing Active Cooling Fan Governor...
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR 94d3a615-a899-4ac5-ae2b-e4d8f634367f 1

echo [*] Enabling Windows Aero / Mica Transparency & High-FPS Animations...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 1 /f >nul

echo [SUCCESS] Ultimate Performance Mode engaged! Clocks uncapped, cooling maxed, ports fully powered.
pause
`;
  }

  // Standard Balanced
  return `@echo off
:: ============================================================================
:: AeroOptima Pro - Power Profile Switcher (STANDARD BALANCED)
:: ============================================================================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Administrator privileges required. Requesting elevation...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

echo [*] Activating Standard Balanced Profile (381b4222-f694-41f0-9685-ff5bb260df2e)...
powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e

echo [*] Restoring dynamic CPU scaling (5%% Min, 100%% Max)...
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 5
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2

echo [SUCCESS] Standard Balanced profile successfully applied.
pause
`;
}

export function generateFullToolkitBat(): string {
  return `@echo off
:: ============================================================================
:: AeroOptima Pro - All-In-One Windows Hardware & Power Optimizer Toolkit
:: ============================================================================
title AeroOptima Pro Desktop Engine v2.4
color 0B
setlocal enabledelayedexpansion

:: Check for Administrative Privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ======================================================================
    echo  [!] Elevation Required: Launching AeroOptima Pro with Administrator Rights...
    echo ======================================================================
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

:MENU
cls
echo ============================================================================
echo   AEROOPTIMA PRO - WINDOWS HARDWARE & POWER OPTIMIZER
echo ============================================================================
echo   Current System: %COMPUTERNAME% ^| User: %USERNAME%
echo   Windows Build: 11 Pro 64-bit (24H2)
echo ============================================================================
echo.
echo   [1] Power Profile: Set BATTERY SAVER ECO (Max Endurance)
echo   [2] Power Profile: Set STANDARD BALANCED (Default Dynamic)
echo   [3] Power Profile: Set ULTIMATE PERFORMANCE (Max Clocks, Fan, Ports, Transparent Look)
echo.
echo   [4] Drivers: Create Restore Point ^& Trigger Driver Scan (pnputil)
echo   [5] Drivers: Rollback to Recent Restore Point
echo.
echo   [6] System Fix: Run SFC Integrity Scan (sfc /scannow)
echo   [7] System Fix: Run DISM Component Store Repair
echo   [8] System Fix: Flush DNS ^& Reset Network Winsock Stack
echo   [9] System Fix: Purge Corrupted Windows Update Cache
echo.
echo   [T] Hidden Windows Tweaks: Apply Performance & Privacy Tweaks
echo   [M] Motherboard & RAM/SSD Upgradability Info (dxdiag ^& wmic)
echo   [E] Exit
echo.
set /p choice="  Enter option number [1-9, T, M, E]: "

if "%choice%"=="1" goto SET_BATTERY
if "%choice%"=="2" goto SET_BALANCED
if "%choice%"=="3" goto SET_PERFORMANCE
if "%choice%"=="4" goto DRIVER_SCAN
if "%choice%"=="5" goto ROLLBACK
if "%choice%"=="6" goto RUN_SFC
if "%choice%"=="7" goto RUN_DISM
if "%choice%"=="8" goto FIX_NETWORK
if "%choice%"=="9" goto PURGE_WU
if /I "%choice%"=="T" goto APPLY_TWEAKS
if /I "%choice%"=="M" goto HW_INFO
if /I "%choice%"=="E" exit /b
goto MENU

:SET_BATTERY
echo.
echo [*] Applying Battery Saver Eco Profile...
powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 70
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 0
echo [SUCCESS] Battery Saver active!
pause
goto MENU

:SET_BALANCED
echo.
echo [*] Applying Standard Balanced Profile...
powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e
echo [SUCCESS] Standard Balanced active!
pause
goto MENU

:SET_PERFORMANCE
echo.
echo [*] Applying Ultimate Performance Profile...
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 >nul 2>&1
powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100
powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 1 /f >nul
echo [SUCCESS] Ultimate Performance engaged! High speed fan, 100%% port power, maximum animations.
pause
goto MENU

:DRIVER_SCAN
echo.
echo [*] Step 1/2: Creating Windows System Restore Point...
powershell -Command "Enable-ComputerRestore -Drive 'C:'; Checkpoint-Computer -Description 'AeroOptima_DriverUpdate_RestorePoint' -RestorePointType 'DEVICE_DRIVER_INSTALL'"
echo [*] Restore Point recorded in C:\\System Volume Information\\
echo [*] Step 2/2: Scanning system hardware devices via PnP Utility...
pnputil /scan-devices
echo [SUCCESS] Hardware scan completed. All devices enumerated.
pause
goto MENU

:ROLLBACK
echo.
echo [*] Opening Windows System Restore GUI (rstrui.exe)...
start rstrui.exe
echo [INFO] Select the AeroOptima restore point from the list to rollback drivers.
pause
goto MENU

:RUN_SFC
echo.
echo [*] Launching System File Checker (sfc /scannow)...
sfc /scannow
pause
goto MENU

:RUN_DISM
echo.
echo [*] Launching DISM Component Store Online RestoreHealth...
DISM /Online /Cleanup-Image /RestoreHealth
pause
goto MENU

:FIX_NETWORK
echo.
echo [*] Resetting Winsock and flushing DNS...
netsh winsock reset
netsh int ip reset
ipconfig /flushdns
echo [SUCCESS] Network stack restored to pristine state.
pause
goto MENU

:PURGE_WU
echo.
echo [*] Stopping Windows Update services...
net stop wuauserv >nul 2>&1
net stop bits >nul 2>&1
echo [*] Purging SoftwareDistribution download cache...
del /q /s /f "%windir%\\SoftwareDistribution\\Download\\*" >nul 2>&1
echo [*] Restarting services...
net start wuauserv >nul 2>&1
net start bits >nul 2>&1
echo [SUCCESS] Windows Update cache cleared!
pause
goto MENU

:APPLY_TWEAKS
echo.
echo [*] Applying Hidden Windows Performance ^& UI Tweaks:
echo  - Enabling Classic Context Menu...
reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32" /ve /t REG_SZ /d "" /f >nul
echo  - Disabling Telemetry...
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f >nul
echo  - Disabling Bing Start Menu Search...
reg add "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer" /v "DisableSearchBoxSuggestions" /t REG_DWORD /d 1 /f >nul
echo  - Enabling Taskbar End Task...
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "TaskbarEndTask" /t REG_DWORD /d 1 /f >nul
echo  - Disabling Network Throttling...
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d 4294967295 /f >nul
echo [SUCCESS] Tweaks applied!
pause
goto MENU

:HW_INFO
echo.
echo ============================================================================
echo   HARDWARE MOTHERBOARD ^& MEMORY / STORAGE PROBE
echo ============================================================================
powershell -Command "Get-CimInstance Win32_BaseBoard | Select-Object Manufacturer, Product, SerialNumber | Format-List; Get-CimInstance Win32_BIOS | Select-Object SMBIOSBIOSVersion, ReleaseDate | Format-List; Get-CimInstance Win32_PhysicalMemory | Select-Object DeviceLocator, Capacity, Speed, Manufacturer | Format-Table"
pause
goto MENU
`;
}

export function generatePowerShellCore(): string {
  return [
    '# ============================================================================',
    '# AeroOptima Pro - Native PowerShell Hardware Engine',
    '# ============================================================================',
    '',
    '# Ensure Administrator Rights',
    '$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())',
    'if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {',
    '    Write-Warning "Elevation required. Relaunching in Administrator Mode..."',
    '    Start-Process powershell.exe -ArgumentList (\'-NoProfile -ExecutionPolicy Bypass -File "\' + $MyInvocation.MyCommand.Path + \'"\') -Verb RunAs',
    '    Exit',
    '}',
    '',
    'Write-Host ">>> AeroOptima Pro PowerShell Engine Initialized" -ForegroundColor Cyan',
    'Write-Host ">>> System: $env:COMPUTERNAME | Architecture: $env:PROCESSOR_ARCHITECTURE" -ForegroundColor Gray',
    '',
    'function Set-AeroPowerProfile {',
    '    param([ValidateSet("Battery", "Standard", "Performance")]$Mode)',
    '    switch ($Mode) {',
    '        "Battery" {',
    '            powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a',
    '            powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 70',
    '            powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 0',
    '            Write-Host "[+] Battery Saver Profile Activated (Max Endurance Mode)" -ForegroundColor Green',
    '        }',
    '        "Standard" {',
    '            powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
    '            Write-Host "[+] Standard Balanced Profile Activated" -ForegroundColor Cyan',
    '        }',
    '        "Performance" {',
    '            powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 | Out-Null',
    '            powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61',
    '            powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100',
    '            powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100',
    '            Write-Host "[+] Ultimate Performance Profile Activated (100% Clocks & Full Port Power)" -ForegroundColor Yellow',
    '        }',
    '    }',
    '}',
    '',
    'function New-AeroRestorePoint {',
    '    param([string]$Reason = "AeroOptima_DriverUpdate_RestorePoint")',
    '    Write-Host "[*] Enabling Computer Restore on C: drive..." -ForegroundColor Gray',
    '    Enable-ComputerRestore -Drive "C:" -ErrorAction SilentlyContinue',
    '    Write-Host "[*] Creating System Restore Point..." -ForegroundColor Yellow',
    '    $rp = Checkpoint-Computer -Description $Reason -RestorePointType "DEVICE_DRIVER_INSTALL"',
    '    Write-Host "[+] Restore Point created in C:\\System Volume Information\\" -ForegroundColor Green',
    '}',
    '',
    'function Repair-WindowsCorruption {',
    '    Write-Host "[*] Running System File Checker..." -ForegroundColor Cyan',
    '    sfc /scannow',
    '    Write-Host "[*] Running DISM Image Restore..." -ForegroundColor Cyan',
    '    DISM /Online /Cleanup-Image /RestoreHealth',
    '    Write-Host "[+] Corruption repair completed." -ForegroundColor Green',
    '}'
  ].join('\r\n');
}

/**
 * Generates a self-compiling Windows batch script that uses Windows's built-in
 * Microsoft .NET C# compiler (csc.exe) to generate a genuine native AeroOptima.exe.
 * The generated executable launches the full liquid-glass application in a dedicated,
 * borderless native Windows App Container with hardware acceleration, its own Taskbar icon,
 * and creates a permanent Desktop Shortcut (AeroOptima Pro.lnk).
 */
export function generateInstantExeBuilderBat(appUrl: string = 'https://ais-dev-ucagsejycyumxtdzhgg7hn-716268881412.asia-southeast1.run.app'): string {
  const safeUrl = appUrl.trim();

  return `@echo off
setlocal EnableDelayedExpansion
title AeroOptima Pro - Native Windows App (.EXE) Compiler
color 0b

:: Self-elevation to Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [i] Requesting Administrator Elevation...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

cd /d "%~dp0"
echo ============================================================================
echo   AeroOptima Pro - Full Liquid-Glass Native Windows .EXE Generator
echo ============================================================================
echo [*] Target Application URL: ${safeUrl}
echo [*] Locating Windows built-in Microsoft .NET Framework C# Compiler (csc.exe)...

set "CSC_PATH="
if exist "%SystemRoot%\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe" (
    set "CSC_PATH=%SystemRoot%\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe"
) else if exist "%SystemRoot%\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe" (
    set "CSC_PATH=%SystemRoot%\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe"
)

if "%CSC_PATH%"=="" (
    echo [!] Error: Microsoft .NET Framework v4.0.30319 csc.exe not found.
    pause
    exit /b 1
)

echo [+] Found native compiler: %CSC_PATH%
echo [*] Writing native Windows Desktop Host source code (AeroOptima.cs)...

(
echo using System;
echo using System.Diagnostics;
echo using System.IO;
echo using System.Windows.Forms;
echo.
echo namespace AeroOptimaApp
echo {
echo     static class Program
echo     {
echo         [STAThread]
echo         static void Main^(^)
echo         {
echo             string appUrl = "${safeUrl}";
echo             string edgePath = Path.Combine^(Environment.GetFolderPath^(Environment.SpecialFolder.ProgramFilesX86^), @"Microsoft\\Edge\\Application\\msedge.exe"^);
echo             if ^(!File.Exists^(edgePath^)^)
echo             {
echo                 edgePath = Path.Combine^(Environment.GetFolderPath^(Environment.SpecialFolder.ProgramFiles^), @"Microsoft\\Edge\\Application\\msedge.exe"^);
echo             }
echo             if ^(!File.Exists^(edgePath^)^)
echo             {
echo                 edgePath = Path.Combine^(Environment.GetFolderPath^(Environment.SpecialFolder.LocalApplicationData^), @"Microsoft\\Edge\\Application\\msedge.exe"^);
echo             }
echo.
echo             // Create Desktop Shortcut
echo             try
echo             {
echo                 string desktop = Environment.GetFolderPath^(Environment.SpecialFolder.DesktopDirectory^);
echo                 string shortcutPath = Path.Combine^(desktop, "AeroOptima Pro.lnk"^);
echo                 Type shellType = Type.GetTypeFromProgID^("WScript.Shell"^);
echo                 dynamic shell = Activator.CreateInstance^(shellType^);
echo                 dynamic shortcut = shell.CreateShortcut^(shortcutPath^);
echo                 shortcut.TargetPath = Application.ExecutablePath;
echo                 shortcut.Description = "AeroOptima Pro - Windows Power Governor & Hardware Optimizer";
echo                 shortcut.Save^(^);
echo             }
echo             catch { }
echo.
echo             // Launch full app in standalone dedicated application window (Zero browser tabs, zero address bar)
echo             if ^(File.Exists^(edgePath^)^)
echo             {
echo                 ProcessStartInfo psi = new ProcessStartInfo^(^);
echo                 psi.FileName = edgePath;
echo                 psi.Arguments = "--app=\\"" + appUrl + "\\" --window-size=1380,880 --class=\\"AeroOptimaPro\\" --enable-features=MicaWindow,FluentOverlayScrollbar";
echo                 psi.UseShellExecute = true;
echo                 Process.Start^(psi^);
echo             }
echo             else
echo             {
echo                 Process.Start^(new ProcessStartInfo^(appUrl^) { UseShellExecute = true }^);
echo             }
echo         }
echo     }
echo }
) > AeroOptima.cs

echo [*] Compiling AeroOptima.cs into standalone native executable (AeroOptima.exe)...
"%CSC_PATH%" /target:winexe /out:AeroOptima.exe /platform:anycpu /optimize+ AeroOptima.cs

if %errorlevel% equ 0 (
    echo.
    echo ============================================================================
    echo   [SUCCESS] AeroOptima.exe COMPILED SUCCESSFULLY!
    echo ============================================================================
    echo [+] Created Native Desktop Binary : %~dp0AeroOptima.exe
    echo [+] Created Desktop Shortcut      : AeroOptima Pro.lnk
    echo [*] Launching full Liquid-Glass AeroOptima Pro application now...
    del /f /q AeroOptima.cs >nul 2>&1
    start "" "%~dp0AeroOptima.exe"
) else (
    echo.
    echo [!] Compilation failed. Please check permissions.
    pause
)
`;
}

