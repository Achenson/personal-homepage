import React, { useState } from "react";
// import {
//   // columnsColorsState,
//   columnsColorsImg_State,
// } from "../../state/colorsState";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";
import {useUpperUiContext} from "../../utils/upperUiContext"

// import {
//   globalSettingsState,
//   // tabOpenedState,
// } from "../../state/defaultSettings";
import shallow from "zustand/shallow";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";
import { useColumnsColors, useColumnsColorsImg } from "../../state/colorHooks";
import {useTabs} from "../../state/useTabs"
  // const tabOpenedState = useTabs(state => state.tabOpenedState)
  

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

  const globalSettings = useGlobalSettings(state => state, shallow)

  // const [columnsColorData, setColumnsColorData] = columnsColorsState.use();
  const columnsColors = useColumnsColors(state=> state, shallow)
  const columnsColorsImg = useColumnsColorsImg(state=> state, shallow)

  // const [columnsColorImg_Data, setColumnsColorImg_Data] =
  //   columnsColorsImg_State.use();

  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  // const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();
  // const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();
  const setTabOpenedState = useTabs(state => state.setTabOpenedState)

  const upperUiContext = useUpperUiContext()


  function makeColumnsColor(colNumber: number) {
    if (columnType === "NO_BACKGROUND_IMG") {
      switch (colNumber) {
        case 1:
          return "bg-" + columnsColors.column_1;
        case 2:
          return "bg-" + columnsColors.column_2;
        case 3:
          return "bg-" + columnsColors.column_3;
        case 4:
          return "bg-" + columnsColors.column_4;
        default:
          return columnsColors.column_1;
      }
    }

    switch (colNumber) {
      case 1:
        return columnsColorsImg.column_1;
      case 2:
        return columnsColorsImg.column_2;
      case 3:
        return columnsColorsImg.column_3;
      case 4:
        return columnsColorsImg.column_4;
      default:
        return columnsColorsImg.column_1;
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
        globalSettings.oneColorForAllCols ? "border-l-0" : ""
      }`;
    }
    return "border-2";
  }

  return (
    <>
      {arrIndex + 1 <= globalSettings.numberOfCols ? (
        <button
          onClick={() => {
            setDefaultColorsFor(`column_${colNumber}` as any);
            setTabOpenedState(null);
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
            columnType === "NO_BACKGROUND_IMG" ? makeColumnsColor(colNumber) : ""
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
              columnType === "BACKGROUND_IMG" ? makeColumnsColor(colNumber) : ""
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
