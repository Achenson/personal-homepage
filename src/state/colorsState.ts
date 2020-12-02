import { newRidgeState } from "react-ridge-state";

export const folderColorState = newRidgeState<string>("teal-500");
export const noteColorState = newRidgeState<string>("yellow-500");

interface ColumnsColors {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

export const columnsColorsState = newRidgeState<ColumnsColors>({
  column1: "yellow-200",
  column2: "orange-200",
  column3: "red-200",
  column4: "green-200",
});
