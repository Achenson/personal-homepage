import React from "react";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import {
  noteColorState,
  folderColorState,
  rssColorState,
  uiColorState,
  columnsColorsState,
  resetColorsState,
} from "../../state/colorsState";

interface Props {
  settingsVis: boolean;
  setSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function Settings_UpperUI({
  settingsVis,
  setSettingsVis,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div className="md:mb-40 relative">
        <div
          className={`bg-gray-200 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{ width: "417px", height: "200px" }}
        >
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                if (settingsVis) {
                  setSettingsVis(false);
                }
              }}
            />
          </div>

          <p className="text-center">Global settings</p>
          {/* <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Folder default</p>
            <div
            
            >null</div>
          </div>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">Notes default</p>
            <div
              
            >null </div>
          </div>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="w-32">RSS default</p>
            <div
             
            >null</div>
          </div> */}

          {/* <p className="text-center mt-5">
            {" "}
            <span
           
            >
              RESET
            </span>{" "}
            all colours to default
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Settings_UpperUI;
