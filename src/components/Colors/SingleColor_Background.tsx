import React from "react";

import { produce } from "immer";

import { backgroundColorState } from "../../state/colorsState";

interface Props {
  color: string;
}

function SingleColor_Background({ color }: Props): JSX.Element {
  const [
    backgroundColorData,
    setBackgroundColorData,
  ] = backgroundColorState.use();

  function borderMaker() {
    if (color !== backgroundColorData) {
      return "border border-black";
    }

    return `${
      color === "black" || color === "blueGray-700" || color === "yellow-900"
        ? "border-2 border-gray-100 z-50"
        : "border-2 border-black"
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
