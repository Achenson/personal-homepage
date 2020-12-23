import React from "react";
import SingleColor from "./SingleColor";

import {folderColors} from "../../utils/folderColors";
// import {columnColors} from "../../utils/columnColors";

interface Props {
  setIconsVisibility: (value: React.SetStateAction<boolean>) => void;
  bookmarkTitle: string;
}


function ColorsToChoose({
  setIconsVisibility,
  bookmarkTitle,
}: Props): JSX.Element {
  function mappingColors(colors: string[][]) {
    return folderColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor color={el} bookmarkTitle={bookmarkTitle} key={j} />
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
      {mappingColors(folderColors)}
    </div>
  );
}

export default ColorsToChoose;
