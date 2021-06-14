import React from "react";

import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";

import { UpperVisAction } from "../../utils/interfaces";

import { uiColorState } from "../../state/colorsState";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  currentSettings: "background" | "colors" | "global";
}

function Settings_inner_xs({
  upperVisDispatch,
  currentSettings,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  return (
    
      <div
        className="xs:hidden absolute top-5
        flex items-center justify-between
         "
         style={{width: "75px", left: "14px"}}
      >
        <PhotographSVG
            className={`h-6 w-6  transition-colors duration-75 
            ${
              currentSettings === "background"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
          // style={{ marginLeft: "-5px" }}
          onClick={() => {
            // setBackgroundSettingsVis((b) => !b);
            if (currentSettings === "background") return;

            upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
          }}
        />
        <ColorSVG
          className={`h-6 w-6  transition-colors duration-75 
            ${
              currentSettings === "colors"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
          style={{ marginRight: "-1px" }}
          onClick={() => {

            if (currentSettings === "colors") return;

            upperVisDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
            // setColorsVis((b) => !b);
          }}
        />
        <SettingsSVG
            className={`h-6 w-6  transition-colors duration-75 
            ${
              currentSettings === "global"
                ? "text-gray-800"
                : `text-blueGray-400 cursor-pointer hover:text-${uiColorData}`
            }
            `}
          onClick={() => {
            if (currentSettings === "global") return;
            // setTabOpenedData(null)

            // setCloseAllTabsData(true);
            upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          }}
        />
      </div>
   
  );
}

export default Settings_inner_xs;
