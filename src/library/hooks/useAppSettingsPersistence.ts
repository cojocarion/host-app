import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

const STORAGE_KEYS = {
  APP_SETTINGS: "@network_scanner_settings",
} as const;

export interface AppSettings {
  autoSave: boolean;
  maxHistoryItems: number;
  scanTimeout: number;
  enableOSDetection: boolean;
  enableServiceScan: boolean;
  enableAdvancedScan?: boolean;
  theme: "light" | "dark" | "auto";
}

const DEFAULT_SETTINGS: AppSettings = {
  autoSave: true,
  maxHistoryItems: 50,
  scanTimeout: 5000,
  enableOSDetection: true,
  enableServiceScan: true,
  enableAdvancedScan: true,
  theme: "auto",
};

export const useAppSettingsPersistence = (
  setErrorState: (error: string | null) => void
) => {
  const [appSettings, setAppSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const loadAppSettings = useCallback(async (): Promise<AppSettings> => {
    try {
      const settingsData = await AsyncStorage.getItem(
        STORAGE_KEYS.APP_SETTINGS
      );
      if (settingsData) {
        const parsedSettings = JSON.parse(settingsData);
        const mergedSettings = { ...DEFAULT_SETTINGS, ...parsedSettings };
        setAppSettings(mergedSettings);
        return mergedSettings;
      }
      setAppSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    } catch (err) {
      setErrorState("Failed to load app settings");
      return DEFAULT_SETTINGS;
    }
  }, [setErrorState]);

  const saveAppSettings = useCallback(
    async (settings: Partial<AppSettings>) => {
      try {
        const updatedSettings = { ...appSettings, ...settings };
        await AsyncStorage.setItem(
          STORAGE_KEYS.APP_SETTINGS,
          JSON.stringify(updatedSettings)
        );
        setAppSettings(updatedSettings);
      } catch (err) {
        setErrorState("Failed to save app settings");
      }
    },
    [appSettings, setErrorState]
  );

  return {
    appSettings,
    loadAppSettings,
    saveAppSettings,
    DEFAULT_SETTINGS,
  };
};
