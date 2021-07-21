import create from "zustand";

import { columnColors, imageColumnColors } from "../utils/colors_column";
import { backgroundColors } from "../utils/colors_background";
import { tabColors } from "../utils/colors_tab";
import { isDoStatement } from "typescript";

export const useDefaultColors = create((set) => ({
  folderColor: tabColors[7][2],
  noteColor: tabColors[1][2],
  rssColor: tabColors[9][2],
  uiColor: tabColors[7][2],
}));

export const useBackgroundColor = create<{
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
}>((set) => ({
  backgroundColor: backgroundColors[0][1],
  setBackgroundColor: (backgroundColor) =>
    set((state) => ({
      ...state,
      backgroundColor: backgroundColor,
    })),
}));

// export const folderColorState = newRidgeState<string>("teal-500");
// export const noteColorState = newRidgeState<string>("yellow-400");
// export const rssColorState = newRidgeState<string>("sky-500");
// export const uiColorState = newRidgeState<string>("teal-500");

// export const resetColorsState = newRidgeState<boolean>(false);

export const useResetColors = create<{
  resetColors: boolean;
  setResetColors: (trueOrFalse: boolean) => void;
}>((set) => ({
  resetColors: false,
  setResetColors: (trueOrFalse) =>
    set((state) => ({
      ...state,
      resetColors: trueOrFalse,
    })),
}));

export const useColumnsColors = create((set) => ({
  column_1: columnColors[0][8],
  column_2: columnColors[1][5],
  column_3: columnColors[1][8],
  column_4: columnColors[3][2],
}));

export const useColumnsColorsImg = create((set) => ({
  column_1: imageColumnColors[0][2],
  column_2: imageColumnColors[0][2],
  column_3: imageColumnColors[0][2],
  column_4: imageColumnColors[0][2],
}));

export const useTabBeingDraggedColor = create<{
  tabBeingDraggedColor: string;
  setTabBeingDraggedColor: (color: string) => void;
}>((set) => ({
  tabBeingDraggedColor: "",
  setTabBeingDraggedColor: (color) =>
    set((state) => ({
      ...state,
      useTabBeingDraggedColor: color,
    })),
}));
