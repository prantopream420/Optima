export type PowerProfileType = 'battery' | 'standard' | 'performance';

export interface PowerProfileConfig {
  id: PowerProfileType;
  name: string;
  tagline: string;
  description: string;
  guid: string;
  badgeColor: string;
  accentGlow: string;
  specs: {
    cpuMaxState: string;
    cpuMinState: string;
    coreParking: string;
    energyPreference: string;
    displayRefresh: string;
    fanRpmRange: string;
    fanPolicy: string;
    portPowerDelivery: string;
    gpuClockMode: string;
    ramProfile: string;
    visualEffects: string;
    estimatedBatteryLife: string;
    powerConsumptionWatts: number;
    targetFanRpm: number;
    clockSpeedGhz: number;
    cpuTempC: number;
  };
  powershellCmds: string[];
}

export interface DriverItem {
  id: string;
  name: string;
  category: 'Display' | 'Chipset' | 'Audio' | 'Network' | 'Storage' | 'USB' | 'Firmware' | 'Security';
  deviceInstanceId: string;
  installedVersion: string;
  latestVersion: string;
  releaseDate: string;
  downloadSize: string;
  provider: string;
  whqlCertified: boolean;
  status: 'up-to-date' | 'update-available' | 'updating' | 'updated';
  criticality: 'Recommended' | 'Security' | 'Performance' | 'Optional';
  releaseNotes: string;
}

export interface RestorePoint {
  id: string;
  name: string;
  createdAt: string;
  sequenceNumber: number;
  directoryPath: string;
  type: string;
  sizeMb: number;
  associatedAction: string;
}

export interface SystemHealthMetrics {
  healthScore: number;
  batteryHealthPct: number;
  batteryChargePct: number;
  batteryDischarging: boolean;
  batteryWearPct: number;
  cpuUsagePct: number;
  cpuClockSpeed: number;
  cpuTemp: number;
  gpuUsagePct: number;
  gpuTemp: number;
  ramUsageGb: number;
  ramTotalGb: number;
  ramFrequencyMhz: number;
  storageHealthPct: number;
  fanSpeedRpm: number;
  powerDrawWatts: number;
}

export interface MicrosoftAppStatus {
  id: string;
  name: string;
  version: string;
  activationStatus: 'Activated' | 'Active Subscription' | 'Pre-Installed' | 'Genuine OEM';
  licenseType: string;
  lastUpdated: string;
  category: 'Productivity' | 'Runtime' | 'Gaming' | 'Core OS';
  health: 'Nominal' | 'Update Ready' | 'Service Running';
}

export interface MotherboardDetails {
  manufacturer: string;
  productName: string;
  chipset: string;
  formFactor: string;
  pcieGeneration: string;
  biosVersion: string;
  biosDate: string;
  uefiMode: string;
  secureBoot: boolean;
  tpmVersion: string;
  resizableBar: boolean;
  ramSpecs: {
    totalSlots: number;
    occupiedSlots: number;
    maxSupportedCapacityGb: number;
    supportedTypes: string[];
    supportedSpeeds: string[];
    currentConfiguration: string;
    channelMode: string;
    slots: {
      slotNumber: number;
      occupied: boolean;
      moduleName?: string;
      capacityGb?: number;
      speedMhz?: number;
      manufacturer?: string;
      partNumber?: string;
    }[];
    upgradeAdvice: string;
  };
  storageSpecs: {
    totalM2Slots: number;
    m2Slots: {
      slot: string;
      speedGen: string;
      occupied: boolean;
      driveName?: string;
      driveSize?: string;
      readSpeed?: string;
      maxSupportedSize: string;
    }[];
    sataPorts: number;
    sataOccupied: number;
    upgradeAdvice: string;
  };
}

export interface CorruptionCheckItem {
  id: string;
  name: string;
  command: string;
  description: string;
  status: 'idle' | 'checking' | 'corrupted' | 'clean' | 'repairing' | 'repaired';
  severity: 'Critical' | 'Warning' | 'Healthy';
  detectedIssue?: string;
  repairDetails?: string;
}

export interface HiddenTweak {
  id: string;
  name: string;
  category: 'Performance' | 'UI & Visuals' | 'Privacy' | 'System Power';
  description: string;
  registryPath: string;
  valueName: string;
  enabledValue: string | number;
  disabledValue: string | number;
  enabled: boolean;
  impact: string;
  requiresRestart: boolean;
}
