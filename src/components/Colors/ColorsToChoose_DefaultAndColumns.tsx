import React from "react";

import SingleColor_DefaultAndColumn from "./SingleColor_DefaultAndColumn";
import SingleColor_Default_Img from "./SingleColor_Column_Img";

import { tabColors } from "../../utils/colors_tab";
import { columnColors, imageColumnColors } from "../../utils/colors_column";

import { globalSettingsState } from "../../state/defaultSettings";

interface Props {
  // setIconsVisibility: (value: React.SetStateAction<boolean>) => void;

  // tabTitle: string;
  defaultColorsFor:
    | "folders"
    | "notes"
    | "rss"
    | "column_1"
    | "column_2"
    | "column_3"
    | "column_4"
    | "unselected";
}

function ColorsToChoose_DefaultAndColumns({ defaultColorsFor }: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function mapTabColors() {
    return tabColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_DefaultAndColumn
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

  function mapColumnColors() {
    if (!globalSettingsData.picBackground) {
      return columnColors.map((row, i) => {
        return (
          <div className="flex" key={i}>
            {row.map((el, j) => {
              return (
                <SingleColor_DefaultAndColumn
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



    return imageColumnColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_Default_Img
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
    <div className="z-50 relative">
      {/* <div className="absolute bg-white" style={{ left: "-93px", top: "0px" }}> */}
      <div className="absolute bg-white" style={{ left: "0px", top: "1px" }}>
        {defaultColorsFor === "column_1" ||
        defaultColorsFor === "column_2" ||
        defaultColorsFor === "column_3" ||
        defaultColorsFor === "column_4"
          ? mapColumnColors()
          : mapTabColors()}
      </div>
    </div>
  );
}

export default ColorsToChoose_DefaultAndColumns;
