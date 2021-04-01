import React, { useState } from "react";
import { columnsColorsState } from "../../state/colorsState";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  colNumber: number;
  // setNotesSelected: React.Dispatch<React.SetStateAction<boolean>>;
  // setFoldersSelected: React.Dispatch<React.SetStateAction<boolean>>;
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
  // setNotesSelected,
  // setTabsSelected,
  defaultColorsFor,
  setDefaultColorsFor,
  // setColorsToChooseVis,
  columnSelected,
  setColumnSelected,
  upperVisDispatch,
  arrIndex,
}: Props): JSX.Element {
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();
  const [disable, setDisable] = useState<1 | 2 | 3 | 4>(4);

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
      } else {
        return "border";
      }
    } else {
      if (arrIndex > 0) {
        return "border border-t-2 border-b-2 border-r-2";
      } else {
        return "border-2";
      }
    }
  }

  // const triangle = {
  //   width: "0",
  //   height: "0",
  //   borderBottom: "14px solid black",
  //   borderLeft: "30px solid transparent",
  // };

  {
    /* <div
        className="absolute bottom-0 right-0 z-10"
        style={{
          ...triangle,
        }}
      ></div> */
  }

  return (
    <div>
      {colNumber !== disable ? (
        <div
          onClick={() => {
            setDefaultColorsFor(`column_${colNumber}` as any);

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
        >
        
        </div>
      ) : (
        <div
          className={`relative overflow-hidden h-4 w-8 bg-white ${borderStyle()} border-black`}
        >
          <div
            className="absolute bg-black transform -rotate-23"
            style={{ top: "6px", left: "-2px", width: "35px", height: "2px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default ColumnColor_UpperUI;
