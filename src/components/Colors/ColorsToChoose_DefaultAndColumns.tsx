import React, { useEffect, useState } from "react";

import FocusLock from "react-focus-lock";

import SingleColor_DefaultAndColumn from "./SingleColor_DefaultAndColumn";

import { tabColors, tabColorsConcat } from "../../utils/colors_tab";
import {
  columnColors,
  imageColumnColors,
  columnColorsConcat,
  imageColumnColorsConcat,
} from "../../utils/colors_column";

import {
  folderColorState,
  noteColorState,
  rssColorState,
} from "../../state/colorsState";

import {
  columnsColorsState,
  columnsColorsImg_State,
} from "../../state/colorsState";

import { globalSettingsState } from "../../state/defaultSettings";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";
import { backgroundColorsUpperUiFocus } from "../../utils/colors_background";

interface Props {
  // setIconsVisibility: (value: React.SetStateAction<boolean>) => void;

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
  leftPositioning: string;
  upperVisState: UpperVisState;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  setColorsToChooseVis?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColorsToChoose_DefaultAndColumns({
  defaultColorsFor,
  leftPositioning,
  upperVisDispatch,
  upperVisState,
  setColorsToChooseVis,
}: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [folderColorData, setFolderColorData] = folderColorState.use();
  const [noteColorData, setNoteColorData] = noteColorState.use();
  const [rssColorData, setRssColorData] = rssColorState.use();

  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [columnsColorsImg_Data, setColumnsColorsImg_Data] =
    columnsColorsImg_State.use();

  const [selectedNumber, setSelectedNumber] = useState(calcSelectedNumber());

  useEffect(() => {
  
    setSelectedNumber(calcSelectedNumber())

  }, [defaultColorsFor])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape") {
      if (/column/.test(defaultColorsFor)) {
        if (upperVisState.columnSelected !== null) {
          upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });
          // setColumnSelected(null);
        }
      }

      if (setColorsToChooseVis) {
        setColorsToChooseVis(false);
      }
    }
  }

  function calcSelectedNumber(): number {
    let selectedNumber: number = 0;

    if (/column/.test(defaultColorsFor)) {
      // if (globalSettingsData.picBackground) {

      if (globalSettingsData.picBackground) {
        imageColumnColorsConcat.map((color, i) => {
          switch (defaultColorsFor) {
            case "column_1":
              if (color === columnsColorsImg_Data.column_1) {
                selectedNumber = calcColorNumbering(
                  color,
                  imageColumnColorsConcat
                );
              }
              break;
            case "column_2":
              if (color === columnsColorsImg_Data.column_2) {
                selectedNumber = calcColorNumbering(
                  color,
                  imageColumnColorsConcat
                );
              }
              break;
            case "column_3":
              if (color === columnsColorsImg_Data.column_3) {
                selectedNumber = calcColorNumbering(
                  color,
                  imageColumnColorsConcat
                );
              }
              break;
            case "column_4":
              if (color === columnsColorsImg_Data.column_4) {
                selectedNumber = calcColorNumbering(
                  color,
                  imageColumnColorsConcat
                );
              }
              break;
            default:
              selectedNumber = 0;
          }
        });
      }

      if (!globalSettingsData.picBackground) {
        columnColorsConcat.map((color, i) => {
          switch (defaultColorsFor) {
            case "column_1":
              if (color === columnsColorsData.column_1) {
                selectedNumber = calcColorNumbering(color, columnColorsConcat);
              }
              break;
            case "column_2":
              if (color === columnsColorsData.column_2) {
                selectedNumber = calcColorNumbering(color, columnColorsConcat);
              }
              break;
            case "column_3":
              if (color === columnsColorsData.column_3) {
                selectedNumber = calcColorNumbering(color, columnColorsConcat);
              }
              break;
            case "column_4":
              if (color === columnsColorsData.column_4) {
                selectedNumber = calcColorNumbering(color, columnColorsConcat);
              }
              break;
            default:
              selectedNumber = 0;
          }
        });
      }

      // }
      return selectedNumber;
    }

    tabColorsConcat.map((color, i) => {
      switch (defaultColorsFor) {
        case "folders":
          if (color === folderColorData) {
            selectedNumber = calcColorNumbering(color, tabColorsConcat);
          }
          break;

        case "notes":
          if (color === noteColorData) {
            selectedNumber = calcColorNumbering(color, tabColorsConcat);
          }
          break;
        case "rss":
          if (color === rssColorData) {
            selectedNumber = calcColorNumbering(color, tabColorsConcat);
          }
          break;
        default:
          selectedNumber = 0;
      }
    });

    return selectedNumber;
  }

  function calcColorNumbering(
    color: string,
    arrOfConcatedColors: string[]
  ): number {
    // +1 because tabIndex for focus starts with one
    return arrOfConcatedColors.indexOf(color) + 1;
  }

  function mapTabColors() {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_DefaultAndColumn
                color={el}
                defaultColorsFor={defaultColorsFor}
                key={j}
                colorNumber={calcColorNumbering(el, tabColorsConcat)}
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
                colorArrLength={tabColorsConcat.length}
              />
            );
          })}
        </div>
      );
    });
  }

  function mapColumnColors(arrToMap: string[][]) {
    return arrToMap.map((row, i) => {
      // return imageColumnColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_DefaultAndColumn
                color={el}
                defaultColorsFor={defaultColorsFor}
                key={j}
                colsForBackgroundImg={
                  globalSettingsData.picBackground ? true : false
                }
                colorNumber={
                  globalSettingsData.picBackground
                    ? calcColorNumbering(el, imageColumnColorsConcat)
                    : calcColorNumbering(el, columnColorsConcat)
                }
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
                colorArrLength={
                  globalSettingsData.picBackground
                    ? imageColumnColorsConcat.length
                    : columnColorsConcat.length
                }
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <FocusLock>
      <div className="z-50 relative">
        {/* <div className="absolute bg-white" style={{ left: "-93px", top: "0px" }}> */}
        <div
          className="absolute bg-white"
          style={{
            left: leftPositioning,
            top: "1px",
          }}
        >
          {/column/.test(defaultColorsFor)
            ? mapColumnColors(
                globalSettingsData.picBackground
                  ? imageColumnColors
                  : columnColors
              )
            : mapTabColors()}
        </div>
      </div>
    </FocusLock>
  );
}

export default ColorsToChoose_DefaultAndColumns;
