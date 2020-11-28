import React, {useState} from 'react';
// import NewLink_UpperUI from './NewLink_UpperUI';

import UpperRightMenu from './UpperRightMenu'


interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setBookmarkType: React.Dispatch<React.SetStateAction<"folder" | "note">>;
}

function UpperUI({setNewLinkVis, setNewBookmarkVis, setColorsVis, setBookmarkType}: Props): JSX.Element{

  // const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

    return (
        <div className="h-32 relative mx-4">
            <UpperRightMenu setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis} setColorsVis={setColorsVis} setBookmarkType={setBookmarkType}/>

        

        </div>
    )
};

export default UpperUI;