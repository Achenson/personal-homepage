import React, { useState } from "react";
import { columnsColorsState } from "../../state/colorsState";

import { UpperVisAction } from "../../utils/interfaces";

import {
  globalSettingsState,
  closeAllTabsState,
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
  columnSelected: number | null;
  setColumnSelected: React.Dispatch<React.SetStateAction<number | null>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  arrIndex: number;
}

function ColumnColor_UpperUI({
  colNumber,
  setDefaultColorsFor,
  columnSelected,
  setColumnSelected,
  upperVisDispatch,
  arrIndex,
}: Props): JSX.Element {
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  function columnsColor(colNumber: number) {
    switch (colNumber) {
      case 1:
        return columnsColorData.column_1;
      case 2:
        return columnsColorData.column_2;
      case 3:
        return columnsColorData.column_3;
      case 4:
        return columnsColorData.column_4;
    }
  }

  function borderStyle() {
    if (columnSelected !== colNumber) {
      if (arrIndex > 0) {
        return "border border-l-0";
      }
      return "border";
    }

    if (arrIndex > 0) {
      return "border border-t-2 border-b-2 border-r-2";
    }
    return "border-2";
  }

  return (
    <div>
      {colNumber <= globalSettingsData.numberOfCols ? (
        <div
          onClick={() => {
            setDefaultColorsFor(`column_${colNumber}` as any);
            setTabOpenedData(null);
            setCloseAllTabsData(true);

            if (columnSelected === colNumber) {
              upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });
              setColumnSelected(null);
            } else {
              upperVisDispatch({ type: "COLORS_COLUMN_OPEN" });
              setColumnSelected(colNumber);
            }
          }}
          className={`relative overflow-hidden h-4 w-8 bg-${columnsColor(
            colNumber
          )} cursor-pointer ${borderStyle()} border-black hover:shadow-inner_lg`}
        ></div>
      ) : // <div
      //   className={`relative overflow-hidden h-4 w-8 bg-white ${borderStyle()} border-black`}
      // >
      //   <div
      //     className="absolute bg-black transform -rotate-23"
      //     style={{ top: "6px", left: "-2px", width: "35px", height: "2px" }}
      //   ></div>
      // </div>
      null}
    </div>
  );
}

export default ColumnColor_UpperUI;
