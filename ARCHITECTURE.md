# Network Scanner App - Architecture Documentation

## Overview

This React Native application provides comprehensive network discovery capabilities for mobile devices on iOS and Android platforms. The app can discover hosts, scan services, and detect operating systems on the local network.

## Architecture

### 🎯 Design Principles

1. **Separation of Concerns**: All business logic is separated into custom hooks, while UI components handle only presentation
2. **Modular Components**: Each UI component has a single responsibility
3. **React Hooks Pattern**: All state management and side effects are handled through custom hooks
4. **Cross-platform Compatibility**: Built with React Native and Expo for iOS/Android support

### 📁 Project Structure

```
src/
├── hooks/                    # Custom hooks (Business Logic Layer)
│   ├── useNetworkScanner.ts     # Network discovery functionality
│   ├── useServiceDetection.ts   # Service scanning logic
│   ├── useOSDetection.ts        # Operating system detection
│   └── useDataPersistence.ts    # Data storage and persistence
│
├── components/               # UI Components (Presentation Layer)
│   └── NetworkScanner/
│       ├── ScannerScreen.tsx    # Main scanner interface
│       ├── NetworkInfoCard.tsx  # Network information display
│       ├── ScanControls.tsx     # Scan control buttons
│       ├── ScanProgress.tsx     # Progress indicators
│       ├── HostsList.tsx        # Hierarchical host tree view
│       └── ErrorMessage.tsx     # Error handling component
│
└── app/                     # Screen routing and navigation
    └── (tabs)/
        └── index.tsx            # Main app entry point
```

## 🛠 Custom Hooks Architecture

### 1. useNetworkScanner
**Responsibility**: Network host discovery

**Features**:
- WiFi network information detection
- IP range generation for local subnet
- Parallel host scanning with batching
- Network connectivity monitoring
- Progress tracking

**Key Methods**:
- `scanNetwork()`: Discovers active hosts in local network
- `getCurrentNetworkInfo()`: Gets current network details
- `generateIPRange()`: Creates IP list for scanning

### 2. useServiceDetection
**Responsibility**: Service port scanning

**Features**:
- Common service port detection (HTTP, SSH, FTP, etc.)
- Service banner grabbing
- Batch processing for performance
- Service metadata extraction

**Key Methods**:
- `scanHostServices()`: Scans services for single host
- `scanMultipleHosts()`: Batch service scanning
- `checkPort()`: Individual port checking

### 3. useOSDetection
**Responsibility**: Operating system fingerprinting

**Features**:
- HTTP header analysis
- Port pattern matching
- TTL-based detection
- Multiple detection methods with confidence scoring

**Key Methods**:
- `detectHostOS()`: OS detection for single host
- `detectMultipleHosts()`: Batch OS detection
- `analyzeHttpHeaders()`: HTTP-based OS detection

### 4. useDataPersistence
**Responsibility**: Data storage and session management

**Features**:
- Scan session persistence
- App settings management
- Data export functionality
- Scan history tracking

**Key Methods**:
- `saveScanSession()`: Store scan results
- `getScanStatistics()`: Generate analytics
- `exportScanData()`: Data export functionality

## 🎨 UI Components Architecture

### Component Hierarchy

```
ScannerScreen (Main Container)
├── NetworkInfoCard
├── ScanControls
├── ScanProgress
├── ErrorMessage (conditional)
└── HostsList
    └── HostItem (expandable)
        ├── ServiceItem
        └── OSInfoDisplay
```

### Component Design Patterns

1. **Container-Presenter Pattern**: Components receive data via props, hooks handle logic
2. **Compound Components**: Complex UI broken into smaller, reusable pieces
3. **Conditional Rendering**: Dynamic UI based on application state
4. **Hierarchical Tree View**: Expandable host details with nested information

## 🔧 Technical Implementation

### Network Scanning Approach

Due to React Native limitations, the app uses HTTP-based discovery methods:

1. **Host Discovery**: 
   - Uses `fetch()` with timeout to detect active hosts
   - Tries both HTTP (port 80) and HTTPS (port 443)
   - Batch processing for performance optimization

2. **Service Detection**:
   - HTTP/HTTPS probing on common ports
   - Header analysis for service identification
   - Banner grabbing where possible

3. **OS Detection**:
   - Server header analysis
   - Port pattern matching
   - Response time heuristics
   - Confidence scoring system

### Performance Optimizations

1. **Batch Processing**: Scans processed in configurable batches
2. **Parallel Execution**: Multiple hosts scanned simultaneously
3. **Progressive Updates**: Real-time UI updates during scanning
4. **Timeout Management**: Configurable timeouts prevent hanging
5. **Memory Management**: Efficient data structures and cleanup

### Security Considerations

1. **No Root Requirements**: Works with standard app permissions
2. **Network-Only Access**: Only accesses local network resources
3. **Privacy Compliance**: No external data transmission
4. **User Consent**: Clear indication of scanning activities

## 📱 User Experience

### Interface Features

1. **Intuitive Controls**: Single-button scan initiation
2. **Real-time Progress**: Live progress indicators and statistics
3. **Hierarchical Data**: Expandable tree view for detailed information
4. **Dark Mode**: Full dark mode support
5. **Error Handling**: Comprehensive error messages with solutions

### Accessibility

1. **Screen Reader Support**: Proper accessibility labels
2. **High Contrast**: Clear visual indicators
3. **Touch Targets**: Appropriately sized interactive elements

## 🔄 State Management

### Hook-based State Architecture

Each custom hook manages its own state independently:

- **Local State**: Component-specific UI state
- **Shared State**: Cross-component data via prop drilling
- **Persistent State**: Long-term storage via AsyncStorage
- **Network State**: Real-time network information

### Data Flow

```
User Action → Custom Hook → State Update → Component Re-render → UI Update
     ↓
Persistence Layer (AsyncStorage) ← Data Serialization
```

## 🧪 Testing Strategy

### Unit Testing
- Custom hooks testing with React Testing Library
- Component rendering tests
- State management verification

### Integration Testing
- Network scanning workflows
- Data persistence flows
- Error handling scenarios

### Performance Testing
- Network scan performance benchmarks
- Memory usage monitoring
- Battery impact assessment

## 🚀 Deployment

### Build Requirements
- React Native 0.79+
- Expo SDK 53+
- iOS 12+ / Android 8+

### Production Considerations
1. **Network Permissions**: Ensure proper network access
2. **Performance Monitoring**: Track scan performance
3. **Error Logging**: Comprehensive error tracking
4. **User Analytics**: Usage pattern analysis

## 🔮 Future Enhancements

### Planned Features
1. **Custom Port Ranges**: User-defined scanning ranges
2. **Device Naming**: Custom host naming and grouping
3. **Network Mapping**: Visual network topology
4. **Export Formats**: Multiple data export options
5. **Scheduling**: Automated scanning schedules

### Technical Improvements
1. **Native Modules**: Performance-critical operations
2. **Background Scanning**: Background scan capabilities
3. **Advanced OS Detection**: Enhanced fingerprinting
4. **Network Protocols**: Additional protocol support

---

This architecture ensures maintainable, scalable, and performant network scanning capabilities while adhering to React Native best practices and mobile platform constraints. 