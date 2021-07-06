import React from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";
import { produce } from "immer";
import {
  folderColorState,
  noteColorState,
  rssColorState,
} from "../../state/colorsState";

import { tabColorsLightFocus } from "../../utils/colors_tab";

interface Props {
  color: string;
  // tabTitle: string;
  tabID: number | string;
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
  selectedNumber: number;
  colorNumber: number;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
  colorArrLength: number;
}

function SingleColor_Tab({
  color,
  tabID,
  tabColor,
  tabType,
  selectedNumber,
  colorNumber,
  setSelectedNumber,
  colorArrLength,
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();


  let tabIndex = calcTabIndex();

  function calcTabIndex() {
    let indexToReturn = colorNumber - selectedNumber + 1;

    if (indexToReturn >= 1) {
      return indexToReturn;
    }

    return colorArrLength - selectedNumber + colorNumber + 1;
  }

  function focusColor(): string {
    if (tabColorsLightFocus.indexOf(color) > -1) {
      return "gray-400";
    }

    return "gray-500";
  }

  return (
    <button
      className={`h-4 w-8 -mr-px -mt-px bg-${color} cursor-pointer ${
        colorNumber === selectedNumber
          ? "border-2 border-white z-50"
          : "border border-black"
      } hover:border-2 hover:border-gray-500 hover:z-50
      focus:outline-none focus-visible:ring-2 ring-${focusColor()} ring-inset
      `}
      onClick={() => {
        setTabsData((previous) =>
          produce(previous, (updated) => {
            let tabToChange = updated.find((obj) => obj.id === tabID);

            if (tabToChange) {
              tabToChange.color = `${color}`;
            }
          })
        );
        setSelectedNumber(colorNumber);
      }}

      tabIndex={tabIndex}
    ></button>
  );
}

export default SingleColor_Tab;
