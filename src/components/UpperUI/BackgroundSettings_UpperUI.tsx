import React, { useState, useEffect } from "react";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { globalSettingsState } from "../../state/defaultSettings";

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";
import { useWindowSize } from "../../utils/hook_useWindowSize";

import Settings_inner_xs from "./Settings_inner_xs";

interface Props {
  // backgroundSettingsVis: boolean;
  // setBackgroundSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState
}

function BackgroundSettings_UpperUI({ upperVisDispatch, upperVisState }: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  // const [imgBackgroundMode, setImgBackgroundMode] = useState(true);

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const windowSize = useWindowSize();
  const [xsScreen, setXsScreen] = useState(() => upperVisState.xsSizing_initial);

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 490) {
        setXsScreen(true);
      } else {
        setXsScreen(false);
      }
    }
  }, [windowSize.width]);

  let finalColorForImgBackgroundMode = uiColorData;

  if (uiColorData === "blueGray-400") {
    finalColorForImgBackgroundMode = "blueGray-700";
  }

  const imgDescription_1 = "Transparent colors for columns";
  const imgDescription_2 = "Upload background image or use default:";

  const noImgDescription = "Full colors for background and columns";

  function btnHover() {
    return `hover:bg-${uiColorData} hover:bg-opacity-50 hover:`;
  }

  return (
    <div
      className="flex flex-col z-50 fixed h-full w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
      onClick={() => {
        upperVisDispatch({ type: "BACKGROUND_SETTINGS_TOGGLE" });
      }}
    >
      <div className="md:mb-40 relative"
      onClick={ (e) => {
        e.stopPropagation()
        return;
      }}
      >
        <div
          className={`bg-gray-100 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{
            width: `${xsScreen ? "350px" : "417px"}`,
            height: `${xsScreen ? "238px" : "205px"}`,
          }}
          // style={{ width: "350px", height: "250px" }}
        >

          <Settings_inner_xs
          currentSettings={"background"}
          upperVisDispatch={upperVisDispatch}
          />
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

          <div className="mx-0 xs:mx-2">
            <p className="text-center mb-3">Background mode</p>
            <div className="mb-3 text-center">
              <span className="text-lg">Background image:</span>
              <span
                className={`${
                  globalSettingsData.picBackground
                    ? "cursor-default" +
                      " " +
                      "text-" +
                      finalColorForImgBackgroundMode
                    : "hover:text-opacity-50 cursor-pointer text-gray-400"
                } text-lg`}
                onClick={() => {
                  if (!globalSettingsData.picBackground) {
                    // setImgBackgroundMode(true);
                    setGlobalSettingsData({
                      ...globalSettingsData,
                      picBackground: true,
                    });
                  }
                }}
              >
                &nbsp;&nbsp;ON
              </span>
              {/* <p>|</p> */}
              <span
                className={`${
                  globalSettingsData.picBackground
                    ? "hover:text-opacity-50 cursor-pointer text-gray-400"
                    : "cursor-default" +
                      " " +
                      "text-" +
                      finalColorForImgBackgroundMode
                } text-lg`}
                onClick={() => {
                  if (globalSettingsData.picBackground) {
                    // setImgBackgroundMode(false);
                    setGlobalSettingsData({
                      ...globalSettingsData,
                      picBackground: false,
                    });
                  }
                }}
              >
                &nbsp;&nbsp;OFF
              </span>
            </div>

            {globalSettingsData.picBackground ? (
              <div className="text-center">
                <p className={`mb-2 xs:mb-0`}>{imgDescription_1}</p>
                <div className={`mb-3`}>
                  <p className="block xs:inline-block">{imgDescription_2}</p>
                  <span> </span>
                  <span
                    className={`text-${uiColorData} cursor-pointer hover:underline`}
                    onClick={() => {
                      setGlobalSettingsData({
                        ...globalSettingsData,
                        defaultImage: "defaultBackground",
                      });
                    }}
                  >
                    1
                  </span>
                  <span> </span>
                  <span
                    className={`text-${uiColorData} cursor-pointer hover:underline`}
                    onClick={() => {
                      setGlobalSettingsData({
                        ...globalSettingsData,
                        defaultImage: "defaultBackground_2",
                      });
                    }}
                  >
                    2
                  </span>
                  <span> </span>
                  <span
                    className={`text-${uiColorData} cursor-pointer hover:underline`}
                    onClick={() => {
                      setGlobalSettingsData({
                        ...globalSettingsData,
                        defaultImage: "defaultBackground_3",
                      });
                    }}
                  >
                    3
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-center mb-3">{noImgDescription}</p>
            )}

            <div
              className={`flex justify-between items-center ${
                globalSettingsData.picBackground ? "" : "hidden"
              }`}
            >
              <div
                className={`bg-blueGray-50 h-6 ${xsScreen ? "w-48" : "w-60"} border border-gray-300`}
              ></div>
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
