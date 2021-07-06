import React from "react";

import { produce } from "immer";

import { backgroundColorState } from "../../state/colorsState";
import { backgroundColorsLightFocus } from "../../utils/colors_background";

interface Props {
  color: string;
  colorCol: number;

  selectedNumber: number;
  colorNumber: number;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
  colorArrLength: number;
}

function SingleColor_Background({
  color,
  colorCol,
  selectedNumber,
  colorNumber,
  setSelectedNumber,
  colorArrLength,
}: Props): JSX.Element {
  const [backgroundColorData, setBackgroundColorData] =
    backgroundColorState.use();

  function borderMaker() {
    // if (color !== backgroundColorData) {
    if (colorNumber !== selectedNumber) {
      return "border border-black";
    }

    // return `border-2 z-20 ${
    //   colorCol === 6 || colorCol === 7 || colorCol === 8 || colorCol === 9
    //     ? "border-gray-100"
    //     : "border-black"
    // }`;

    return `border-2 z-20 ${
      [6, 7, 8, 9].indexOf(colorCol) > -1 ? "border-gray-100" : "border-black"
    }`;
  }

  function focusColor(): string {
    if (backgroundColorsLightFocus.indexOf(color) > -1) {
      return "gray-400";
    }

    return "gray-500";
  }

  let tabIndex = calcTabIndex();

  function calcTabIndex() {
    let indexToReturn = colorNumber - selectedNumber + 1;

    if (indexToReturn >= 1) {
      return indexToReturn;
    }

    return colorArrLength - selectedNumber + colorNumber + 1;
  }


  return (
    <button
      className={`h-4 w-4 -mr-px -mt-px bg-${color} cursor-pointer
      ${borderMaker()}
      hover:border-2 hover:border-gray-500 hover:z-50 
      focus:outline-none focus-visible:ring-2 ring-${focusColor()} ring-inset
      `}
      onClick={() => {
        setBackgroundColorData(color);
        setSelectedNumber(colorNumber)
      }}
      tabIndex={tabIndex}
    >
      {/* {colorNumber} */}
      {/* {selectedNumber} */}
    </button>
  );
}

export default SingleColor_Background;
