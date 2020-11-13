import React, {useState} from "react";
import Grid from "./Grid";
import NewLink_UpperUI from "./NewLink_UpperUI";
import NewBookmark_UpperUI from "./NewBookmark_UpperUI";
import UpperUI from "./UpperUI";



interface Props {}

function Main({}: Props): JSX.Element {

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);
  const [newBookmarkVis, setNewBookmarkVis] = useState<boolean>(false);

  return (
    <div className="relative">
      {newBookmarkVis ? <NewBookmark_UpperUI setNewBookmarkVis={setNewBookmarkVis}/> : null }
      {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis}/> : null }    
      <UpperUI setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis}/>
      <Grid />
    </div>
  );
}

export default Main;
