import React, { useState, useReducer } from "react";
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
  settingsVis_xs: true,
};

const upperVisStateAllFalse: InitUpperVisState = {
  ...initUpperVisState,
};

function upperVisReducer(state: InitUpperVisState, action: UpperVisAction) {
  switch (action.type) {
    case "BACKGROUND_SETTINGS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        backgroundSettingsVis: !state.backgroundSettingsVis,
      };
    case "COLORS_SETTINGS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        colorsSettingsVis: !state.colorsSettingsVis,
      };
    case "NEW_BOOKMARK_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        newBookmarkVis: !state.newBookmarkVis,
      };
    case "NEW_TAB_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        newTabVis: !state.newTabVis,
      };
    case "SETTINGS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        settingsVis: !state.settingsVis,
      };
    case "COLORS_BACKGROUND_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        colorsBackgroundVis: !state.colorsBackgroundVis,
      };
    case "COLORS_COLUMN_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        colorsColumnVis: !state.colorsColumnVis,
      };
    case "COLORS_COLUMN_OPEN":
      return {
        ...upperVisStateAllFalse,
        columnSelected: action.payload as number,
        colorsColumnVis: true,
      };
    case "ADD_TAG_XS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        addTagVis_xs: !state.addTagVis_xs,
      };
    case "SETTINGS_XS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        settingsVis_xs: !state.settingsVis_xs,
      };

    case "CLOSE_ALL":
      return {
        ...upperVisStateAllFalse,
      };

    default:
      return { ...upperVisStateAllFalse };
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

  return (
    // <div className="relative h-screen bg-testBackground bg-cover">
    <div
      className={`relative min-h-screen ${
        globalSettingsData.picBackground
          ? `bg-${globalSettingsData.defaultImage}`
          : `bg-${backgroundColorData}`
      } bg-cover bg-fixed`}
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
