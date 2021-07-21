import React, { useState } from "react";

import ColorsToChoose_Background from "../Colors/ColorsToChoose_Background";
// import { globalSettingsState } from "../../state/defaultSettings";

import { backgroundColorsUpperUiFocus } from "../../utils/colors_background";

// import { backgroundColorState } from "../../state/colorsState";
import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

// import { tabOpenedState } from "../../state/defaultSettings";

import shallow from "zustand/shallow";
import { useBackgroundColor } from "../../state/colorHooks";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";

import { useUpperUiContext } from "../../utils/upperUiContext";

import { ReactComponent as DocumentSVG } from "../../svgs/document.svg";

interface Props {
  // setBackgroundColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: UpperVisState;
}

function BackgroundColor_upperUI({}: // setBackgroundColorsToChooseVis,
// upperVisDispatch,
// upperVisState,
Props): JSX.Element {
  const globalSettings = useGlobalSettings((state) => state, shallow);
  const backgroundColor = useBackgroundColor((state) => state.backgroundColor);
  // const [backgroundColorData, setBackgroundColorState] =
  //   backgroundColorState.use();

  // const [closeAllTabsData, setCloseAllTabsData] =closeAllTabsState.use();
  // const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  const [selected, setSelected] = useState(false);

  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const upperUiContext = useUpperUiContext();

  function calcIconBackground(pageBackgroundColor: string) {
    if (pageBackgroundColor === "white") {
      return `$bg-${pageBackgroundColor}`;
    }

    if (pageBackgroundColor === "black") {
      return `bg-white fill-current text-${backgroundColor}`;
    }

    let whiteRegex = /[3456789]00$/;

    if (whiteRegex.test(pageBackgroundColor)) {
      return `bg-white fill-current text-${backgroundColor}`;
    } else {
      return `$bg-${pageBackgroundColor}`;
    }
  }

  function focusColor(): string {
    if (globalSettings.picBackground) {
      return "blueGray-400";
    }

    if (backgroundColorsUpperUiFocus.indexOf(backgroundColor) > -1) {
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
          upperUiContext.upperVisDispatch({ type: "COLORS_BACKGROUND_TOGGLE" });
        }}
        tabIndex={5}
        aria-label={"Background color menu"}
      >
        <DocumentSVG
          // className={`h-7 bg-${calcIconBackground(backgroundColorData)} opacity-80 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
          className={`h-7 transition-colors duration-75 ${calcIconBackground(
            backgroundColor
          )} opacity-80 border border-black rounded-lg cursor-pointer  hover:border-gray-500`}
        />
      </button>
      {upperUiContext.upperVisState.colorsBackgroundVis && (
        <div className="absolute" style={{ bottom: "104px", left: "240px" }}>
          <ColorsToChoose_Background
          // upperVisDispatch={upperVisDispatch}
          />
        </div>
      )}
    </>
  );
}

export default BackgroundColor_upperUI;
