import React from "react";

import { produce } from "immer";

import { backgroundColorState } from "../../state/colorsState";

interface Props {
  color: string;
  colorCol: number;
}

function SingleColor_Background({ color, colorCol }: Props): JSX.Element {
  const [
    backgroundColorData,
    setBackgroundColorData,
  ] = backgroundColorState.use();

  function borderMaker() {
    if (color !== backgroundColorData) {
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

  return (
    <div
      className={`h-4 w-4 -mr-px -mt-px bg-${color} cursor-pointer
      ${borderMaker()}
      hover:border-2 hover:border-gray-500 hover:z-50`}
      onClick={() => {
        setBackgroundColorData(color);
      }}
    ></div>
  );
}

export default SingleColor_Background;
