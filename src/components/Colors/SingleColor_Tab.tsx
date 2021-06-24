import React from "react";


import { tabsDataState } from "../../state/tabsAndBookmarks";
import { produce } from "immer";
import {
  folderColorState,
  noteColorState,
  rssColorState,
} from "../../state/colorsState";


interface Props {
  color: string;
  // tabTitle: string;
  tabID: number | string;
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
  
}

function SingleColor_Tab({
  color,
  tabID,
  tabColor,
  tabType,
  
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();

  function borderMaker() {
    const selectedBorder = "border-2 border-white z-50";
    const defaultBorder = "border border-black";

    if (tabColor) {
      if (color == tabColor) {
        return selectedBorder;
      }
    }

    if (!tabColor) {
      if (tabType === "folder" && color === folderColorData) {
        return selectedBorder;
      }

      if (tabType === "note" && color === noteColorData) {
        return selectedBorder;
      }

      if (tabType === "rss" && color === rssColorData) {
        return selectedBorder;
      }
    }

    return defaultBorder;
  }

  return (
    <button
      className={`h-4 w-8 -mr-px -mt-px bg-${color} cursor-pointer ${borderMaker()} hover:border-2 hover:border-gray-500 hover:z-50
      focus:outline-none focus-visible:ring-2 ring-${color === "violet-500" || color === "green-505" ? "gray-600" : "gray-500"} ring-inset
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
      }}
    ></button>
  );
}

export default SingleColor_Tab;
