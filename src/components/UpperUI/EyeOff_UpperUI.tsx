import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";

import { backgroundColorsUpperUiFocus } from "../../utils/colors_background";

import {useUpperUiContext} from "../../utils/upperUiContext"


import shallow from "zustand/shallow";
import { useGlobalSettings } from "../../state/defaultSettingsHooks";
import {useTabs} from "../../state/useTabs"

// import {
//   // closeAllTabsState,
//   globalSettingsState,
//   // tabOpenedState
// } from "../../state/defaultSettings";

import { ReactComponent as EyeOffSVG } from "../../svgs/eye-off.svg";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function EyeOff_UpperUI({ 
  // upperVisDispatch
 }: Props): JSX.Element {

  const globalSettings = useGlobalSettings(state => state, shallow)

  const [backgroundColorData, setBackgroundColorState] =
    backgroundColorState.use();

  // const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();
  // const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();

  const setCloseAllTabsState = useTabs(state => state.setCloseAllTabsState)
  const setTabOpenedState = useTabs(state => state.setTabOpenedState)

  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const upperUiContext = useUpperUiContext()

  function calcIconBackground(pageBackgroundColor: string) {
    if (pageBackgroundColor === "white") {
      return `$bg-${pageBackgroundColor}`;
    }

    if (pageBackgroundColor === "black") {
      return `bg-white text-${backgroundColorData}`;
    }

    let whiteRegex = /[3456789]00$/;

    if (globalSettings.picBackground) {
      return "bg-white text-black";
    }

    if (whiteRegex.test(pageBackgroundColor)) {
      return `bg-white text-${backgroundColorData}`;
    } else {
      return `$bg-${pageBackgroundColor}`;
    }
  }

  function focusColor(): string {
    if (globalSettings.picBackground) {
      return "blueGray-400";
    }

    if (backgroundColorsUpperUiFocus.indexOf(backgroundColorData) > -1) {
      return "blueGray-300";
    }

    return "blueGray-400";
  }

  return (
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}

    <button
      onClick={() => {
        // setSelected((b) => !b);
        // setBackgroundColorsToChooseVis((b) => !b);
       upperUiContext.upperVisDispatch({ type: "CLOSE_ALL" });
        setCloseAllTabsState(true);
        setTabOpenedState(null)
      }}
      className={`focus:outline-none focus-visible:ring-2 ring-${focusColor()} ring-inset`}
      tabIndex={6}
      aria-label={"Reset tabs to default open/close state"}
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
