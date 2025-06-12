export interface Service {
  port: number;
  name: string;
  protocol: string;
  isOpen: boolean;
  banner?: string;
  version?: string;
  responseTime?: number;
}

export interface ServiceScanResult {
  ip: string;
  services: Service[];
  scanTime: Date;
  isScanning: boolean;
}
