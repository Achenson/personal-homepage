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
  column_1: "rgba(10,10,10,0.5)",
  column_2: "rgba(10,10,20,0.5)",
  column_3: "rgba(10,10,30,0.5)",
  column_4: "rgba(10,10,40,0.5)",
});
