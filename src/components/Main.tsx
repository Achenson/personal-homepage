import React, { useState, useReducer } from "react";
import Grid from "./Grid";
import Bookmark_newAndEdit from "./Bookmark_newAndEdit";
import NewTab_UpperUI from "./UpperUI/NewTab_UpperUI";
import Colors_UpperUI from "./UpperUI/Colors_UpperUI";
import UpperUI from "./UpperUI/UpperUI";

import { globalSettingsState } from "../state/defaultSettings";

import { backgroundColorState } from "../state/colorsState";
import Background_UpperUI from "./UpperUI/Background_UpperUI";
import Settings_UpperUI from "./UpperUI/Settings_UpperUI";

import {UpperVisAction} from "../utils/interfaces"

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
  newBookmarkVis: false,
  newTabVis: false,
  backgroundSettingsVis: false,
  settingsVis: false,
  colorsVis: false,
};


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

  // const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  // const [newTabVis, setNewTabVis] = useState<boolean>(false);

  // const [backgroundSettingsVis, setBackgroundSettingsVis] = useState<boolean>(
  //   false
  // );

  // const [settingsVis, setSettingsVis] = useState<boolean>(false);

  // const [colorsVis, setColorsVis] = useState<boolean>(false);

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
      {upperVisState.newTabVis ? (
        <NewTab_UpperUI 
        // setNewTabVis={setNewTabVis}
          upperVisDispatch={upperVisDispatch}
         tabType={tabType} />
      ) : null}
      {upperVisState.newBookmarkVis ? (
        <Bookmark_newAndEdit
        upperVisDispatch={upperVisDispatch}
          // setBookmarkVis={setNewBookmarkVis}
          bookmarkComponentType={"new_upperUI"}
        />
      ) : null}
      {upperVisState.backgroundSettingsVis ? (
        <Background_UpperUI
        upperVisDispatch={upperVisDispatch}
          // setBackgroundSettingsVis={setBackgroundSettingsVis}
          // backgroundSettingsVis={backgroundSettingsVis}
        />
      ) : null}
      {upperVisState.settingsVis ? (
        <Settings_UpperUI
        upperVisDispatch={upperVisDispatch}
          // setSettingsVis={setSettingsVis}
          // settingsVis={settingsVis}
        />
      ) : null}

      {upperVisState.colorsVis ? (
        <Colors_UpperUI 
        upperVisDispatch={upperVisDispatch}
        // colorsVis={colorsVis}
        // setColorsVis={setColorsVis}
         />
      ) : null}
      <UpperUI
        // setNewBookmarkVis={setNewBookmarkVis}
        // setNewTabVis={setNewTabVis}
        // setBackgroundSettingsVis={setBackgroundSettingsVis}
        // setSettingsVis={setSettingsVis}
        // setColorsVis={setColorsVis}
        upperVisDispatch={upperVisDispatch}
        setTabType={setTabType}
      />
      <Grid />
    </div>
  );
}

export default Main;
