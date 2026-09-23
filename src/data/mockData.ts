import {
  PowerProfileConfig,
  DriverItem,
  RestorePoint,
  MicrosoftAppStatus,
  MotherboardDetails,
  CorruptionCheckItem,
  HiddenTweak
} from '../types';

export const POWER_PROFILES: Record<string, PowerProfileConfig> = {
  battery: {
    id: 'battery',
    name: 'Battery Saver Eco',
    tagline: 'Maximum Endurance · Undisturbed Daily Workflow',
    description: 'Throttles background telemetry, caps CPU frequency to optimal thermal efficiency, parks idle cores, and engages intelligent USB suspend while keeping office tools, media, and web browsing silky smooth.',
    guid: 'a1841308-3541-4fab-bc81-f71556f20b4a',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accentGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    specs: {
      cpuMaxState: '70% Frequency Cap (Energy Efficient)',
      cpuMinState: '5% Low Voltage Idle',
      coreParking: 'Aggressive (4 of 8 E/P-cores parked on idle)',
      energyPreference: 'Intel SpeedShift / AMD CPPC = 90 (Max Power Savings)',
      displayRefresh: 'Dynamic 60 Hz (Adaptive Sync)',
      fanRpmRange: '1,100 – 1,600 RPM (Whisper-Quiet)',
      fanPolicy: 'Passive Cooling Governor',
      portPowerDelivery: 'Selective Suspend Enabled (Idle ports sleep after 1s)',
      gpuClockMode: 'Integrated GPU Priority / Discrete GPU in Low-D3 state',
      ramProfile: 'JEDEC Low-Voltage State (1.1V)',
      visualEffects: 'Optimized standard animations, minimal background blurs',
      estimatedBatteryLife: '8 hrs 45 mins',
      powerConsumptionWatts: 14.8,
      targetFanRpm: 1250,
      clockSpeedGhz: 1.85,
      cpuTempC: 43
    },
    powershellCmds: [
      'powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 70',
      'powercfg /setdcvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 65',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 0',
      'powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 2',
      'powercfg /setacvalueindex SCHEME_CURRENT 7516b95f-f776-4464-8c53-06167f40cc99 3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e 1'
    ]
  },
  standard: {
    id: 'standard',
    name: 'Standard Balanced',
    tagline: 'Windows Factory Default · Dynamic Power & Response',
    description: 'Dynamic power scaling matching user workload in real-time. Instantly ramps CPU clock speeds for computational bursts while preserving thermal comfort and standard system fan curves.',
    guid: '381b4222-f694-41f0-9685-ff5bb260df2e',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    accentGlow: 'from-sky-500/20 via-blue-500/10 to-transparent',
    specs: {
      cpuMaxState: '100% Dynamic Scaling',
      cpuMinState: '5% Idle',
      coreParking: 'Standard Windows Governor (All cores available on demand)',
      energyPreference: 'Energy Bias = 50 (Dynamic Balanced)',
      displayRefresh: '120 Hz Variable Refresh Rate',
      fanRpmRange: '1,800 – 2,700 RPM (Balanced Acoustic Profile)',
      fanPolicy: 'Active Cooling Policy',
      portPowerDelivery: 'Standard USB Selective Suspend on 10m idle',
      gpuClockMode: 'Dynamic Hybrid Switching (NVIDIA Advanced Optimus)',
      ramProfile: 'Standard DDR5 JEDEC Standard 4800/5200',
      visualEffects: 'Full Windows Aero & Mica translucency enabled',
      estimatedBatteryLife: '4 hrs 50 mins',
      powerConsumptionWatts: 38.5,
      targetFanRpm: 2150,
      clockSpeedGhz: 3.40,
      cpuTempC: 56
    },
    powershellCmds: [
      'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 5',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2',
      'powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 1'
    ]
  },
  performance: {
    id: 'performance',
    name: 'Ultimate Performance',
    tagline: 'Uncapped Clocks · Max Cooling · 100% Port Power Delivery',
    description: 'Unlocks unconstrained processor states, prevents CPU core parking, ramps cooling fans to high performance curves, activates high-speed RAM timings, forces full power across all USB/Thunderbolt ports, and enables full liquid glass transparency & GPU hardware acceleration.',
    guid: 'e9a42b02-d5df-448d-aa00-03f14749eb61',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accentGlow: 'from-amber-500/25 via-rose-500/15 to-transparent',
    specs: {
      cpuMaxState: '100% Unlocked Turbo Boost Max 3.0 / All-Core Boost',
      cpuMinState: '100% Zero-Latency Readiness (0 core downclocking)',
      coreParking: 'Disabled (All 16 threads permanently active)',
      energyPreference: 'Energy Bias = 0 (Maximum Raw Compute Performance)',
      displayRefresh: '165 Hz / 240 Hz Ultra-Fluid G-Sync Mode',
      fanRpmRange: '3,800 – 4,800 RPM (High Velocity Vapor Cooling)',
      fanPolicy: 'High Performance Active Aggressive Fan Curve',
      portPowerDelivery: 'All USB-C, Thunderbolt & Type-A Ports at 100% Full Power (Zero Sleeping)',
      gpuClockMode: 'Discrete GPU Permanent P0 State (Full Boost Clock + VRAM OC)',
      ramProfile: 'Intel XMP 3.0 / AMD EXPO Peak Latency & Bandwidth',
      visualEffects: 'Full GPU DWM composition, liquid glass transparency, 100% smooth animations',
      estimatedBatteryLife: '1 hr 45 mins (Plugged-In Recommended)',
      powerConsumptionWatts: 92.4,
      targetFanRpm: 4200,
      clockSpeedGhz: 4.85,
      cpuTempC: 72
    },
    powershellCmds: [
      'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61',
      'powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100',
      'powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2',
      'powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0',
      'powercfg /setacvalueindex SCHEME_CURRENT 7516b95f-f776-4464-8c53-06167f40cc99 3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e 0',
      'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerSettings\\54533251-82be-4824-96c1-47b60b740d00\\0cc5b647-c1df-4637-891a-dec60c318583" -Name "Attributes" -Value 0'
    ]
  }
};

