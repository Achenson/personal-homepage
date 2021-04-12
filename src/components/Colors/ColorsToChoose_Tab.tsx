import React from "react";
import SingleColor_Tab from "./SingleColor_Tab";

import {tabColors} from "../../utils/tabColors";
// import {columnColors} from "../../utils/columnColors";

interface Props {
  setIconsVis: (value: React.SetStateAction<boolean>) => void;
  tabID: string | number
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
}


function ColorsToChoose_Tab({
  setIconsVis,
  tabID,
  tabColor,
  tabType
}: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Tab color={el} tabID={tabID} tabColor={tabColor} tabType={tabType} key={j} />
            );
          })}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-gray-100 absolute right-0 mr-px mt-px z-40"
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
