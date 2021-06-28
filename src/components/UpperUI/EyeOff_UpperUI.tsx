import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";

import {
  closeAllTabsState,
  globalSettingsState,
} from "../../state/defaultSettings";

import { ReactComponent as EyeOffSVG } from "../../svgs/eye-off.svg";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function EyeOff_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [backgroundColorData, setBackgroundColorState] =
    backgroundColorState.use();

  const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function calcIconBackground(pageBackgroundColor: string) {
    if (pageBackgroundColor === "white") {
      return `$bg-${pageBackgroundColor}`;
    }

    if (pageBackgroundColor === "black") {
      return `bg-white text-${backgroundColorData}`;
    }

    let whiteRegex = /[3456789]00$/;

    if (globalSettingsData.picBackground) {
      return "bg-white text-black";
    }

    if (whiteRegex.test(pageBackgroundColor)) {
      return `bg-white text-${backgroundColorData}`;
    } else {
      return `$bg-${pageBackgroundColor}`;
    }
  }


  

  return (
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}

    <button
      onClick={() => {
        // setSelected((b) => !b);
        // setBackgroundColorsToChooseVis((b) => !b);
        upperVisDispatch({ type: "CLOSE_ALL" });
        setCloseAllTabsData(true);
      }}
      className={`focus:outline-none focus-visible:ring-2 ring-blueGray-400 ring-inset`}
    >
      <EyeOffSVG
        // className={`h-7 bg-${calcIconBackground(backgroundColorData)} opacity-80 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
        className={`h-7 transition-colors duration-75 ${calcIconBackground(
          backgroundColorData
        )} opacity-80 border border-black rounded-lg cursor-pointer  hover:border-gray-500`}
      />
    </button>
  );
}

export default EyeOff_UpperUI;
