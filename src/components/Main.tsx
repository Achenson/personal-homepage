import React, { useState } from "react";
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

function Main({}: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [
    backgroundColorData,
    setBackgroundColorData,
  ] = backgroundColorState.use();

  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  const [newTabVis, setNewTabVis] = useState<boolean>(false);

  const [backgroundSettingsVis, setBackgroundSettingsVis] = useState<boolean>(
    false
  );

  const [settingsVis, setSettingsVis] = useState<boolean>(false);

  const [colorsVis, setColorsVis] = useState<boolean>(false);
  const [tabType, setTabType] = useState<"folder" | "note" | "rss">(
    "folder"
  );

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
        <NewTab_UpperUI
          setNewTabVis={setNewTabVis}
          tabType={tabType}
        />
      ) : null}
      {newBookmarkVis ? <NewBookmark_UpperUI setBookmarkVis={setNewBookmarkVis} bookmarkComponentType={"new_upperUI"} /> : null}
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