export const INITIAL_DRIVERS: DriverItem[] = [
  {
    id: 'drv-gpu-nv',
    name: 'NVIDIA GeForce RTX 4070 Laptop GPU',
    category: 'Display',
    deviceInstanceId: 'PCI\\VEN_10DE&DEV_28E0&SUBSYS_139D1043&REV_A1',
    installedVersion: '32.0.15.5585 (v555.85)',
    latestVersion: '32.0.15.6094 (v560.94 Game Ready)',
    releaseDate: 'September 18, 2026',
    downloadSize: '685 MB',
    provider: 'NVIDIA Corporation',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Performance',
    releaseNotes: 'Optimizes DLSS 3.5 Frame Generation, improves DirectX 12 Ultimate shader compilation, and fixes thermal throttle spikes on modern mobile GPUs.'
  },
  {
    id: 'drv-cpu-igpu',
    name: 'Intel(R) Iris(R) Xe Graphics / Arc Family',
    category: 'Display',
    deviceInstanceId: 'PCI\\VEN_8086&DEV_A7A0&SUBSYS_139D1043&REV_04',
    installedVersion: '31.0.101.5333',
    latestVersion: '31.0.101.5590 WHQL',
    releaseDate: 'September 12, 2026',
    downloadSize: '412 MB',
    provider: 'Intel Corporation',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Recommended',
    releaseNotes: 'Enhances energy efficiency during 4K 10-bit AV1 video decode and reduces battery drain by up to 14% on Windows 11 24H2.'
  },
  {
    id: 'drv-chipset-me',
    name: 'Intel Management Engine Interface (HECI)',
    category: 'Chipset',
    deviceInstanceId: 'PCI\\VEN_8086&DEV_7A68&SUBSYS_139D1043&REV_11',
    installedVersion: '2340.5.21.0',
    latestVersion: '2418.6.2.0 Consumer MEI',
    releaseDate: 'August 29, 2026',
    downloadSize: '78 MB',
    provider: 'Intel Corporation',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Security',
    releaseNotes: 'Addresses Intel Security Advisory INTEL-SA-00993 regarding buffer validation in firmware communication layers.'
  },
  {
    id: 'drv-wifi',
    name: 'Intel(R) Wi-Fi 6E AX211 160MHz Adapter',
    category: 'Network',
    deviceInstanceId: 'PCI\\VEN_8086&DEV_7AF0&SUBSYS_00948086&REV_11',
    installedVersion: '23.40.0.4',
    latestVersion: '23.60.1.2 Official',
    releaseDate: 'September 04, 2026',
    downloadSize: '42 MB',
    provider: 'Intel Corporation',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Performance',
    releaseNotes: 'Improves roaming stability on 6 GHz WPA3 Enterprise channels and eliminates intermittent connection drops when resuming from Modern Standby.'
  },
  {
    id: 'drv-bt',
    name: 'Intel(R) Wireless Bluetooth 5.3 Controller',
    category: 'Network',
    deviceInstanceId: 'USB\\VID_8087&PID_0033&REV_0000',
    installedVersion: '23.40.0.1',
    latestVersion: '23.60.0.1 WHQL',
    releaseDate: 'September 04, 2026',
    downloadSize: '36 MB',
    provider: 'Intel Corporation',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Recommended',
    releaseNotes: 'Resolves Bluetooth LE Audio LE-Sync stutter during multi-device low latency headphone pairing.'
  },
  {
    id: 'drv-audio',
    name: 'Realtek High Definition Audio (SST Codec)',
    category: 'Audio',
    deviceInstanceId: 'HDAUDIO\\FUNC_01&VEN_10EC&DEV_0285&SUBSYS_1043139D',
    installedVersion: '6.0.9655.1',
    latestVersion: '6.0.9710.1 WHQL Driver',
    releaseDate: 'August 14, 2026',
    downloadSize: '124 MB',
    provider: 'Realtek Semiconductor Corp.',
    whqlCertified: true,
    status: 'update-available',
    criticality: 'Optional',
    releaseNotes: 'Enhances microphone noise cancellation algorithm and spatial audio processing in Windows Sonic & Dolby.'
  },
  {
    id: 'drv-nvme',
    name: 'Samsung NVMe Controller (PCIe Gen 4.0)',
    category: 'Storage',
    deviceInstanceId: 'PCI\\VEN_144D&DEV_A80A&SUBSYS_A801144D&REV_00',
    installedVersion: '3.3.0.2003',
    latestVersion: '3.3.0.2003',
    releaseDate: 'June 20, 2025',
    downloadSize: '18 MB',
    provider: 'Samsung Electronics',
    whqlCertified: true,
    status: 'up-to-date',
    criticality: 'Optional',
    releaseNotes: 'Current driver is optimal. DirectStorage 1.2 throughput operating at maximum 7,450 MB/s.'
  },
  {
    id: 'drv-thunderbolt',
    name: 'Intel(R) Thunderbolt(TM) 4 Retimer Controller',
    category: 'USB',
    deviceInstanceId: 'PCI\\VEN_8086&DEV_7EC2&SUBSYS_139D1043&REV_01',
    installedVersion: '1.41.1340.0',
    latestVersion: '1.41.1340.0',
    releaseDate: 'May 11, 2026',
    downloadSize: '29 MB',
    provider: 'Intel Corporation',
    whqlCertified: true,
    status: 'up-to-date',
    criticality: 'Recommended',
    releaseNotes: 'Firmware NVM 42 is up-to-date. Supports 40 Gbps bi-directional throughput and 100W USB-PD.'
  },
  {
    id: 'drv-tpm',
    name: 'Trusted Platform Module 2.0 Security Device',
    category: 'Security',
    deviceInstanceId: 'ACPI\\MSFT0101\\1',
    installedVersion: '10.0.26100.1150',
    latestVersion: '10.0.26100.1150',
    releaseDate: 'August 01, 2026',
    downloadSize: '8 MB',
    provider: 'Microsoft Windows Hardware Compatibility',
    whqlCertified: true,
    status: 'up-to-date',
    criticality: 'Security',
    releaseNotes: 'Hardware Root of Trust verified. Attestation and BitLocker keys are intact.'
  }
];

