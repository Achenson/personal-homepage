import React from "react";
import SingleColor_Tab from "./SingleColor_Tab";

import {tabColors} from "../../utils/tabColors";
// import {columnColors} from "../../utils/columnColors";

interface Props {
  setIconsVis: (value: React.SetStateAction<boolean>) => void;
  tabID: string | number
}


function ColorsToChoose_Tab({
  setIconsVis,
  tabID
}: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Tab color={el} tabID={tabID} key={j} />
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
        setIconsVis(true);
      }}
      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      {mappingColors(tabColors)}
    </div>
  );
}

export default ColorsToChoose_Tab;
