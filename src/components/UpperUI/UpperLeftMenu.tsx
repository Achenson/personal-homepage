import React, { useState } from "react";

import ColumnColor_UpperUI from "./ColumnColor_UpperUI";
import ColorsToChoose_DefaultAndColumns from "../Colors/ColorsToChoose_DefaultAndColumns";

import { globalSettingsState } from "../../state/defaultSettings";
import BackgroundColor_UpperUI from "./BackgroundColor_UpperUI";
import EyeOff_UpperUI from "./EyeOff_UpperUI";
import ColorsToChoose_Background from "../Colors/ColorsToChoose_Background";

import { ReactComponent as EyeOffSVG } from "../../svgs/eye-off.svg";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

interface Props {
  upperVisState: InitUpperVisState;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function UpperLeftMenu({
  upperVisDispatch,
  upperVisState,
}: Props): JSX.Element {
  const [columnSelected, setColumnSelected] = useState<number | null>(null);

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
        <ColumnColor_UpperUI
          colNumber={oneColorForAllCols ? 1 : el}
          // colSelected={false}

          defaultColorsFor={defaultColorsFor}
          setDefaultColorsFor={setDefaultColorsFor}
          // setColorsToChooseVis={setColorsToChooseVis}

          columnSelected={columnSelected}
          setColumnSelected={setColumnSelected}
          // setFoldersSelected={setFoldersSelected}
          // setNotesSelected={setNotesSelected}
          key={index}
          arrIndex={index}
          upperVisDispatch={upperVisDispatch}
          columnType="BACKGROUND_IMG"
        />
      ) : (
        <ColumnColor_UpperUI
          colNumber={oneColorForAllCols ? 1 : el}
          // colSelected={false}
          defaultColorsFor={defaultColorsFor}
          // setColorsToChooseVis={setColorsToChooseVis}

          columnSelected={columnSelected}
          setColumnSelected={setColumnSelected}
          setDefaultColorsFor={setDefaultColorsFor}
          // setFoldersSelected={setFoldersSelected}
          // setNotesSelected={setNotesSelected}
          key={index}
          arrIndex={index}
          upperVisDispatch={upperVisDispatch}
          columnType="NO_BACKGROUND_IMG"
        />
      );
    });
  }

  return (
    <div className="flex items-center justify-between w-48 sm:w-52">
      {/* <div className="absolute left-0 bottom-0"> */}
      <div className="flex justify-between items-center mb-2 mt-2">
        {/* <p className="w-32">Columns</p> */}
        <div className="flex bg-white bg-opacity-80">
          {columnsRendering(4, globalSettingsData.oneColorForAllCols)}
        </div>
      </div>
      {globalSettingsData.picBackground ? null : (
        <BackgroundColor_UpperUI
          // setBackgroundColorsToChooseVis={setBackgroundColorsToChooseVis}
          upperVisDispatch={upperVisDispatch}
        />
      )}
      <EyeOff_UpperUI upperVisDispatch={upperVisDispatch} />

      {/* <div className="absolute left-0" style={{ bottom: "104px" }}> */}
      <div className="absolute left-0 top-3">
        {upperVisState.colorsColumnVis && (
          <ColorsToChoose_DefaultAndColumns defaultColorsFor={defaultColorsFor} />
        )}
        {upperVisState.colorsBackgroundVis && (
          <div className="absolute left-60 top-7">
            <ColorsToChoose_Background />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpperLeftMenu;
