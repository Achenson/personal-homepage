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

function DefaultSingleColor_Img({ color, defaultColorsFor }: Props): JSX.Element {
  //   const [folderColorData, setFolderColorData] = folderColorState.use();
  //   const [noteColorData, setNoteColorData] = noteColorState.use();
  //   const [rssColorData, setRssColorData] = rssColorState.use();
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
    if (defaultColorsFor === "unselected") {
      return "border border-black";
    }

    if (defaultColorsFor === "column_1") {
      if (color !== columnsColorsImg_Data.column_1) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_2") {
      if (color !== columnsColorsImg_Data.column_2) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_3") {
      if (color !== columnsColorsImg_Data.column_3) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (defaultColorsFor === "column_4") {
      if (color !== columnsColorsImg_Data.column_4) {
        return "border border-black";
      }

      return "border-2 border-black";
    }
  }

  return (
    <div
      className={`h-4 w-8 cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-gray-400`}
      style={{backgroundColor: color }}
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

export default DefaultSingleColor_Img;
