export interface OSInfo {
  ip: string;
  os: string;
  version?: string;
  architecture?: string;
  confidence: number;
  fingerprint?: string;
  ttl?: number;
  openPorts?: number[];
  detectionMethod: string;
  detectionTime: Date;
}

export interface OSDetectionResult {
  ip: string;
  osInfo: OSInfo | null;
  isDetecting: boolean;
  error?: string;
}
