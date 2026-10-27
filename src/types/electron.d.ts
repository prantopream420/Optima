export interface LivePerformanceStats {
  cpuPercent: number;
  ramTotalGb: number;
  ramFreeGb: number;
  ramUsedGb: number;
  ramPercent: number;
  activeScheme: {
    activeGuid: string;
    activeName: string;
  };
  timestamp: number;
}

export interface RealSystemOverview {
  system: {
    computerName: string;
    manufacturer: string;
    model: string;
    systemType: string;
    totalPhysicalRamGb: number;
  };
  motherboard: {
    manufacturer: string;
    product: string;
    serialNumber: string;
    version: string;
  };
  bios: {
    vendor: string;
    version: string;
    releaseDate: string;
  };
  cpu: {
    name: string;
    cores: number;
    threads: number;
    maxClockGhz: number;
    currentClockGhz: number;
    loadPercentage: number;
  };
  gpu: {
    name: string;
    driverVersion: string;
    vramGb: number;
    resolution: string;
  }[];
  os: {
    caption: string;
    buildNumber: string;
    version: string;
    architecture: string;
    freePhysicalRamGb: number;
    totalPhysicalRamGb: number;
    ramUsedPercent: number;
    uptimeHours: number;
  };
  memorySlots: {
    slot: string;
    capacityGb: number;
    speedMhz: number;
    manufacturer: string;
    partNumber: string;
    serialNumber: string;
  }[];
  disks: {
    model: string;
    interface: string;
    sizeGb: number;
    serialNumber: string;
    status: string;
  }[];
  partitions: {
    driveLetter: string;
    totalGb: number;
    freeGb: number;
    usedGb: number;
    percentFree: number;
  }[];
  battery: {
    isLaptop: boolean;
    percent: number;
    status: number | string;
    charging: boolean;
    estimatedRunTimeMin: number;
  };
  powerScheme: {
    activeGuid: string;
    activeName: string;
  };
  servicing: {
    wuCacheSizeMb: number;
  };
  tweaks: {
    classicContextMenu: boolean;
    telemetryDisabled: boolean;
    bingSearchDisabled: boolean;
    taskbarEndTaskEnabled: boolean;
    networkThrottlingDisabled: boolean;
  };
}

export interface RealDriverItem {
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

export interface ActionProgressData {
  actionId: string;
  line: string;
  isDone: boolean;
  success?: boolean;
}

export interface AeroOptimaNativeBridge {
  isNative: boolean;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  checkAdmin: () => Promise<boolean>;
  getLiveStats: () => Promise<LivePerformanceStats>;
  getSystemOverview: () => Promise<RealSystemOverview | null>;
  getSystemDrivers: () => Promise<RealDriverItem[]>;
  startAction: (actionId: string, type: string, params?: Record<string, any>) => void;
  onActionProgress: (callback: (data: ActionProgressData) => void) => () => void;
}

declare global {
  interface Window {
    aeroOptimaNative?: AeroOptimaNativeBridge;
  }
}
