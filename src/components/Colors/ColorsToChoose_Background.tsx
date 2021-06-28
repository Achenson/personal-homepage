import React from "react";

import FocusLock from "react-focus-lock";

import { backgroundColors } from "../../utils/colors_background";

import SingleColor_Background from "./SingleColor_Background";

interface Props {}

function ColorsToChoose_Background({}: Props): JSX.Element {
  function mapBackgroundColors() {
    return backgroundColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Background
                // defaultColorsFor="column_4"
                color={el}
                key={j}
                colorCol={j}
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <FocusLock>
      <div className="z-50 relative">
        <div
          className="absolute bg-white"
          style={{ left: "-98px", top: "105px" }}
        >
          {mapBackgroundColors()}
        </div>
      </div>
    </FocusLock>
  );
}

export default ColorsToChoose_Background;
