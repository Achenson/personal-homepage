import React, {useState} from 'react';
// import NewLink_UpperUI from './NewLink_UpperUI';

import UpperRightMenu from './UpperRightMenu'


interface Props {
  setNewLinkVis: React.Dispatch<React.SetStateAction<boolean>>;
  setNewBookmarkVis: React.Dispatch<React.SetStateAction<boolean>>
}

function UpperUI({setNewLinkVis, setNewBookmarkVis}: Props): JSX.Element{

  // const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

    return (
        <div className="h-32 relative mx-4">
            <UpperRightMenu setNewLinkVis={setNewLinkVis} setNewBookmarkVis={setNewBookmarkVis}/>

        

        </div>
    )
};

export default UpperUI;