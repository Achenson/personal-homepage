import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import FocusLock from "react-focus-lock";

import SingleColor_Tab from "./SingleColor_Tab";

import { tabColors } from "../../utils/colors_tab";
// import {columnColors} from "../../utils/columnColors";
import { TabVisAction } from "../../utils/interfaces";

import {
  folderColorState,
  noteColorState,
  rssColorState,
} from "../../state/colorsState";

interface Props {
  setIconsVis: (value: React.SetStateAction<boolean>) => void;
  tabID: string | number;
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
  tabVisDispatch: React.Dispatch<TabVisAction>;
  // top: number;
  // left: number;
  // tabWidth: number;
}

function ColorsToChoose_Tab({
  setIconsVis,
  tabID,
  tabColor,
  tabType,
  tabVisDispatch,
}: // top,
// left,
// tabWidth,
Props): JSX.Element {
  // useEffect(() => {
  //   console.log(document.documentElement.scrollTop);

  // }, [document.documentElement.scrollTop])


  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape") {
      tabVisDispatch({ type: "COLORS_CLOSE" });
    }
  }

  function isSelected(color: string, tabColor: string|null) {

 
    if (tabColor) {
      if (color == tabColor) {
        return true;
      }
    }

    if (!tabColor) {
      if (tabType === "folder" && color === folderColorData) {
        return true;
      }

      if (tabType === "note" && color === noteColorData) {
        return true;
      }

      if (tabType === "rss" && color === rssColorData) {
        return true;
      }
    }

    return false;
  }


  function mappingColors(colors: string[][]) {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Tab
                color={el}
                tabID={tabID}
                tabColor={tabColor}
                // tabNumber
                // selectedTabNumber
                isSelected={isSelected(el, tabColor)}
                tabType={tabType}
                key={j}
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <FocusLock>
      <div
        className={`absolute right-0 bg-gray-100 mr-px mt-px z-40`}
        // style={{
        //   top: `${(top + 32 + document.documentElement.scrollTop)}px`,
        //   left: `${(left + (tabWidth - 187))}px`,
        // }}
        onMouseEnter={() => {
          setIconsVis(true);
        }}
        // onMouseLeave={() => {
        //   setIconsVisibility(false)
        // }}
      >
        {mappingColors(tabColors)}

        {/* scroll:{document.body.scrollHeight} */}
      </div>
    </FocusLock>
  );
}

export default ColorsToChoose_Tab;
