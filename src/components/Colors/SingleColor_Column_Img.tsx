import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
import { rssColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import { columnsColorsImg_State } from "../../state/colorsState";
import { uiColorState } from "../../state/colorsState";

import { produce } from "immer";

interface Props {
  color: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "rss"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}

function SingleColor_Column_Img({
  color,
  defaultColorsFor,
}: Props): JSX.Element {
  const [
    columnsColorsImg_Data,
    setColumnsColorsImg_Data,
  ] = columnsColorsImg_State.use();
  //   const [uiColorData, setUiColorData] = uiColorState.use();

  function borderMaker(
    defaultColorsFor:
      | "folders"
      | "notes"
      | "rss"
      | "column_1"
      | "column_2"
      | "column_3"
      | "column_4"
      | "unselected"
  ) {
    const unselected = "border border-black";
    const selectedBlack = "border-2 border-black";

    switch (defaultColorsFor) {
      case "column_1":
        if (color === columnsColorsImg_Data.column_1) {
          return selectedBlack;
        }
        return unselected;

      case "column_2":
        if (color === columnsColorsImg_Data.column_2) {
          return selectedBlack;
        }
        return unselected;

      case "column_3":
        if (color === columnsColorsImg_Data.column_3) {
          return selectedBlack;
        }
        return unselected;

      case "column_4":
        if (color === columnsColorsImg_Data.column_4) {
          return selectedBlack;
        }
        return unselected;
      default:
        return unselected;
    }
  }

  return (
    <div
      className={`h-4 w-8 -mr-px -mt-px cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-2 hover:border-gray-500 hover:z-50`}
      style={{ backgroundColor: color }}
      onClick={() => {
        if (
          defaultColorsFor === "column_1" ||
          "column_2" ||
          "column_3" ||
          "column_4"
        ) {
          setColumnsColorsImg_Data((previous) =>
            produce(previous, (updated) => {
              updated[
                defaultColorsFor as
                  | "column_1"
                  | "column_2"
                  | "column_3"
                  | "column_4"
              ] = color;
            })
          );
        }
      }}
    ></div>
  );
}

export default SingleColor_Column_Img;
