import React, { useState, useReducer } from "react";
import Grid from "./Grid";
import NewBookmark_UpperUI from "./Bookmark_newAndEdit";
import NewTab_UpperUI from "./UpperUI/NewTab_UpperUI";
import Colors_UpperUI from "./UpperUI/Colors_UpperUI";
import UpperUI from "./UpperUI/UpperUI";

import { globalSettingsState } from "../state/defaultSettings";

import { backgroundColorState } from "../state/colorsState";
import Background_UpperUI from "./UpperUI/Background_UpperUI";
import Settings_UpperUI from "./UpperUI/Settings_UpperUI";

interface Props {}

interface InitUpperVisState {
  newBookmarkVis: boolean;
  newTabVis: boolean;
  backgroundSettingsVis: boolean;
  settingsVis: boolean;
  colorsVis: boolean;
}

let initUpperVisState: InitUpperVisState = {
  newBookmarkVis: false,
  newTabVis: false,
  backgroundSettingsVis: false,
  settingsVis: false,
  colorsVis: false,
};

const upperVisStateAllFalse = {
  ...initUpperVisState,
};

interface UpperVisAction {
  type:
    | "NEW_BOOKMARK_TOGGLE"
    | "NEW_TAB_TOGGLE"
    | "BACKGROUNG_SETTINGS_TOGGLE"
    | "SETTINGS_TOGGLE"
    | "COLORS_TOGGLE";
  payload?: string | number;
}

function upperVisReducer(state: InitUpperVisState, action: UpperVisAction) {
  switch (action.type) {
    case "BACKGROUNG_SETTINGS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        backgroundSettingsVis: !state.backgroundSettingsVis,
      };
    case "COLORS_TOGGLE":
      return {
        ...upperVisStateAllFalse,
        colorsVis: !state.colorsVis,
      };
    case "NEW_BOOKMARK_TOGGLE":
      return {
        ...upperVisStateAllFalse,
      newBookmarkVis  : !state.newBookmarkVis,
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
  }
}

function Main({}: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [
    backgroundColorData,
    setBackgroundColorData,
  ] = backgroundColorState.use();

  const [upperVisState, upperVisDispatch] = useReducer(
    upperVisReducer,
    initUpperVisState
  );

  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  const [newTabVis, setNewTabVis] = useState<boolean>(false);

  const [backgroundSettingsVis, setBackgroundSettingsVis] = useState<boolean>(
    false
  );

  const [settingsVis, setSettingsVis] = useState<boolean>(false);

  const [colorsVis, setColorsVis] = useState<boolean>(false);

  const [tabType, setTabType] = useState<"folder" | "note" | "rss">("folder");

  return (
    // <div className="relative h-screen bg-testBackground bg-cover">
    <div
      className={`relative h-screen ${
        globalSettingsData.picBackground
          ? "bg-testBackground"
          : `bg-${backgroundColorData}`
      } bg-cover`}
    >
      {newTabVis ? (
        <NewTab_UpperUI setNewTabVis={setNewTabVis} tabType={tabType} />
      ) : null}
      {newBookmarkVis ? (
        <NewBookmark_UpperUI
          setBookmarkVis={setNewBookmarkVis}
          bookmarkComponentType={"new_upperUI"}
        />
      ) : null}
      {backgroundSettingsVis ? (
        <Background_UpperUI
          setBackgroundSettingsVis={setBackgroundSettingsVis}
          backgroundSettingsVis={backgroundSettingsVis}
        />
      ) : null}
      {settingsVis ? (
        <Settings_UpperUI
          setSettingsVis={setSettingsVis}
          settingsVis={settingsVis}
        />
      ) : null}

      {colorsVis ? (
        <Colors_UpperUI colorsVis={colorsVis} setColorsVis={setColorsVis} />
      ) : null}
      <UpperUI
        setNewBookmarkVis={setNewBookmarkVis}
        setNewTabVis={setNewTabVis}
        setBackgroundSettingsVis={setBackgroundSettingsVis}
        setSettingsVis={setSettingsVis}
        setColorsVis={setColorsVis}
        setTabType={setTabType}
      />
      <Grid />
    </div>
  );
}

export default Main;
