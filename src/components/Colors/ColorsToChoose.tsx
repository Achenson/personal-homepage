import React from "react";
import SingleColor from "./SingleColor";

import {tabColors} from "../../utils/tabColors";
// import {columnColors} from "../../utils/columnColors";

interface Props {
  setIconsVisibility: (value: React.SetStateAction<boolean>) => void;
  tabTitle: string;
}


function ColorsToChoose({
  setIconsVisibility,
  tabTitle,
}: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor color={el} tabTitle={tabTitle} key={j} />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-gray-100 absolute right-0 z-50"
      onMouseEnter={() => {
        setIconsVisibility(true);
      }}
      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      {mappingColors(tabColors)}
    </div>
  );
}

export default ColorsToChoose;
