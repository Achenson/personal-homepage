import React from "react";
import { folderColorState } from "../../state/colorsState";
import { noteColorState } from "../../state/colorsState";
import { rssColorState } from "../../state/colorsState";
// import { uiColorState } from "../../state/colorsState";
import {
  columnsColorsState,
  columnsColorsImg_State,
} from "../../state/colorsState";
import { uiColorState } from "../../state/colorsState";

import { setComplementaryUiColor } from "../../utils/func_complementaryUIcolor";

import { tabColorsLightFocus } from "../../utils/colors_tab";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

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
  colsForBackgroundImg?: boolean;
  selectedNumber: number;
  colorNumber: number;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
  colorArrLength: number;
}

function SingleColor_DefaultAndColumn({
  color,
  defaultColorsFor,
  colsForBackgroundImg,
  selectedNumber,
  colorNumber,
  setSelectedNumber,
  colorArrLength,
}: Props): JSX.Element {
  // const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [columnsColorsImg_Data, setColumnsColorsImg_Data] =
    columnsColorsImg_State.use();

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

    if (colorNumber !== selectedNumber) {
      return unselected;
    }

    switch (defaultColorsFor) {
      case "folders":
        return selectedWhite;

      case "notes":
        return selectedWhite;

      case "rss":
        return selectedWhite;

      case "column_1":
        return selectedBlack;

      case "column_2":
        return selectedBlack;

      case "column_3":
        return selectedBlack;

      case "column_4":
        return selectedBlack;

      default:
        return unselected;
    }
  }

  function focusColor(): string {
    // for column colors
    if (/column/.test(defaultColorsFor)) {
      if (colsForBackgroundImg) {
        return "blueGray-500";
      }
      return "blueGray-400";
    }

    // for tab defuault colors
    if (tabColorsLightFocus.indexOf(color) > -1) {
      return "gray-400";
    }

    return "gray-500";
  }

  let tabIndex = calcTabIndex();

  function calcTabIndex() {
    let indexToReturn = colorNumber - selectedNumber + 1;

    if (indexToReturn >= 1) {
      return indexToReturn;
    }

    return colorArrLength - selectedNumber + colorNumber + 1;
  }

  return (
    <button
      className={`h-4 ${
        defaultColorsFor === "folders" ||
        defaultColorsFor === "rss" ||
        defaultColorsFor === "notes"
          ? "w-8"
          : "w-6 xs:w-8"
      } -mr-px -mt-px bg-${color} cursor-pointer ${
        // isThisSelected(defaultColorsFor) ? "border-2" : "border"
        borderMaker(defaultColorsFor)
      } hover:border-2 hover:border-gray-500 hover:z-50
      focus:outline-none focus-visible:ring-2 ring-${focusColor()} ring-inset
      `}
      // for columns with background img only
      style={{ backgroundColor: `${colsForBackgroundImg ? color : ""}` }}
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
          // (defaultColorsFor === "column_1" ||
          //   defaultColorsFor === "column_2" ||
          //   defaultColorsFor === "column_3" ||
          //   defaultColorsFor === "column_4") &&

          /column/.test(defaultColorsFor) &&
          !colsForBackgroundImg
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

        if (
          // (defaultColorsFor === "column_1" ||
          //   defaultColorsFor === "column_2" ||
          //   defaultColorsFor === "column_3" ||
          //   defaultColorsFor === "column_4")
          /column/.test(defaultColorsFor) &&
          colsForBackgroundImg
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

        setSelectedNumber(colorNumber);
      }}
      tabIndex={tabIndex}
      aria-label={"Choose color"}
    ></button>
  );
}

export default SingleColor_DefaultAndColumn;
