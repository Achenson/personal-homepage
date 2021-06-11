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
  // const [columnSelected, setColumnSelected] = useState<number | null>(null);

  const [defaultColorsFor, setDefaultColorsFor] =
    useState<"column_1" | "column_2" | "column_3" | "column_4" | "unselected">(
      "unselected"
    );

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [isHoverOnAnyColumn, setIsHoverOnAnyColumn] = useState(false);

  function columnsRendering(howMany: number, oneColorForAllCols: boolean) {
    let arrOfColumns = [];
    for (let i = 1; i <= howMany; i++) {
      arrOfColumns.push(i);
    }

    return arrOfColumns.map((el, index) => {
      return (
        <ColumnColor_UpperUI
          colNumber={oneColorForAllCols ? 1 : el}
          // colSelected={false}

          defaultColorsFor={defaultColorsFor}
          setDefaultColorsFor={setDefaultColorsFor}
          // setColorsToChooseVis={setColorsToChooseVis}
          // setFoldersSelected={setFoldersSelected}
          // setNotesSelected={setNotesSelected}
          key={index}
          arrIndex={index}
          upperVisDispatch={upperVisDispatch}
          upperVisState={upperVisState}
          columnType={
            globalSettingsData.picBackground
              ? "BACKGROUND_IMG"
              : "NO_BACKGROUND_IMG"
          }
          isHoverOnAnyColumn={isHoverOnAnyColumn}
        />
      );
    });
  }

  return (
    <div className="flex relative items-center justify-between">
      {/* <div className="absolute left-0 bottom-0"> */}
      <div className="flex relative justify-between items-center mb-2 mt-2">
        {/* <p className="w-32">Columns</p> */}
        <div
          className="flex bg-white bg-opacity-80"
          onMouseEnter={() => {
            if (globalSettingsData.oneColorForAllCols) {
              setIsHoverOnAnyColumn(true);
            }
          }}
          onMouseLeave={() => {
            if (globalSettingsData.oneColorForAllCols) {
              setIsHoverOnAnyColumn(false);
            }
          }}
        >
          {columnsRendering(4, globalSettingsData.oneColorForAllCols)}
        </div>

        {/* {globalSettingsData.picBackground ? null : (
          <div className="absolute hidden" style={{bottom: "20px"}}>
             <BackgroundColor_UpperUI
            // setBackgroundColorsToChooseVis={setBackgroundColorsToChooseVis}
            upperVisDispatch={upperVisDispatch}
          />
          </div>
         
        )} */}
      </div>
      <div className="flex justify-between w-16 ml-2">
        {globalSettingsData.picBackground ? null : (
          <div className="">
            <BackgroundColor_UpperUI
              // setBackgroundColorsToChooseVis={setBackgroundColorsToChooseVis}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
          </div>
        )}
        <EyeOff_UpperUI upperVisDispatch={upperVisDispatch} />
      </div>

      {/* <div className="absolute left-0" style={{ bottom: "104px" }}> */}
      <div>
        {upperVisState.colorsColumnVis && (
          <div className="absolute left-0 bottom-32">
            <ColorsToChoose_DefaultAndColumns
              defaultColorsFor={defaultColorsFor}
              leftPositioning={"0px"}
            />
          </div>
        )}

        {/* {upperVisState.colorsBackgroundVis && (
          <div className="absolute left-60"
          style={{bottom: "104px"}}
          >
            <ColorsToChoose_Background />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default UpperLeftMenu;
