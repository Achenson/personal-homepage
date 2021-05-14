import React from 'react'

import { ReactComponent as PhotographSVG } from "../../svgs/photograph.svg";
import { ReactComponent as ColorSVG } from "../../svgs/beaker.svg";
import { ReactComponent as SettingsSVG } from "../../svgs/settingsAlt.svg";

import { UpperVisAction } from "../../utils/interfaces";

import {
  
  uiColorState,
  
} from "../../state/colorsState";


interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function Settings_inner_xs({upperVisDispatch}: Props): JSX.Element{

  const [uiColorData, setUiColorData] = uiColorState.use();
  
    return (
        <div>
        <div className="absolute left-0 top-0 ml-4 mt-5 w-20
        flex items-center justify-around
         bg-gray-100 border border-black rounded-md">
          <PhotographSVG
            className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            // style={{ marginLeft: "-5px" }}
            onClick={() => {
              // setBackgroundSettingsVis((b) => !b);

              upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
            }}
          />
          <ColorSVG
            className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData}`}
            style={{ marginLeft: "-4px" }}
            onClick={() => {
              upperVisDispatch({ type: "COLORS_SETTINGS_TOGGLE" });
              // setColorsVis((b) => !b);
            }}
          />
          <SettingsSVG
            className={`h-6 w-6 cursor-pointer transition-colors duration-75 hover:text-${uiColorData} -ml-1`}
            onClick={() => {
              // setTabOpenedData(null)

              // setCloseAllTabsData(true);
              upperVisDispatch({ type: "SETTINGS_TOGGLE" });
            }}
          />
        </div>
        </div>
    )
}

export default Settings_inner_xs;