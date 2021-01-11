import React from 'react'

interface Props {
    singleColumnColor: string | undefined
}

function GapAfterBookmark_Img({singleColumnColor}: Props): JSX.Element{
    return (
        <div className="h-6"
        style={{backgroundColor: singleColumnColor }}
        >
        </div>
    )
}

export default GapAfterBookmark_Img;