import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import SingleColor_Tab from "./SingleColor_Tab";

import { tabColors } from "../../utils/colors_tab";
// import {columnColors} from "../../utils/columnColors";

interface Props {
  setIconsVis: (value: React.SetStateAction<boolean>) => void;
  tabID: string | number;
  tabColor: string | null;
  tabType: "folder" | "note" | "rss";
  top: number;
  left: number;
  tabWidth: number;
}

function ColorsToChoose_Tab({
  setIconsVis,
  tabID,
  tabColor,
  tabType,
  top,
  left,
  tabWidth,
}: Props): JSX.Element {
  // useEffect(() => {
  //   console.log(document.documentElement.scrollTop);

  // }, [document.documentElement.scrollTop])

  function mappingColors(colors: string[][]) {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Tab
                color={el}
                tabID={tabID}
                tabColor={tabColor}
                tabType={tabType}
                key={j}
              />
            );
          })}
        </div>
      );
    });
  }
  // @ts-ignore
  return ReactDOM.createPortal(
    <div
      className={`absolute bg-gray-100 mr-px mt-px z-40`}
      style={{
        top: `${(top + 32 + document.documentElement.scrollTop)}px`,
        left: `${(left + (tabWidth - 187))}px`,
      }}
      onMouseEnter={() => {
        setIconsVis(true);
      }}
      // onMouseLeave={() => {
      //   setIconsVisibility(false)
      // }}
    >
      {mappingColors(tabColors)}

      {/* scroll:{document.body.scrollHeight} */}
    </div>,
    document.body
  );
}

export default ColorsToChoose_Tab;
