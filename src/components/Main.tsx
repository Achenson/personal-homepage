import React, {useState} from "react";
import Grid from "./Grid";
import NewLink_UpperUI from "./UpperUI/NewLink_UpperUI";
import NewBookmark_UpperUI from "./UpperUI/NewBookmark_UpperUI";
import Colors_UpperUI from "./UpperUI/Colors_UpperUI";
import UpperUI from "./UpperUI/UpperUI";

import {globalSettingsState} from "../state/defaultSettings";

import {backgroundColorState} from "../state/colorsState"

interface Props {}

function Main({}: Props): JSX.Element {



  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use()
  const [backgroundColorData, setBackgroundColorData] = backgroundColorState.use()

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);
  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  const [colorsVis, setColorsVis] = useState<boolean>(false);
  const [bookmarkType, setBookmarkType] = useState<"folder" | "note" | "rss">("folder");

  return (
    // <div className="relative h-screen bg-testBackground bg-cover">
    <div className={`relative h-screen  ${globalSettingsData.picBackground ? "bg-testBackground" : `bg-${backgroundColorData}`} bg-cover`}>
      {newBookmarkVis ? <NewBookmark_UpperUI setNewBookmarkVis={setNewBookmarkVis} bookmarkType={bookmarkType}/> : null }
      {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis}/> : null }
      {colorsVis ? <Colors_UpperUI colorsVis={colorsVis} setColorsVis={setColorsVis}/> : null}    
      <UpperUI setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis} setColorsVis={setColorsVis} setBookmarkType={setBookmarkType}/>
      <Grid/>
    </div>
  );
}

export default Main;
