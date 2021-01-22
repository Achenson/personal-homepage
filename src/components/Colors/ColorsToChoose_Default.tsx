import React from "react";

import DefaultSingleColor from "./SingleColor_Default";
import DefaultSingleColor_Img from "./SingleColor_Default_Img";

import { folderColors } from "../../utils/folderColors";
import { columnColors, imageColumnColors } from "../../utils/columnColors";

import { globalSettingsState } from "../../state/defaultSettings";

interface Props {
  // setIconsVisibility: (value: React.SetStateAction<boolean>) => void;

  // bookmarkTitle: string;
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

function DefaultColorsToChoose({ defaultColorsFor }: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  function mapFolderColors() {
    return folderColors.map((row, i) => {
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

  function mapColumnColors() {
    if (!globalSettingsData.picBackground) {
      return columnColors.map((row, i) => {
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



    return imageColumnColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <DefaultSingleColor_Img
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
      <div className="absolute bg-white" style={{ left: "0px", top: "0px" }}>
        {defaultColorsFor === "column_1" ||
        defaultColorsFor === "column_2" ||
        defaultColorsFor === "column_3" ||
        defaultColorsFor === "column_4"
          ? mapColumnColors()
          : mapFolderColors()}
      </div>
    </div>
  );
}

export default DefaultColorsToChoose;
