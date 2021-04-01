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
}

function SingleColor_Tab({ color, tabID }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();

  function borderMaker() {
    const selectedBorder = "border-2 border-white";
    const defaultBorder = "border border-black";

    let currentTab = tabsData.find((obj) => obj.id === tabID);

    //@ts-ignore
    if (currentTab.color) {
      //@ts-ignore
      if (color == currentTab.color) {
        return "border-2 border-white";
      }
    }

    //@ts-ignore
    if (!currentTab.color) {
      if (currentTab?.type === "folder" && color === folderColorData) {
        return selectedBorder;
      }

      if (currentTab?.type === "note" && color === noteColorData) {
        return selectedBorder;
      }

      if (currentTab?.type === "rss" && color === rssColorData) {
        return selectedBorder;
      }
    }

    return defaultBorder;
  }

  return (
    <div
      className={`h-4 w-8 bg-${color} cursor-pointer ${borderMaker()} hover:border-gray-500`}
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
    ></div>
  );
}

export default SingleColor_Tab;
