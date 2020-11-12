import React, {useState} from "react";
import Grid from "./Grid";
import NewLink_UpperUI from "./NewLink_UpperUI";
import UpperUI from "./UpperUI";


interface Props {}

function Main({}: Props): JSX.Element {

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

  return (
    <div className="relative">
      {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis}/> : null }    
      <UpperUI setNewLinkVis={setNewLinkVis}/>
      <Grid />
    </div>
  );
}

export default Main;
