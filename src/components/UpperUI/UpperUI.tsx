import React, {useState} from 'react';
// import NewLink_UpperUI from './NewLink_UpperUI';

import UpperRightMenu from './UpperRightMenu'
import UpperLeftMenu from './UpperLeftMenu'


interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setColorsVis: React.Dispatch<React.SetStateAction<boolean>>;
  setBookmarkType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
}

function UpperUI({setNewLinkVis, setNewBookmarkVis, setColorsVis, setBookmarkType}: Props): JSX.Element{

  // const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

    return (
        <div className="h-36 relative mx-4 flex justify-between items-end">
            <UpperLeftMenu/>
            <UpperRightMenu setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis} setColorsVis={setColorsVis} setBookmarkType={setBookmarkType}/>

        

        </div>
    )
};

export default UpperUI;