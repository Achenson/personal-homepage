import React from "react";
import { columnsColorsImg_State } from "../../state/colorsState";
import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  colNumber: number;
  // setNotesSelected: React.Dispatch<React.SetStateAction<boolean>>;
  // setTabsSelected: React.Dispatch<React.SetStateAction<boolean>>;
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

function SingleColumnsColor_Img_UpperUI({
  colNumber,
  // setNotesSelected,
  // setTabsSelected,
  defaultColorsFor,
  setDefaultColorsFor,
  // setColorsToChooseVis,
  columnSelected,
  setColumnSelected,
  upperVisDispatch,
  arrIndex
}: Props): JSX.Element {
  const [
    columnsColorImg_Data,
    setColumnsColorImg_Data,
  ] = columnsColorsImg_State.use();

  function columnsColor(colNumber: number) {
    switch (colNumber) {
      case 1:
        return columnsColorImg_Data.column_1;
      case 2:
        return columnsColorImg_Data.column_2;
      case 3:
        return columnsColorImg_Data.column_3;
      case 4:
        return columnsColorImg_Data.column_4;
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

  return (
    <div
      onClick={() => {
        setDefaultColorsFor(`column_${colNumber}` as any);

        if (defaultColorsFor === `column_${colNumber}`) {
          // setColorsToChooseVis((b) => !b);
          upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });
          setColumnSelected(null);
        } else {
          // setColorsToChooseVis(true);
          upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });

          setColumnSelected(colNumber);
        }

        // setTabsSelected(false);
        // setNotesSelected(false);

        // setColumnsSelected((b) => !b);
      }}
      className={`h-4 w-8 cursor-pointer ${
        borderStyle()
      } border-black hover:border-gray-500`}
      style={{ backgroundColor: columnsColor(colNumber) }}
    ></div>
  );
}

export default SingleColumnsColor_Img_UpperUI;
