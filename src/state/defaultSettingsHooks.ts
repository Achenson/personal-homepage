import { BooleanLiteral } from "typescript";
import create from "zustand";

interface UseGlobalSettings {
  picBackground: boolean;
  defaultImage: string;
  oneColorForAllCols: boolean;
  limitColGrowth: boolean;
  hideNonDeletable: boolean;
  numberOfCols: 1 | 2 | 3 | 4;
}

export const useGlobalSettings = create<UseGlobalSettings>((set) => ({
  picBackground: false,
  defaultImage: "defaultBackground",
  oneColorForAllCols: false,
  limitColGrowth: false,
  hideNonDeletable: false,
  numberOfCols: 4,
}));

export const useRssSetting = create<{
  date: boolean;
  description: boolean;
  itemsPerPage: 7;
}>((set) => ({
  date: true,
  description: false,
  itemsPerPage: 7,
}));

export const useLoggedInState = create<{
  loggedInState: boolean;
}>((set) => ({
  loggedInState: false,
}));
