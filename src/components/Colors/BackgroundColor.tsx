import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";

interface Props {}

function BackgroundColor({}: Props): JSX.Element {
  const [
    backgroundColorData,
    setBackgroundColorState,
  ] = backgroundColorState.use();

 const [selected, setSelected] = useState(false)

  return (
    <div className={`h-8 w-6 ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}
    onClick={ () => {
      setSelected(b => !b)
    }}
    ></div>
  );
}

export default BackgroundColor;
