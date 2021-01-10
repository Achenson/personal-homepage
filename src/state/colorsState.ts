import { newRidgeState } from "react-ridge-state";

export const folderColorState = newRidgeState<string>("teal-500");
export const noteColorState = newRidgeState<string>("yellow-500");
export const rssColorState = newRidgeState<string>("lightBlue-500");
export const uiColorState = newRidgeState<string>("teal-500");

export const resetColorsState = newRidgeState<boolean>(false);

interface ColumnsColors {
  column_1: string;
  column_2: string;
  column_3: string;
  column_4: string;
}




export const columnsColorsState = newRidgeState<ColumnsColors>({
  column_1: "yellow-200",
  column_2: "orange-200",
  column_3: "red-200",
  column_4: "green-200",
});

export const columnsColorsImg_State = newRidgeState<ColumnsColors>({
  column_1: "blue-200",
  column_2: "green-200",
  column_3: "indigo-200",
  column_4: "purple-200",
});
