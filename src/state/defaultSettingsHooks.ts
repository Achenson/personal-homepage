import create from "zustand";

interface UseGlobalSettingsData {
  picBackground: boolean;
  defaultImage: string;
  oneColorForAllCols: boolean;
  limitColGrowth: boolean;
  hideNonDeletable: boolean;
  numberOfCols: 1 | 2 | 3 | 4;
}

interface UseGlobalSettingsAll extends UseGlobalSettingsData {
  setGlobalSettings: (globalSettings: UseGlobalSettingsData) => void;
}

export const useGlobalSettings = create<UseGlobalSettingsAll>((set) => ({
  picBackground: false,
  defaultImage: "defaultBackground",
  oneColorForAllCols: false,
  limitColGrowth: false,
  hideNonDeletable: false,
  numberOfCols: 4,
  setGlobalSettings: (globalSettings) =>
    set((state) => ({
      ...globalSettings,
    })),
}));

interface RssSettingsData {
  date: boolean;
  description: boolean;
  itemsPerPage: number;
}

interface RssSettingsAll extends RssSettingsData {
  setRssSettings: (rssSettings: RssSettingsData) => void;
}

export const useRssSettings = create<RssSettingsAll>((set) => ({
  date: true,
  description: false,
  itemsPerPage: 7,
  setRssSettings: (rssSettingsData) =>
    set((state) => ({
      ...rssSettingsData,
    })),
}));
