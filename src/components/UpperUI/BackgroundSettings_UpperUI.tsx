import React, { useState } from "react";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { globalSettingsState } from "../../state/defaultSettings";

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  // backgroundSettingsVis: boolean;
  // setBackgroundSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function BackgroundSettings_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  const [imgBackgroundMode, setImgBackgroundMode] = useState(true);

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  let finalColorForImgBackgroundMode = uiColorData;

  if (uiColorData === "blueGray-400") {
    finalColorForImgBackgroundMode = "blueGray-700";
  }

  const imgDescription_1 = "Custom transparent colors for columns";
  const imgDescription_2 = "Upload background image or ";

  const noImgDescription = "Custom full colors for background and columns";

  function btnHover() {
    return `hover:bg-${uiColorData} hover:bg-opacity-50 hover:`;
  }

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
    >
      <div className="md:mb-40 relative">
        <div
          className={`bg-gray-200 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{ width: "417px", height: "205px" }}
        >
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                // if (backgroundSettingsVis) {
                //   setBackgroundSettingsVis(false);
                // }
                upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
              }}
            />
          </div>

          <div className="mx-2">
            <p className="text-center mb-3">Background mode</p>
            <div className="flex justify-between mb-3">
              <p
                className={`${
                  imgBackgroundMode
                    ? "cursor-default"
                    : "hover:text-opacity-50 cursor-pointer"
                } ${
                  imgBackgroundMode
                    ? "text-" + finalColorForImgBackgroundMode
                    : "text-gray-400"
                } text-lg`}
                onClick={() => {
                  if (!imgBackgroundMode) {
                    setImgBackgroundMode(true);
                    setGlobalSettingsData({
                      ...globalSettingsData,
                      picBackground: true,
                    });
                  }
                }}
              >
                Background image
              </p>
              {/* <p>|</p> */}
              <p
                className={`${
                  imgBackgroundMode
                    ? "hover:text-opacity-50 cursor-pointer"
                    : "cursor-default"
                } ${
                  imgBackgroundMode
                    ? "text-gray-400"
                    : "text-" + finalColorForImgBackgroundMode
                } text-lg`}
                onClick={() => {
                  if (imgBackgroundMode) {
                    setImgBackgroundMode(false);
                    setGlobalSettingsData({
                      ...globalSettingsData,
                      picBackground: false,
                    });
                  }
                }}
              >
                No background image
              </p>
            </div>

            {imgBackgroundMode ? (
              <div className="text-center">
                <p className="">{imgDescription_1}</p>
                <p className="mb-3">
                  {imgDescription_2}
                  <span
                    className={`text-${uiColorData} cursor-pointer hover:underline`}
                  >
                    use default
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-center mb-3">{noImgDescription}</p>
            )}

            <div
              className={`flex justify-between items-center ${
                imgBackgroundMode ? "" : "hidden"
              }`}
            >
              <div className="bg-white h-6 w-60"></div>
              <button
                className={`border border-${uiColorData} rounded-md px-1 pb-px hover:bg-${uiColorData} hover:bg-opacity-50 transition-colors duration-150`}
              >
                Upload image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSettings_UpperUI;
