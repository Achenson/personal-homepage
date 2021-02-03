import React, { useState } from "react";

import SingleColumnsColor from "../Colors/ColumnColor";
import DefaultColorsToChoose from "../Colors/ColorsToChoose_Default";

import { globalSettingsState } from "../../state/defaultSettings";
import SingleColumnsColor_Img from "../Colors/ColumnColor_Img";
import BackgroundColor from "../Colors/BackgroundColor";
import EyeOff from "../Colors/EyeOff";
import BackgroundColorsToChoose from "../Colors/ColorsToChoose_Background";
import { DndProvider } from "react-dnd";

import { ReactComponent as EyeOffSVG } from "../../svgs/eye-off.svg";

interface Props {}

function UpperLeftMenu({}: Props): JSX.Element {
  const [columnSelected, setColumnSelected] = useState<number | null>(null);

  const [colorsToChooseVis, setColorsToChooseVis] = useState<boolean>(false);
  const [
    backgroundColorsToChooseVis,
    setBackgroundColorsToChooseVis,
  ] = useState<boolean>(false);

  const [defaultColorsFor, setDefaultColorsFor] = useState<
    "column_1" | "column_2" | "column_3" | "column_4" | "unselected"
  >("unselected");

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function columnsRendering(howMany: number, oneColorForAllCols: boolean) {
  

    let arrOfColumns = [];
    for (let i = 1; i <= howMany; i++) {
      arrOfColumns.push(i);
    }


    return arrOfColumns.map((el, index) => {
      return globalSettingsData.picBackground ? (
        <SingleColumnsColor_Img
          colNumber={oneColorForAllCols ? 1 : el}
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
      ) : (
        <SingleColumnsColor
          colNumber={oneColorForAllCols ? 1 : el}
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
    <div className="flex items-center justify-between w-48 sm:w-52">
      {/* <div className="absolute left-0 bottom-0"> */}
      <div className="flex justify-between items-center mb-2 mt-2">
        {/* <p className="w-32">Columns</p> */}
        <div className="flex">{columnsRendering(4, globalSettingsData.oneColorForAllCols)}</div>
      </div>
      {globalSettingsData.picBackground ? null : (
        <BackgroundColor
          setBackgroundColorsToChooseVis={setBackgroundColorsToChooseVis}
        />
      )}
      <EyeOff />

      {/* <div className="absolute left-0" style={{ bottom: "104px" }}> */}
      <div className="absolute left-0 top-3">
        {colorsToChooseVis ? (
          <DefaultColorsToChoose defaultColorsFor={defaultColorsFor} />
        ) : null}
        {backgroundColorsToChooseVis ? (
          <div className="absolute left-60 top-7">
            <BackgroundColorsToChoose />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UpperLeftMenu;
