import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";

import { ReactComponent as DocumentSVG } from "../../svgs/document.svg";

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
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}
  
      <DocumentSVG className={`h-7 bg-gray-100 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
    onClick={ () => {
      setSelected(b => !b)
      setBackgroundColorsToChooseVis(b=>!b)
    }}
    />
  
  
  );
}

export default BackgroundColor;
