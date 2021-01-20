import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";

interface Props {
  setBackgroundColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>
}

function BackgroundColor({setBackgroundColorsToChooseVis}: Props): JSX.Element {
  const [
    backgroundColorData,
    setBackgroundColorState,
  ] = backgroundColorState.use();

 const [selected, setSelected] = useState(false)



  return (
    <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}
    onClick={ () => {
      setSelected(b => !b)
      setBackgroundColorsToChooseVis(b=>!b)
    }}
    ></div>
  );
}

export default BackgroundColor;
