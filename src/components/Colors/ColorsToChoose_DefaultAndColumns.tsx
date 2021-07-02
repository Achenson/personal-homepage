import React, { useEffect } from "react";

import FocusLock from "react-focus-lock";

import SingleColor_DefaultAndColumn from "./SingleColor_DefaultAndColumn";

import { tabColors } from "../../utils/colors_tab";
import { columnColors, imageColumnColors } from "../../utils/colors_column";

import { globalSettingsState } from "../../state/defaultSettings";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

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
  leftPositioning: string;
  upperVisState: UpperVisState;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  setColorsToChooseVis?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColorsToChoose_DefaultAndColumns({
  defaultColorsFor,
  leftPositioning,
  upperVisDispatch,
  upperVisState,
  setColorsToChooseVis,
}: Props): JSX.Element {
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Escape") {
      if (/column/.test(defaultColorsFor)) {
        if (upperVisState.columnSelected !== null) {
          upperVisDispatch({ type: "COLORS_COLUMN_TOGGLE" });
          // setColumnSelected(null);
        }
      }

      if (setColorsToChooseVis) {
        setColorsToChooseVis(false);
      }
    }
  }

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

  function mapColumnColors(arrToMap: string[][]) {
    return arrToMap.map((row, i) => {
      // return imageColumnColors.map((row, i) => {
      return (
        <div className="flex" key={i}>
          {row.map((el, j) => {
            return (
              <SingleColor_DefaultAndColumn
                color={el}
                defaultColorsFor={defaultColorsFor}
                key={j}
                colsForBackgroundImg={
                  globalSettingsData.picBackground ? true : false
                }
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
        {/* <div className="absolute bg-white" style={{ left: "-93px", top: "0px" }}> */}
        <div
          className="absolute bg-white"
          style={{
            // left: `${
            //   defaultColorsFor === "folders" ||
            //   defaultColorsFor === "rss" ||
            //   defaultColorsFor === "notes"
            //     ? "8px"
            //     : "0px"
            // }`,
            left: leftPositioning,
            top: "1px",
          }}
        >
          {
            // defaultColorsFor === "column_1" ||
            // defaultColorsFor === "column_2" ||
            // defaultColorsFor === "column_3" ||
            // defaultColorsFor === "column_4"
            /column/.test(defaultColorsFor)
              ? mapColumnColors(
                  globalSettingsData.picBackground
                    ? imageColumnColors
                    : columnColors
                )
              : mapTabColors()
          }
        </div>
      </div>
    </FocusLock>
  );
}

export default ColorsToChoose_DefaultAndColumns;
