import { newRidgeState } from "react-ridge-state";

import {columnColors, imageColumnColors} from "../utils/colors_column"
import {backgroundColors} from "../utils/colors_background"
import {tabColors} from "../utils/colors_tab"


// export const folderColorState = newRidgeState<string>(tabColors[7][2]);
// export const noteColorState = newRidgeState<string>(tabColors[1][2]);
// export const rssColorState = newRidgeState<string>(tabColors[9][2]);
// export const uiColorState = newRidgeState<string>(tabColors[7][2]);


// export const folderColorState = newRidgeState<string>("teal-500");
// export const noteColorState = newRidgeState<string>("yellow-400");
// export const rssColorState = newRidgeState<string>("sky-500");
// export const uiColorState = newRidgeState<string>("teal-500");

// export const resetColorsState = newRidgeState<boolean>(false);

interface ColumnsColors {
  column_1: string;
  column_2: string;
  column_3: string;
  column_4: string;
}

// export const columnsColorsState = newRidgeState<ColumnsColors>({
//   // column_1: "yellow-200",
//   // column_2: "orange-200",
//   // column_3: "red-200",
//   // column_4: "green-200",
//   column_1: columnColors[0][8],
//   column_2: columnColors[1][5],
//   column_3: columnColors[1][8],
//   column_4: columnColors[3][2],
// });

// export const columnsColorsImg_State = newRidgeState<ColumnsColors>({
//   // column_1: "rgba(0,0,0,0.2)",
//   column_1: imageColumnColors[0][2],
//   column_2: imageColumnColors[0][2],
//   column_3: imageColumnColors[0][2],
//   column_4: imageColumnColors[0][2],
// });

// export const tabBeingDraggedColor_State = newRidgeState<{
//   tabColor: string
// }>(
//   {tabColor: ""
// }
// )

// export const backgroundColorState = newRidgeState<string>(
//   // "gray-50"
//   backgroundColors[0][1]
// )