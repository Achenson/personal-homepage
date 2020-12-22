import React from "react";
import { columnsColorsState } from "../../state/colorsState";

interface Props {
  colNumber: number;
  // setNotesSelected: React.Dispatch<React.SetStateAction<boolean>>;
  // setFoldersSelected: React.Dispatch<React.SetStateAction<boolean>>;
  defaultColorsFor:
    // | "folders"
    // | "notes"
     "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
  setDefaultColorsFor: React.Dispatch<
    React.SetStateAction<
      // | "folders"
      // | "notes"
       "column_1"
      | "column_2"
      | "column_3"
      | "column_4"
      | "unselected"
    >
  >;
  setColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
  columnSelected: number | null;
  setColumnSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

function SingleColumnsColor({
  colNumber,
  // setNotesSelected,
  // setFoldersSelected,
  defaultColorsFor,
  setDefaultColorsFor,
  setColorsToChooseVis,
  columnSelected,
  setColumnSelected,
}: Props): JSX.Element {
  const [columnsColorData, setColumnsColorData] = columnsColorsState.use();

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

  return (
    <div
      onClick={() => {

        setDefaultColorsFor(`column_${colNumber}` as any);

        if (defaultColorsFor === `column_${colNumber}`) {
          setColorsToChooseVis((b) => !b);
          setColumnSelected(null);
        } else {
          setColorsToChooseVis(true);
          setColumnSelected(colNumber);

        }

        // setFoldersSelected(false);
        // setNotesSelected(false);

        // setColumnsSelected((b) => !b);

        
      }}
      className={`h-4 w-8 bg-${columnsColor(colNumber)} cursor-pointer ${
        columnSelected === colNumber ? "border-2" : "border"
      } border-black hover:border-gray-500`}
    ></div>
  );
}

export default SingleColumnsColor;
