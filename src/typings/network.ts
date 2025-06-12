export interface NetworkHost {
  ip: string;
  isActive: boolean;
  hostname?: string;
  responseTime?: number;
  lastSeen: Date;
}

export interface NetworkInfo {
  subnet: string;
  gateway: string;
  localIP: string;
  isConnected: boolean;
}
