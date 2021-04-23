import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
import { rssColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import { columnsColorsState } from "../../state/colorsState";
import { uiColorState } from "../../state/colorsState";

import { setComplementaryUiColor } from "../../utils/func_complementaryUIcolor";

import { produce } from "immer";

interface Props {
  color: string;
  // tabTitle: string;
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

function SingleColor_DefaultAndColumn({
  color,
  defaultColorsFor,
}: Props): JSX.Element {
  // const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [uiColorData, setUiColorData] = uiColorState.use();

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
    const selectedWhite = "border-2 border-white z-50";

    // const arrForLightSelect = ["blueGray-303", "blueGray-404", "gray-404", "yellow-300", "yellow-330", "yellow-400", "lime-400", "orange-300"];

    switch (defaultColorsFor) {
      case "folders":
        if (color === folderColorData) {
          return selectedWhite;
        }
        return unselected;

      case "notes":
        if (color === noteColorData) {
          return selectedWhite;
        }
        return unselected;

      case "rss":
        if (color === rssColorData) {
          return selectedWhite;
        }
        return unselected;

      case "column_1":
        if (color === columnsColorsData.column_1) {
          return selectedBlack;
        }
        return unselected;

      case "column_2":
        if (color === columnsColorsData.column_2) {
          return selectedBlack;
        }
        return unselected;

      case "column_3":
        if (color === columnsColorsData.column_3) {
          return selectedBlack;
        }
        return unselected;

      case "column_4":
        if (color === columnsColorsData.column_4) {
          return selectedBlack;
        }
        return unselected;

      default:
        return unselected;
    }
  }

  return (
    <div
      className={`h-4 ${
        defaultColorsFor === "folders" ||
        defaultColorsFor === "rss" ||
        defaultColorsFor === "notes"
          ? "w-8"
          : "w-6 xs:w-8"
      } -mr-px -mt-px bg-${color} cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-2 hover:border-gray-500 hover:z-50`}
      onClick={() => {
        if (defaultColorsFor === "folders") {
          setFolderColorData(color);

          setComplementaryUiColor(color, setUiColorData);
        }

        if (defaultColorsFor === "notes") {
          setNoteColorData(color);
        }

        if (defaultColorsFor === "rss") {
          setRssColorData(color);
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
      }}
    ></div>
  );
}

export default SingleColor_DefaultAndColumn;