export const INITIAL_RESTORE_POINTS: RestorePoint[] = [
  {
    id: 'rp-initial-sys',
    name: 'AeroOptima_Baseline_SystemCheckpoint',
    createdAt: '2026-09-21 14:22:10 UTC',
    sequenceNumber: 139,
    directoryPath: 'C:\\System Volume Information\\{3b7a12c8-99e4-4fa0-82d2-5a1c90f23b12}\\',
    type: 'DEVICE_DRIVER_INSTALL',
    sizeMb: 1420,
    associatedAction: 'Initial System Hardware Snapshot before AeroOptima session'
  },
  {
    id: 'rp-winupdate',
    name: 'Windows Update KB5043076 Cumulative Checkpoint',
    createdAt: '2026-09-15 08:45:30 UTC',
    sequenceNumber: 138,
    directoryPath: 'C:\\System Volume Information\\{78a4b221-3e09-482a-bc91-23d45ef890a1}\\',
    type: 'WINDOWS_UPDATE',
    sizeMb: 2150,
    associatedAction: 'Automatic OS update restore point'
  }
];

export const MOTHERBOARD_DATA: MotherboardDetails = {
  manufacturer: 'ASUSTeK COMPUTER INC.',
  productName: 'ROG STRIX B650E-F / G614JVR Laptop Architecture',
  chipset: 'AMD B650E / Intel HM770 Ultra Chipset Bus',
  formFactor: 'Custom High-Density Mobile PCB / ATX Standard Spec',
  pcieGeneration: 'PCIe 5.0 (x16 Link Bus for Primary GPU/SSD)',
  biosVersion: 'American Megatrends UEFI v3204 (G614JVR.324)',
  biosDate: 'August 14, 2026',
  uefiMode: 'UEFI x64 Native (CSM Disabled)',
  secureBoot: true,
  tpmVersion: 'TPM 2.0 (AMD fTPM / Intel PTT Active)',
  resizableBar: true,
  ramSpecs: {
    totalSlots: 4,
    occupiedSlots: 2,
    maxSupportedCapacityGb: 128,
    supportedTypes: ['DDR5 SO-DIMM', 'DDR5 UDIMM'],
    supportedSpeeds: ['DDR5-4800', 'DDR5-5200', 'DDR5-5600', 'DDR5-6000 (XMP/EXPO)', 'DDR5-6400 (OC)'],
    currentConfiguration: '32 GB Installed (2x 16GB Dual-Channel 128-bit)',
    channelMode: 'Dual-Channel (2x 32-bit subchannels per module)',
    slots: [
      {
        slotNumber: 1,
        occupied: true,
        moduleName: 'Micron Technology DDR5 SO-DIMM',
        capacityGb: 16,
        speedMhz: 5600,
        manufacturer: 'Micron / Crucial',
        partNumber: 'CT16G56C46S5.M8G1'
      },
      {
        slotNumber: 2,
        occupied: true,
        moduleName: 'Micron Technology DDR5 SO-DIMM',
        capacityGb: 16,
        speedMhz: 5600,
        manufacturer: 'Micron / Crucial',
        partNumber: 'CT16G56C46S5.M8G1'
      },
      {
        slotNumber: 3,
        occupied: false
      },
      {
        slotNumber: 4,
        occupied: false
      }
    ],
    upgradeAdvice: '2 slots are currently empty. You can add two additional 16GB or 32GB DDR5-5600 modules to expand system memory up to 64GB or 96GB without replacing existing RAM. For maximum 128GB capacity, install four 32GB DDR5-5600 CL40/CL36 matched kits.'
  },
  storageSpecs: {
    totalM2Slots: 3,
    m2Slots: [
      {
        slot: 'M.2 Slot 1 (Primary OS Drive)',
        speedGen: 'PCIe 5.0 x4 M-Key NVMe (Direct to CPU)',
        occupied: true,
        driveName: 'Samsung SSD 990 PRO 1TB',
        driveSize: '1,000.2 GB (931.5 GiB)',
        readSpeed: '7,450 MB/s Sequential Read',
        maxSupportedSize: 'Up to 8 TB M.2 2280'
      },
      {
        slot: 'M.2 Slot 2 (Secondary Expansion Slot)',
        speedGen: 'PCIe 4.0 x4 M-Key NVMe (PCH Connected)',
        occupied: false,
        maxSupportedSize: 'Up to 8 TB M.2 2280 NVMe SSD (Speeds up to 7,500 MB/s)'
      },
      {
        slot: 'M.2 Slot 3 (Tertiary Storage)',
        speedGen: 'PCIe 4.0 x4 / SATA Compatible M-Key 2242/2280',
        occupied: false,
        maxSupportedSize: 'Up to 4 TB NVMe or SATA M.2'
      }
    ],
    sataPorts: 4,
    sataOccupied: 0,
    upgradeAdvice: 'M.2 Slot 2 is currently empty and supports blazing-fast PCIe 4.0 x4 NVMe SSDs (like Samsung 990 Pro, WD Black SN850X, or Crucial T500). Installing a 2TB or 4TB drive in Slot 2 requires no OS reinstall—instant plug-and-play secondary drive formatted in seconds.'
  }
};

