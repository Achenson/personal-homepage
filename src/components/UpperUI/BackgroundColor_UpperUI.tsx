import React, { useState } from "react";

import ColorsToChoose_Background from "../Colors/ColorsToChoose_Background";
import { globalSettingsState } from "../../state/defaultSettings";

import { backgroundColorsUpperUiFocus } from "../../utils/colors_background";

import { backgroundColorState } from "../../state/colorsState";
import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

import { closeAllTabsState, tabOpenedState } from "../../state/defaultSettings";

import { ReactComponent as DocumentSVG } from "../../svgs/document.svg";

interface Props {
  // setBackgroundColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: UpperVisState;
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

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

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

  function focusColor(): string {
    if (globalSettingsData.picBackground) {
      return "blueGray-400";
    }

    if (backgroundColorsUpperUiFocus.indexOf(backgroundColorData) > -1) {
      return "blueGray-300";
    }

    return "blueGray-400";
  }

  return (
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}
    <>
      <button
        className={`relative focus:outline-none focus-visible:ring-2 ring-${focusColor()} ring-inset`}
        onClick={() => {
          // setTabOpenedData(null)
          // setCloseAllTabsData(true);
          setSelected((b) => !b);
          upperVisDispatch({ type: "COLORS_BACKGROUND_TOGGLE" });
        }}
        tabIndex={5}
        aria-label={"Background color menu"}
      >
        <DocumentSVG
          // className={`h-7 bg-${calcIconBackground(backgroundColorData)} opacity-80 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
          className={`h-7 transition-colors duration-75 ${calcIconBackground(
            backgroundColorData
          )} opacity-80 border border-black rounded-lg cursor-pointer  hover:border-gray-500`}
        />
      </button>
      {upperVisState.colorsBackgroundVis && (
        <div className="absolute" style={{ bottom: "104px", left: "240px" }}>
          <ColorsToChoose_Background upperVisDispatch={upperVisDispatch} />
        </div>
      )}
    </>
  );
}

export default BackgroundColor_upperUI;
