import React from "react";

import DefaultSingleColor from "./DefaultSingleColor";

import {folderColors} from "../../utils/folderColors";
import {columnColors} from "../../utils/columnColors";

interface Props {
  // setIconsVisibility: (value: React.SetStateAction<boolean>) => void;

  // bookmarkTitle: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}



function DefaultColorsToChoose({ defaultColorsFor }: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return colors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <DefaultSingleColor
                color={el}
                defaultColorsFor={defaultColorsFor}
                key={j}
              />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-gray-100 z-50 relative"

      // onMouseEnter={() => {
      //   setIconsVisibility(true);
      // }}

      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      <div className="absolute" style={{ left: "-93px", top: "0px" }}>
        {defaultColorsFor === "column_1" ||
        defaultColorsFor === "column_2" ||
        defaultColorsFor === "column_3" ||
        defaultColorsFor === "column_4"
          ? mappingColors(columnColors)
          : mappingColors(folderColors)}
      </div>
    </div>
  );
}

export default DefaultColorsToChoose;
