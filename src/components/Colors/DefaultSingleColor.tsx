import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import { columnsColorsState } from "../../state/colorsState";

import { produce } from "immer";

interface Props {
  color: string;
  // bookmarkTitle: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}

function DefaultSingleColor({ color, defaultColorsFor }: Props): JSX.Element {
  // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  // let bookmarkIndex: number;

  // bookmarksData.forEach( (obj, i) => {
  //   if (obj.title === bookmarkTitle) {
  //     bookmarkIndex = i
  //   }
  // })

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  // const [uiColorData, setUiColorData] = uiColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();

  function borderMaker(
    defaultColorsFor:
      | "folders"
      | "notes"
      | "column_1"
      | "column_2"
      | "column_3"
      | "column_4"
      | "unselected"
  ) {
    if (defaultColorsFor === "unselected") {
      return "border border-black";
    }

    // const arrForLightSelect = ["blueGray-303", "blueGray-404", "gray-404", "yellow-300", "yellow-330", "yellow-400", "lime-400", "orange-300"];

    if (defaultColorsFor === "folders") {
      if (color !== folderColorData) {
        return "border border-black";
      }

      return "border-2 border-white";
    }

    if (defaultColorsFor === "notes") {
      if (color !== noteColorData) {
        return "border border-black";
      }

      return "border-2 border-white";
    }

    // return color === columnsColorsData[defaultColorsFor] ? true : false;

    if (
      defaultColorsFor === "column_1"
    ) {
      if (color !== columnsColorsData.column_1) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (
      defaultColorsFor === "column_2"
    ) {
      if (color !== columnsColorsData.column_2) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (
      defaultColorsFor === "column_3"
    ) {
      if (color !== columnsColorsData.column_3) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

    if (
      defaultColorsFor === "column_4"
    ) {
      if (color !== columnsColorsData.column_4) {
        return "border border-black";
      }

      return "border-2 border-black";
    }

  }

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-gray-400`}
      onClick={() => {
        if (defaultColorsFor === "folders") {
          setFolderColorData(color);
        }

        if (defaultColorsFor === "notes") {
          setNoteColorData(color);
        }

        if (
          defaultColorsFor === "column_1" ||
          "column_2" ||
          "column_3" ||
          "column_4"
        ) {
          setColumnsColorsData((previous) =>
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

        // setBookmarksData((previous) =>
        //   produce(previous, (updated) => {
        //     updated[bookmarkIndex].color = `bg-${color}`;
        //   })
        // );
      }}
    ></div>
  );
}

export default DefaultSingleColor;
