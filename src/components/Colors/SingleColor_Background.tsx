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

    return "border-2 border-black";
  }

  return (
    <div
      className={`h-4 w-4 bg-${color} cursor-pointer
      ${borderMaker()}
         hover:border-gray-400`}
      onClick={() => {
        setBackgroundColorData(color);
      }}
    ></div>
  );
}

export default SingleColor_Background;
