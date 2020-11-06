import React from 'react'

interface Props {
    text: string;
    number: number;
}

function Test({text, number}: Props): JSX.Element{
    return (
        <div>
            testtest{text}{number}
        </div>
    )
}

export default Test;