export const MICROSOFT_APPS: MicrosoftAppStatus[] = [
  {
    id: 'app-m365',
    name: 'Microsoft 365 Apps for Enterprise (Word, Excel, PowerPoint, Outlook)',
    version: '2408 (Build 17928.20156 Click-to-Run)',
    activationStatus: 'Active Subscription',
    licenseType: 'Microsoft 365 E5 / Enterprise Linked Account',
    lastUpdated: 'September 14, 2026',
    category: 'Productivity',
    health: 'Nominal'
  },
  {
    id: 'app-edge',
    name: 'Microsoft Edge Chromium Browser (64-bit)',
    version: '129.0.2792.52 Stable',
    activationStatus: 'Genuine OEM',
    licenseType: 'Integrated Windows System Component',
    lastUpdated: 'September 20, 2026',
    category: 'Core OS',
    health: 'Nominal'
  },
  {
    id: 'app-terminal',
    name: 'Windows Terminal Pro (PowerShell 7 & CMD)',
    version: '1.20.11781.0',
    activationStatus: 'Activated',
    licenseType: 'Microsoft Store Certified Package',
    lastUpdated: 'August 30, 2026',
    category: 'Core OS',
    health: 'Nominal'
  },
  {
    id: 'app-xbox',
    name: 'Xbox Game Bar & Gaming Services Engine',
    version: '5.823.1271.0 / 18.86.13001.0',
    activationStatus: 'Activated',
    licenseType: 'Xbox Network Digital Entitlement',
    lastUpdated: 'September 10, 2026',
    category: 'Gaming',
    health: 'Nominal'
  },
  {
    id: 'app-dx12',
    name: 'DirectX 12 Ultimate (Agility SDK & Shader Model 6.7)',
    version: 'Direct3D 12.2 (Level 12_2)',
    activationStatus: 'Genuine OEM',
    licenseType: 'Windows Hardware Abstraction Driver',
    lastUpdated: 'September 01, 2026',
    category: 'Gaming',
    health: 'Nominal'
  },
  {
    id: 'app-dotnet',
    name: 'Microsoft .NET Desktop Runtime (x64)',
    version: '8.0.8 (v8.0.33918 LTS)',
    activationStatus: 'Activated',
    licenseType: 'Microsoft MIT Open Runtimes',
    lastUpdated: 'August 12, 2026',
    category: 'Runtime',
    health: 'Nominal'
  },
  {
    id: 'app-vcredist',
    name: 'Microsoft Visual C++ 2015-2022 Redistributable (x64)',
    version: '14.40.33810.0',
    activationStatus: 'Activated',
    licenseType: 'Windows Native Component',
    lastUpdated: 'July 18, 2026',
    category: 'Runtime',
    health: 'Nominal'
  },
  {
    id: 'app-wsl2',
    name: 'Windows Subsystem for Linux (WSL 2 Core)',
    version: 'Kernel 5.15.153.1-microsoft-standard-WSL2',
    activationStatus: 'Activated',
    licenseType: 'Windows Optional Feature (Active)',
    lastUpdated: 'September 02, 2026',
    category: 'Core OS',
    health: 'Service Running'
  }
];

