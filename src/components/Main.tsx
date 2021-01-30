import React, { useState } from "react";
import Grid from "./Grid";
import NewLink_UpperUI from "./UpperUI/NewLink_UpperUI";
import NewBookmark_UpperUI from "./UpperUI/NewBookmark_UpperUI";
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

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);
  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);

  const [backgroundSettingsVis, setBackgroundSettingsVis] = useState<boolean>(
    false
  );

  const [settingsVis, setSettingsVis] = useState<boolean>(false);

  const [colorsVis, setColorsVis] = useState<boolean>(false);
  const [bookmarkType, setBookmarkType] = useState<"folder" | "note" | "rss">(
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
      {newBookmarkVis ? (
        <NewBookmark_UpperUI
          setNewBookmarkVis={setNewBookmarkVis}
          bookmarkType={bookmarkType}
        />
      ) : null}
      {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis} /> : null}
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
        setNewLinkVis={setNewLinkVis}
        setNewBookmarkVis={setNewBookmarkVis}
        setBackgroundSettingsVis={setBackgroundSettingsVis}
        setSettingsVis={setSettingsVis}
        setColorsVis={setColorsVis}
        setBookmarkType={setBookmarkType}
      />
      <Grid />
    </div>
  );
}

export default Main;
