interface ScanProgressProps {
  networkProgress?: number;
  serviceProgress?: number;
  osProgress?: number;
  overallProgress?: number;
  isNetworkScanning?: boolean;
  isServiceScanning?: boolean;
  isOSDetecting?: boolean;
  scanStats?: any;

  // New props for general usage
  progress?: number;
  isScanning?: boolean;
  scanType?: string;
}
