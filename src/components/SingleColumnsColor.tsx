import React from "react";
import { columnsColorsState } from "../state/colorsState";

interface Props {
  colNumber: number;
  colSelected: boolean;
  setNotesSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setFoldersSelected: React.Dispatch<React.SetStateAction<boolean>>;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
  setDefaultColorsFor: React.Dispatch<
    React.SetStateAction<
      | "folders"
      | "notes"
      | "column_1"
      | "column_2"
      | "column_3"
      | "column_4"
      | "unselected"
    >
  >;
  setColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
  setColumnSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

function Test({
  colNumber,
  colSelected,
  setNotesSelected,
  setFoldersSelected,
  defaultColorsFor,
  setDefaultColorsFor,
  setColorsToChooseVis,
  setColumnSelected
}: Props): JSX.Element {
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

  function columnsColor(colNumber: number) {
    switch (colNumber) {
      case 1:
        return columnsColorData.column1;
      case 2:
        return columnsColorData.column2;
      case 3:
        return columnsColorData.column2;
      case 4:
        return columnsColorData.column2;
    }
  }

  return (
    <div
      onClick={() => {
        setDefaultColorsFor(`column_${colNumber}` as any);

        if (defaultColorsFor === `columns_${colNumber}`) {
          setColorsToChooseVis((b) => !b);
        } else {
          setColorsToChooseVis(true);
        }

        setFoldersSelected(false);
        setNotesSelected(false);

        // setColumnsSelected((b) => !b);
        setColumnSelected(colNumber);
      }}
      className={`h-4 w-8 bg-${columnsColor(colNumber)} cursor-pointer ${
        colSelected ? "border-2" : "border"
      } border-black hover:border-gray-500`}
    ></div>
  );
}

export default Test;
