import React, { useState } from "react";
import {
  columnsColorsState,
  columnsColorsImg_State,
} from "../../state/colorsState";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";
import {useUpperUiContext} from "../../utils/upperUiContext"

import {
  globalSettingsState,
  tabOpenedState,
} from "../../state/defaultSettings";

interface Props {
  colNumber: number;
  defaultColorsFor: // | "folders"
  // | "notes"
  "column_1" | "column_2" | "column_3" | "column_4" | "unselected";
  setDefaultColorsFor: React.Dispatch<
    React.SetStateAction<
      // | "folders"
      // | "notes"
      "column_1" | "column_2" | "column_3" | "column_4" | "unselected"
    >
  >;
  // setColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;

  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: UpperVisState;
  arrIndex: number;
  columnType: "NO_BACKGROUND_IMG" | "BACKGROUND_IMG";
  isHoverOnAnyColumn: boolean;
  tabIndex: number;
}

function ColumnColor_UpperUI({
  colNumber,
  setDefaultColorsFor,
  // upperVisDispatch,
  // upperVisState,
  arrIndex,
  columnType,
  isHoverOnAnyColumn,
  tabIndex
}: Props): JSX.Element {
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

  const [columnsColorImg_Data, setColumnsColorImg_Data] =
    columnsColorsImg_State.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  // const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  const upperUiContext = useUpperUiContext()


  function columnsColor(colNumber: number) {
    if (columnType === "NO_BACKGROUND_IMG") {
      switch (colNumber) {
        case 1:
          return "bg-" + columnsColorData.column_1;
        case 2:
          return "bg-" + columnsColorData.column_2;
        case 3:
          return "bg-" + columnsColorData.column_3;
        case 4:
          return "bg-" + columnsColorData.column_4;
        default:
          return columnsColorData.column_1;
      }
    }

    switch (colNumber) {
      case 1:
        return columnsColorImg_Data.column_1;
      case 2:
        return columnsColorImg_Data.column_2;
      case 3:
        return columnsColorImg_Data.column_3;
      case 4:
        return columnsColorImg_Data.column_4;
      default:
        return columnsColorImg_Data.column_1;
    }
  }

  function borderStyle() {
    // unselected column
    if (upperUiContext.upperVisState.columnSelected !== colNumber) {
      if (arrIndex > 0) {
        return "border border-l-0";
      }
      return "border";
    }

    // selected column (or all columns if oneColorForAllCols is true)
    if (arrIndex > 0) {
      return `border border-t-2 border-b-2 border-r-2 ${
        globalSettingsData.oneColorForAllCols ? "border-l-0" : ""
      }`;
    }
    return "border-2";
  }

  return (
    <>
      {arrIndex + 1 <= globalSettingsData.numberOfCols ? (
        <button
          onClick={() => {
            setDefaultColorsFor(`column_${colNumber}` as any);
            setTabOpenedData(null);
            // setCloseAllTabsData(true);

            if (upperUiContext.upperVisState.columnSelected === colNumber) {
              upperUiContext.upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });
              // setColumnSelected(null);
            } else {
              upperUiContext.upperVisDispatch({
                type: "COLORS_COLUMN_OPEN",
                payload: colNumber,
              });
              // setColumnSelected(colNumber);
            }
          }}
          className={`relative overflow-hidden h-4 w-8 ${
            columnType === "NO_BACKGROUND_IMG" ? columnsColor(colNumber) : ""
          }
          ${isHoverOnAnyColumn ? "shadow-inner_lg" : ""}
          cursor-pointer ${borderStyle()} border-black hover:shadow-inner_lg
          focus:outline-none focus-visible:ring-2   ${
            columnType === "BACKGROUND_IMG"
              ? " ring-blueGray-600 "
              : "ring-blueGray-500"
          } ring-inset
          `}
          style={{
            backgroundColor: `${
              columnType === "BACKGROUND_IMG" ? columnsColor(colNumber) : ""
            }`,
          }}
          tabIndex={tabIndex}
          aria-label={"Column color menu"}
        ></button>
      ) : // <div
      //   className={`relative overflow-hidden h-4 w-8 bg-white ${borderStyle()} border-black`}
      // >
      //   <div
      //     className="absolute bg-black transform -rotate-23"
      //     style={{ top: "6px", left: "-2px", width: "35px", height: "2px" }}
      //   ></div>
      // </div>
      null}
    </>
  );
}

export default ColumnColor_UpperUI;
