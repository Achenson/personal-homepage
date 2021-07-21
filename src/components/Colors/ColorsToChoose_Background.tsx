import React, { useEffect, useState, useCallback } from "react";

import FocusLock from "react-focus-lock";

import {
  backgroundColors,
  backgroundColorsConcat,
} from "../../utils/colors_background";

import { UpperVisAction } from "../../utils/interfaces";

import SingleColor_Background from "./SingleColor_Background";

// import { backgroundColorState } from "../../state/colorsState";
import { useBackgroundColor } from "../../state/colorHooks";
import { useUpperUiContext } from "../../utils/upperUiContext";

interface Props {
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function ColorsToChoose_Background({}: //  upperVisDispatch
Props): JSX.Element {
  // const [backgroundColorData, setBackgroundColorData] =
  //   backgroundColorState.use();
  const backgroundColor = useBackgroundColor((state) => state.backgroundColor);

  const calcSelectedNumber = useCallback((): number => {
    let selectedNumber: number = 0;

    backgroundColorsConcat.forEach((color, i) => {
      if (color === backgroundColor) {
        selectedNumber = calcColorNumbering(color);
      }
    });

    return selectedNumber;
  }, [backgroundColor]);

  const [selectedNumber, setSelectedNumber] = useState(calcSelectedNumber());

  const upperUiContext = useUpperUiContext();

  useEffect(() => {
    setSelectedNumber(calcSelectedNumber());
  }, [backgroundColor, calcSelectedNumber]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape") {
      upperUiContext.upperVisDispatch({ type: "COLORS_BACKGROUND_TOGGLE" });
    }
  }

  function calcColorNumbering(color: string): number {
    // +1 because tabIndex for focus starts with one
    return backgroundColorsConcat.indexOf(color) + 1;
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
                colorArrLength={backgroundColorsConcat.length}
                colorNumber={calcColorNumbering(el)}
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
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
