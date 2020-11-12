import React, {useState} from 'react';
import NewLink_UpperUI from './NewLink_UpperUI';

import UpperRightMenu from './UpperRightMenu'


interface Props {

}

function UpperUI({}: Props): JSX.Element{

  const [newLinkVis, setNewLinkVis] = useState<boolean>(false);

    return (
        <div className="h-32 relative mx-4">
            <UpperRightMenu setNewLinkVis={setNewLinkVis}/>

        {newLinkVis ? <NewLink_UpperUI setNewLinkVis={setNewLinkVis}/> : null }    

        </div>
    )
};

export default UpperUI;