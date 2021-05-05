import React, { useState, useReducer, useEffect } from "react";
import Grid from "./LowerUI/Grid";
import Bookmark_newAndEdit from "./Shared/Bookmark_newAndEdit";
import NewTab_UpperUI from "./UpperUI/NewTab_UpperUI";
import Colors_UpperUI from "./UpperUI/ColorsSettings_UpperUI";
import UpperUI from "./UpperUI/UpperUI";

import { globalSettingsState } from "../state/defaultSettings";

import { backgroundColorState } from "../state/colorsState";
import Background_UpperUI from "./UpperUI/BackgroundSettings_UpperUI";
import Settings_UpperUI from "./UpperUI/GlobalSettings_UpperUI";

import {
  UpperVisAction,
  InitUpperVisState,
  TabVisAction,
} from "../utils/interfaces";

interface Props {}

let initUpperVisState: InitUpperVisState = {
  newBookmarkVis: false,
  newTabVis: false,
  backgroundSettingsVis: false,
  settingsVis: false,
  colorsSettingsVis: false,
  colorsBackgroundVis: false,
  colorsColumnVis: false,
  columnSelected: null,
  addTagVis_xs: false,
  settingsVis_xs: false,
};

function upperVisReducer(state: InitUpperVisState, action: UpperVisAction) {
  const upperVisStateAllFalse: InitUpperVisState = {
    ...initUpperVisState,
  };

  let upperVisStateMostlyFalse: InitUpperVisState = {
    ...initUpperVisState,
    addTagVis_xs: state.addTagVis_xs,
    settingsVis_xs: state.settingsVis_xs,
  };

  switch (action.type) {
    case "BACKGROUND_SETTINGS_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        backgroundSettingsVis: !state.backgroundSettingsVis,
      };
    case "COLORS_SETTINGS_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        colorsSettingsVis: !state.colorsSettingsVis,
      };
    case "NEW_BOOKMARK_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        newBookmarkVis: !state.newBookmarkVis,
      };
    case "NEW_TAB_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        newTabVis: !state.newTabVis,
      };
    case "SETTINGS_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        settingsVis: !state.settingsVis,
      };
    case "COLORS_BACKGROUND_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        colorsBackgroundVis: !state.colorsBackgroundVis,
      };
    case "COLORS_COLUMN_TOGGLE":
      return {
        ...upperVisStateMostlyFalse,
        colorsColumnVis: !state.colorsColumnVis,
      };
    case "COLORS_COLUMN_OPEN":
      return {
        ...upperVisStateMostlyFalse,
        columnSelected: action.payload as number,
        colorsColumnVis: true,
      };
    case "ADD_TAG_XS_TOGGLE":
      return {
        // ...upperVisStateMostlyFalse,
        ...state,
        addTagVis_xs: !state.addTagVis_xs,
        settingsVis_xs: false,
      };
    case "SETTINGS_XS_TOGGLE":
      return {
        // ...upperVisStateMostlyFalse,
        ...state,
        settingsVis_xs: !state.settingsVis_xs,
        addTagVis_xs: false,
      };

    case "CLOSE_ALL":
      return {
        ...upperVisStateMostlyFalse,
      };

    default:
      return { ...upperVisStateMostlyFalse };
  }
}

function Main({}: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [
    backgroundColorData,
    setBackgroundColorData,
  ] = backgroundColorState.use();

  // const [columnSelected, setColumnSelected] = useState<number | null >(null);
  const [upperVisState, upperVisDispatch] = useReducer(
    upperVisReducer,
    initUpperVisState
  );

  const [tabType, setTabType] = useState<"folder" | "note" | "rss">("folder");

  function dispatchTabAction(visDispatch: (value: TabVisAction) => void) {
    visDispatch({ type: "TAB_EDITABLES_CLOSE" });
  }

  //
  useEffect(() => {
    if (
      upperVisState.colorsSettingsVis ||
      upperVisState.backgroundSettingsVis ||
      upperVisState.settingsVis
    ) {
    
      // console.log(document.documentElement.scrollHeight);
      // console.log(document.documentElement.clientHeight);
  
      // document.documentElement - for body it is <html> elemen
      // does not work with document.body scrollHeight & clientHeight!
      if (
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
      ) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "17px";
      }

      return;
    }

    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
  }, [
    upperVisState.colorsSettingsVis,
    upperVisState.backgroundSettingsVis,
    upperVisState.settingsVis,
  ]);

  // useEffect(() => {
  // console.log(document.body.scrollHeight);
  //     console.log(document.body.clientHeight);
  //     console.log(document.body.offsetHeight);
  // }, [document.body.scrollHeight, document.body.clientHeight, document.body.offsetHeight])

  return (
    // <div className="relative h-screen bg-testBackground bg-cover">
    <div
      className={`relative min-h-screen ${
        globalSettingsData.picBackground
          ? `bg-${globalSettingsData.defaultImage}`
          : `bg-${backgroundColorData}`
      } bg-cover bg-fixed`}
      onScroll={(e) => {
        e.preventDefault();
        return;
      }}
    >
      {upperVisState.newTabVis && (
        <NewTab_UpperUI upperVisDispatch={upperVisDispatch} tabType={tabType} />
      )}
      {upperVisState.newBookmarkVis && (
        <Bookmark_newAndEdit
          upperVisDispatch={upperVisDispatch}
          bookmarkComponentType={"new_upperUI"}
        />
      )}
      {upperVisState.backgroundSettingsVis && (
        <Background_UpperUI upperVisDispatch={upperVisDispatch} />
      )}
      {upperVisState.settingsVis && (
        <Settings_UpperUI upperVisDispatch={upperVisDispatch} />
      )}

      {upperVisState.colorsSettingsVis && (
        <Colors_UpperUI upperVisDispatch={upperVisDispatch} />
      )}
      <UpperUI
        upperVisState={upperVisState}
        upperVisDispatch={upperVisDispatch}
        setTabType={setTabType}
      />
      <Grid upperVisDispatch={upperVisDispatch} />
    </div>
  );
}

export default Main;
