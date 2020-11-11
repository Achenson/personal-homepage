import React from 'react';

import UpperRightMenu from './UpperRightMenu'

interface Props {

}

function UpperUI({}: Props): JSX.Element{
    return (
        <div className="h-32 relative mx-4">
            <UpperRightMenu/>


        </div>
    )
};

export default UpperUI;