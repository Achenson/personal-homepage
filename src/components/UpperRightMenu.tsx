import React from 'react'

interface Props {
    
}

function UpperRightMenu({}: Props): JSX.Element{
    return (
        <div className="bg-pink-400 h-10 w-32 absolute right-0 bottom-0 mb-2">
           Upper Right Menu
        </div>
    )
}

export default UpperRightMenu;