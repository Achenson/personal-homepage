import React, {useState} from "react";
import Grid from "./Grid";
import NewLink_UpperUI from "./NewLink_UpperUI";
import NewBookmark_UpperUI from "./NewBookmark_UpperUI";
import Colors_UpperUI from "./Colors_UpperUI";
import UpperUI from "./UpperUI";



interface Props {}

function Main({}: Props): JSX.Element {

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);
  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);
  const [colorsVis, setColorsVis] = useState<boolean>(true);
  const [bookmarkType, setBookmarkType] = useState<"folder" | "note">("folder");

  return (
    <div className="relative">
      {newBookmarkVis ? <NewBookmark_UpperUI setNewBookmarkVis={setNewBookmarkVis} bookmarkType={bookmarkType}/> : null }
      {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis}/> : null }
      {colorsVis ? <Colors_UpperUI colorsVis={colorsVis} setColorsVis={setColorsVis}/> : null}    
      <UpperUI setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis} setColorsVis={setColorsVis} setBookmarkType={setBookmarkType}/>
      <Grid/>
    </div>
  );
}

export default Main;
