import React, { useState } from "react";

import { backgroundColorState } from "../../state/colorsState";


import { ReactComponent as EyeOffSVG } from "../../svgs/eye-off.svg";

interface Props {
  setBackgroundColorsToChooseVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function EyeOff({
  setBackgroundColorsToChooseVis,
}: Props): JSX.Element {
  const [
    backgroundColorData,
    setBackgroundColorState,
  ] = backgroundColorState.use();

  const [selected, setSelected] = useState(false);

  function calcIconBackground(pageBackgroundColor: string) {
    if (pageBackgroundColor === "white") {
      return `$bg-${pageBackgroundColor}`;
    }

    if (pageBackgroundColor === "black") {
      return `bg-white text-${backgroundColorData}`;
    }

    let whiteRegex = /[3456789]00$/;

    if (whiteRegex.test(pageBackgroundColor)) {
      return `bg-white text-${backgroundColorData}`;
    } else {
      return `$bg-${pageBackgroundColor}`;
    }
  }

  return (
    // <div className={`h-8 w-6 bg-${backgroundColorData} ${selected ? "border-2" : "border"} border-black cursor-pointer hover:border-gray-400`}

    <EyeOffSVG
      // className={`h-7 bg-${calcIconBackground(backgroundColorData)} opacity-80 border border-black rounded-lg cursor-pointer fill-current text-${backgroundColorData} hover:border-gray-500`}
      className={`h-7 ${calcIconBackground(
        backgroundColorData
      )} opacity-80 border border-black rounded-lg cursor-pointer  hover:border-gray-500`}
      onClick={() => {
        // setSelected((b) => !b);
        // setBackgroundColorsToChooseVis((b) => !b);
      }}
    />
  );
}

export default EyeOff;
