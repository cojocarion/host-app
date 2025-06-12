import { NetworkHost } from "./network";
import { OSDetectionResult } from "./os-detection";
import { ServiceScanResult } from "./service";

export interface ScanSession {
  id: string;
  timestamp: Date;
  networkInfo: {
    subnet: string;
    gateway: string;
    localIP: string;
  };
  hosts: NetworkHost[];
  services: ServiceScanResult[];
  osDetection: OSDetectionResult[];
  scanDuration?: number;
  totalHosts: number;
  activeHosts: number;
}

export interface ScanHistory {
  sessions: ScanSession[];
  totalScans: number;
  lastScanDate?: Date;
}
