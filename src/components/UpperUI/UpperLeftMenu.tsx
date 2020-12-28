import React, { useState } from "react";

import SingleColumnsColor from "../Colors/SingleColumnsColor";
import DefaultColorsToChoose from "../Colors/DefaultColorsToChoose";

interface Props {}

function UpperLeftMenu({}: Props): JSX.Element {
  const [columnSelected, setColumnSelected] = useState<number | null>(null);

  const [colorsToChooseVis, setColorsToChooseVis] = useState<boolean>(false);

  const [defaultColorsFor, setDefaultColorsFor] = useState<
    "column_1" | "column_2" | "column_3" | "column_4" | "unselected"
  >("unselected");

  function columnsRendering(howMany: number) {
    let arrOfColumns = [];
    for (let i = 1; i <= howMany; i++) {
      arrOfColumns.push(i);
    }

    return arrOfColumns.map((el, index) => {
      return (
        <SingleColumnsColor
          colNumber={el}
          // colSelected={false}
          defaultColorsFor={defaultColorsFor}
          setColorsToChooseVis={setColorsToChooseVis}
          columnSelected={columnSelected}
          setColumnSelected={setColumnSelected}
          setDefaultColorsFor={setDefaultColorsFor}
          // setFoldersSelected={setFoldersSelected}
          // setNotesSelected={setNotesSelected}
          key={index}
        />
      );
    });
  }

  return (
    <div className="">
      {/* <div className="absolute left-0 bottom-0"> */}
      <div className="flex justify-between items-center mb-2 mt-2">
        {/* <p className="w-32">Columns</p> */}
        <div className="flex">{columnsRendering(4)}</div>
      </div>
      <div className="absolute left-60" style={{ bottom: "104px" }}>
        {colorsToChooseVis ? (
          <DefaultColorsToChoose defaultColorsFor={defaultColorsFor} />
        ) : null}
      </div>
    </div>
  );
}

export default UpperLeftMenu;
