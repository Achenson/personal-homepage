import React from 'react';

interface Props {
  color: string
}

function SingleColor({color}: Props): JSX.Element{
    return (
        <div className={`h-4 w-8 bg-${color} cursor-pointer border border-black hover:border-gray-500`}></div>
    )
};

export default SingleColor;