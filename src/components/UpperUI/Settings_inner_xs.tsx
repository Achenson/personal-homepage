import React from "react";

import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";

import { UpperVisAction } from "../../utils/interfaces";

import {useUpperUiContext} from "../../utils/upperUiContext"

import { uiColorState } from "../../state/colorsState";

interface Props {
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  currentSettings: "background" | "colors" | "global";
}

function Settings_inner_xs({
  // upperVisDispatch,
  currentSettings,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  
  const upperUiContext = useUpperUiContext()

  return (
    <div
      className="xs:hidden absolute top-5
        flex items-center justify-between
         "
      style={{ width: "75px", left: "14px" }}
    >
      <button
        className="h-6 w-6 focus-1-dark"
        onClick={() => {
          // setBackgroundSettingsVis((b) => !b);
          if (currentSettings === "background") return;

          // upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
          upperUiContext.upperVisDispatch({type: "BACKGROUND_SETTINGS_TOGGLE"})
        }}

      >
        <PhotographSVG
          className={`h-full w-full transition-colors duration-75 
            ${
              currentSettings === "background"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
          // style={{ marginLeft: "-5px" }}
          aria-label={"Background mode"}
        />
      </button>

      <button
        className="h-6 w-6 focus-1-dark"
        onClick={() => {
          if (currentSettings === "colors") return;

          // upperVisDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
          upperUiContext.upperVisDispatch({type: "COLORS_SETTINGS_TOGGLE"})
          // setColorsVis((b) => !b);
        }}
        aria-label={"Default tab colors"}
      >
        <ColorSVG
          className={`h-full w-full  transition-colors duration-75 
            ${
              currentSettings === "colors"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
          style={{ marginRight: "-1px" }}
        />
      </button>

      <button
        className="h-6 w-6 focus-1-dark"
        onClick={() => {
          if (currentSettings === "global") return;
          // setTabOpenedData(null)

          // setCloseAllTabsData(true);
          // upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          upperUiContext.upperVisDispatch({type: "SETTINGS_TOGGLE"})
        }}
        aria-label={"Global settings"}
      >
        <SettingsSVG
          className={`h-full w-full transition-colors duration-75 
            ${
              currentSettings === "global"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
        />
      </button>
    </div>
  );
}

export default Settings_inner_xs;