export const CORRUPTION_CHECKS: CorruptionCheckItem[] = [
  {
    id: 'chk-sfc',
    name: 'System File Checker (SFC Scan)',
    command: 'sfc /scannow',
    description: 'Scans all protected Windows system files (DLLs, SYS, EXE) and replaces corrupted or tampered files with genuine Microsoft signed cached copies from %WinDir%\\System32\\dllcache.',
    status: 'corrupted',
    severity: 'Warning',
    detectedIssue: 'Found 2 mismatched DLL signatures in Windows Resource Protection: opencl.dll and shell32.dll cache payload.',
    repairDetails: 'Will run automated SFC integrity rebuild and replace damaged files from the pristine Component Store.'
  },
  {
    id: 'chk-dism',
    name: 'Deployment Image Servicing & Management (DISM)',
    command: 'DISM /Online /Cleanup-Image /RestoreHealth',
    description: 'Validates the Windows Component Store (WinSxS) repository against official Windows Update manifests and repairs payload corruptions.',
    status: 'corrupted',
    severity: 'Critical',
    detectedIssue: 'Component Store payload hash mismatch detected in WinSxS manifest for servicing package KB5041585.',
    repairDetails: 'Will connect to Windows Component Store repair staging and rebuild healthy manifest state.'
  },
  {
    id: 'chk-chkdsk',
    name: 'NTFS Volume & File System Checker (CHKDSK)',
    command: 'chkdsk C: /scan /perf',
    description: 'Scans the Master File Table (MFT), file index records, security descriptors, and storage sector integrity on the system boot drive.',
    status: 'clean',
    severity: 'Healthy',
    detectedIssue: 'Volume C: file system structure is clean. 0 bad sectors detected across 931 GB partition.',
    repairDetails: 'No repair needed.'
  },
  {
    id: 'chk-wucache',
    name: 'Windows Update SoftwareDistribution Cache',
    command: 'net stop wuauserv & Remove-Item C:\\Windows\\SoftwareDistribution\\Download',
    description: 'Checks for stalled, partially downloaded Windows Update installation packages that cause Windows Update error 0x80070002 or high disk usage.',
    status: 'corrupted',
    severity: 'Warning',
    detectedIssue: 'Stuck temporary update download cache payload (4.1 GB orphaned temporary data) detected in SoftwareDistribution folder.',
    repairDetails: 'Will safely stop update services, purge corrupt temp cache files, and restart Windows Update Orchestrator.'
  },
  {
    id: 'chk-network',
    name: 'Winsock & TCP/IP Network Stack Integrity',
    command: 'netsh winsock reset & netsh int ip reset & ipconfig /flushdns',
    description: 'Diagnoses corrupted Winsock Layered Service Providers (LSPs), stalled DNS resolver entries, and TCP/IP routing table stalls.',
    status: 'clean',
    severity: 'Healthy',
    detectedIssue: 'Network stack is healthy. DNS cache resolved in 1.4ms with zero corrupted socket providers.',
    repairDetails: 'No repair needed.'
  },
  {
    id: 'chk-dwm',
    name: 'DWM & Windows Shell Compositor Health',
    command: 'taskkill /F /IM explorer.exe & start explorer.exe & Restart-Service -Name "UxSms"',
    description: 'Checks Desktop Window Manager (dwm.exe) memory leak status, acrylic glass rendering pipeline, and taskbar responsiveness.',
    status: 'clean',
    severity: 'Healthy',
    detectedIssue: 'DWM compositor responding normally at 120 FPS with 42 MB working set memory.',
    repairDetails: 'No repair needed.'
  }
];

