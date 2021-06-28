import React, { useEffect } from "react";

import FocusLock from "react-focus-lock";

import { backgroundColors } from "../../utils/colors_background";

import { UpperVisAction } from "../../utils/interfaces";

import SingleColor_Background from "./SingleColor_Background";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function ColorsToChoose_Background({ upperVisDispatch }: Props): JSX.Element {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape") {
      upperVisDispatch({type: "COLORS_BACKGROUND_TOGGLE"})
    }
  }

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
