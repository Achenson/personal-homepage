import React, { useState } from "react";

import ColorsToChoose_Background from "../Colors/ColorsToChoose_Background";

import { backgroundColorState } from "../../state/colorsState";
import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

import { closeAllTabsState, tabOpenedState } from "../../state/defaultSettings";

import { ReactComponent as DocumentSVG } from "../../svgs/document.svg";

interface Props {
  // setBackgroundColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState;
}

function BackgroundColor_upperUI({
  // setBackgroundColorsToChooseVis,
  upperVisDispatch,
  upperVisState,
}: Props): JSX.Element {
  const [backgroundColorData, setBackgroundColorState] =
    backgroundColorState.use();

  // const [closeAllTabsData, setCloseAllTabsData] =closeAllTabsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  const [selected, setSelected] = useState(false);

  function calcIconBackground(pageBackgroundColor: string) {
    if (pageBackgroundColor === "white") {
      return `$bg-${pageBackgroundColor}`;
    }

    if (pageBackgroundColor === "black") {
      return `bg-white fill-current text-${backgroundColorData}`;
    }

    let whiteRegex = /[3456789]00$/;

    if (whiteRegex.test(pageBackgroundColor)) {
      return `bg-white fill-current text-${backgroundColorData}`;
    } else {
      return `$bg-${pageBackgroundColor}`;
    }
  }

  return (
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}

    <div className="relative">
      <DocumentSVG
        // className={`h-7 bg-${calcIconBackground(backgroundColorData)} opacity-80 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
        className={`h-7 transition-colors duration-75 ${calcIconBackground(
          backgroundColorData
        )} opacity-80 border border-black rounded-lg cursor-pointer  hover:border-gray-500`}
        onClick={() => {
          // setTabOpenedData(null)
          // setCloseAllTabsData(true);
          setSelected((b) => !b);
          upperVisDispatch({ type: "COLORS_BACKGROUND_TOGGLE" });
        }}
      />

      {upperVisState.colorsBackgroundVis && (
        <div className="absolute" style={{ bottom: "102px", left: "104px" }}>
          <ColorsToChoose_Background />
        </div>
      )}
    </div>
  );
}

export default BackgroundColor_upperUI;
