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
}

function SingleColumnsColor_Img({
  colNumber,
  // setNotesSelected,
  // setTabsSelected,
  defaultColorsFor,
  setDefaultColorsFor,
  // setColorsToChooseVis,
  columnSelected,
  setColumnSelected,
  upperVisDispatch,
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
        columnSelected === colNumber ? "border-2" : "border"
      } border-black hover:border-gray-500`}
      style={{ backgroundColor: columnsColor(colNumber) }}
    ></div>
  );
}

export default SingleColumnsColor_Img;
