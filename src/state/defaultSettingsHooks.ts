import create from "zustand";
import shallow from "zustand/shallow";

interface UseGlobalSettings {
  picBackground: boolean;
  defaultImage: string;
  oneColorForAllCols: boolean;
  limitColGrowth: boolean;
  hideNonDeletable: boolean;
  numberOfCols: 1 | 2 | 3 | 4;
}

interface RssSettings {
  date: boolean;
  description: boolean;
  itemsPerPage: number;
}

export const useGlobalSettings = create<UseGlobalSettings>((set) => ({
  picBackground: false,
  defaultImage: "defaultBackground",
  oneColorForAllCols: false,
  limitColGrowth: false,
  hideNonDeletable: false,
  numberOfCols: 4,
}));

export const useRssSettings = create<{
  date: boolean;
  description: boolean;
  itemsPerPage: number;
  setRssSettings: (rssSettings: RssSettings) => void;
}>((set) => ({
  date: true,
  description: false,
  itemsPerPage: 7,
  setRssSettings: (rssSettings) =>
    set((state) => ({
      ...rssSettings,
    })),
}));

export const useLoggedInState = create<{
  loggedInState: boolean;
  setLoggedInState: (trueOrFalse: boolean) => void;
}>((set) => ({
  loggedInState: false,
  setLoggedInState: (trueOrFalse) =>
    set((state) => ({
      ...state,
      loggedInState: trueOrFalse,
    })),
}));
