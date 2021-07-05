import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import FocusLock from "react-focus-lock";

import SingleColor_Tab from "./SingleColor_Tab";

import { tabColors, tabColorsConcat } from "../../utils/colors_tab";
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

  const [selectedNumber, setSelectedNumber] = useState(calcSelectedNumber());

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

  function calcSelectedNumber(): number {
    let selectedNumber: number = 0;

    if (tabColor) {
      tabColorsConcat.map((color, i) => {
        if (color === tabColor) {
          selectedNumber = calcColorNumbering(color);
        }
      });
    }

    if (!tabColor) {
      if (tabType === "folder") {
        selectedNumber = calcColorNumbering(folderColorData);
      }

      if (tabType === "note") {
        selectedNumber = calcColorNumbering(noteColorData);
      }

      if (tabType === "rss") {
        selectedNumber = calcColorNumbering(rssColorData);
      }
    }

    return selectedNumber;
  }

  function calcColorNumbering(color: string): number {
    // +1 because tabIndex for focus starts with one
    return tabColorsConcat.indexOf(color) + 1;
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
                selectedNumber={selectedNumber}
                // isSelected={isSelected(el, tabColor)}
                tabType={tabType}
                key={j}
                // !!!!!!
                colorNumber={calcColorNumbering(el)}
                setSelectedNumber={setSelectedNumber}
              />
            );
          })}
        </div>
      );
    });
  }

  useEffect(() => {
    console.log(tabColorsConcat);
    console.log(tabColors);
  }, [tabColorsConcat, tabColors]);

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