export const HIDDEN_TWEAKS: HiddenTweak[] = [
  {
    id: 'twk-ultimate-power',
    name: 'Unlock Ultimate Performance Power Plan',
    category: 'System Power',
    description: 'Unlocks the secret Windows 10/11 "Ultimate Performance" OEM power plan designed exclusively for high-end workstations and extreme compute rigs.',
    registryPath: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61',
    valueName: 'SchemeGUID',
    enabledValue: 'e9a42b02-d5df-448d-aa00-03f14749eb61',
    disabledValue: '381b4222-f694-41f0-9685-ff5bb260df2e',
    enabled: true,
    impact: 'Eliminates all CPU frequency sleep states, reduces DPC latency by up to 28%.',
    requiresRestart: false
  },
  {
    id: 'twk-classic-menu',
    name: 'Classic Full Context Menu in Windows 11',
    category: 'UI & Visuals',
    description: 'Bypasses Windows 11 collapsed "Show more options" right-click menu and brings back the instantaneous, full classic Windows right-click context menu.',
    registryPath: 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32',
    valueName: '(Default)',
    enabledValue: '',
    disabledValue: 'DELETED',
    enabled: true,
    impact: 'Saves 1 click on every file right-click action, accelerates file management speed.',
    requiresRestart: true
  },
  {
    id: 'twk-god-mode',
    name: 'Deploy Windows "God Mode" Master Control Panel',
    category: 'UI & Visuals',
    description: 'Generates a special desktop folder containing 200+ direct shortcuts to every buried Windows administration, hardware tuning, and networking tool in one consolidated view.',
    registryPath: 'Desktop\\GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}',
    valueName: 'FolderCreation',
    enabledValue: 1,
    disabledValue: 0,
    enabled: false,
    impact: 'One-click access to every advanced Windows administration setting.',
    requiresRestart: false
  },
  {
    id: 'twk-disable-telemetry',
    name: 'Disable Windows Diagnostic Telemetry & Ad Tracking',
    category: 'Privacy',
    description: 'Disables background Customer Experience Improvement Program (CEIP), advertising ID tracking, and diagtrack services to save background CPU cycles.',
    registryPath: 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection',
    valueName: 'AllowTelemetry',
    enabledValue: 0,
    disabledValue: 3,
    enabled: true,
    impact: 'Prevents telemetry data upload spikes and reduces background disk I/O activity.',
    requiresRestart: true
  },
  {
    id: 'twk-disable-bing-search',
    name: 'Disable Bing Web Search in Start Menu',
    category: 'Performance',
    description: 'Stops Windows from querying Bing web search results every time you search for local apps or files in the Start Menu, making Start Menu searching instantaneous.',
    registryPath: 'HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer',
    valueName: 'DisableSearchBoxSuggestions',
    enabledValue: 1,
    disabledValue: 0,
    enabled: true,
    impact: 'Start menu searches open local programs instantly with 0ms internet latency delay.',
    requiresRestart: false
  },
  {
    id: 'twk-end-task',
    name: 'Enable "End Task" on Taskbar Right-Click',
    category: 'UI & Visuals',
    description: 'Enables the hidden Windows 11 feature that lets you instantly force-close any frozen application directly from its taskbar icon without opening Task Manager.',
    registryPath: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced',
    valueName: 'TaskbarEndTask',
    enabledValue: 1,
    disabledValue: 0,
    enabled: true,
    impact: 'Instantly terminate unresponsive games and software in 1 click.',
    requiresRestart: false
  },
  {
    id: 'twk-hags',
    name: 'Hardware-Accelerated GPU Scheduling (HAGS)',
    category: 'Performance',
    description: 'Allows the GPU to directly manage its own video memory rather than passing commands through the OS kernel, reducing input lag and micro-stutters.',
    registryPath: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers',
    valueName: 'HwSchMode',
    enabledValue: 2,
    disabledValue: 1,
    enabled: true,
    impact: 'Increases 1% low FPS and reduces render latency in DirectX 12 games.',
    requiresRestart: true
  },
  {
    id: 'twk-network-throttling',
    name: 'Disable Network Throttling Index',
    category: 'Performance',
    description: 'Windows by default restricts non-multimedia network traffic to 10 packets/ms to prioritize audio. Disabling this unlocks unthrottled gigabit packet transmission.',
    registryPath: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile',
    valueName: 'NetworkThrottlingIndex',
    enabledValue: 'ffffffff',
    disabledValue: '0000000a',
    enabled: true,
    impact: 'Lowers ping fluctuations and packet delay during online gaming and streaming.',
    requiresRestart: false
  },
  {
    id: 'twk-verbose-boot',
    name: 'Enable Verbose Startup & Shutdown Messages',
    category: 'UI & Visuals',
    description: 'Replaces generic "Please wait" or spinning dots on boot and shutdown with detailed diagnostic status messages (e.g. "Starting Group Policy Service...", "Closing Explorer").',
    registryPath: 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System',
    valueName: 'VerboseStatus',
    enabledValue: 1,
    disabledValue: 0,
    enabled: false,
    impact: 'Know exactly which service or driver is causing slow boot or shutdown delays.',
    requiresRestart: true
  },
  {
    id: 'twk-disable-auto-restart',
    name: 'Disable Auto-Restart on System Failure (BSOD)',
    category: 'System Power',
    description: 'Prevents Windows from instantly rebooting when a Blue Screen occurs, giving you time to read the exact error code (e.g., WHEA_UNCORRECTABLE_ERROR) and driver name.',
    registryPath: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\CrashControl',
    valueName: 'AutoReboot',
    enabledValue: 0,
    disabledValue: 1,
    enabled: true,
    impact: 'Crucial for troubleshooting driver or hardware stability issues.',
    requiresRestart: false
  },
  {
    id: 'twk-usb-power',
    name: 'Disable USB Selective Suspend (Keep Ports Powered)',
    category: 'System Power',
    description: 'Prevents the USB hub driver from turning off USB and audio DAC ports to save power, which frequently causes external audio dropouts and mouse disconnects.',
    registryPath: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR',
    valueName: 'DisableSelectiveSuspend',
    enabledValue: 1,
    disabledValue: 0,
    enabled: true,
    impact: 'Eliminates audio popping on USB DACs and prevents USB audio/controller dropouts.',
    requiresRestart: false
  },
  {
    id: 'twk-transparency',
    name: 'Force High-Performance Acrylic & Mica Transparency',
    category: 'UI & Visuals',
    description: 'Forces full DirectX hardware acceleration for Windows Mica, Acrylic blur, and liquid glass window reflections across all desktop windows.',
    registryPath: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize',
    valueName: 'EnableTransparency',
    enabledValue: 1,
    disabledValue: 0,
    enabled: true,
    impact: 'Delivers full liquid glass aesthetics without sacrificing GPU performance.',
    requiresRestart: false
  }
];
