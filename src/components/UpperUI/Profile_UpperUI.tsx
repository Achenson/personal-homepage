import React, { useState, useEffect } from "react";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { globalSettingsState } from "../../state/defaultSettings";

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction } from "../../utils/interfaces";

// import { useWindowSize } from "../../utils/hook_useWindowSize";

interface Props {
  // backgroundSettingsVis: boolean;
  // setBackgroundSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function Profile_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  // const [imgBackgroundMode, setImgBackgroundMode] = useState(true);

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [loginOrRegister, setLoginOrRegister] = useState<"login" | "register">(
    "login"
  );

  // const windowSize = useWindowSize();
  // const [xsScreen, setXsScreen] = useState(false);

  // useEffect(() => {
  //   if (windowSize.width) {
  //     if (windowSize.width < 490) {
  //       setXsScreen(true);
  //     } else {
  //       setXsScreen(false);
  //     }
  //   }
  // }, [windowSize.width]);

  let finalColorForImgBackgroundMode = uiColorData;

  if (uiColorData === "blueGray-400") {
    finalColorForImgBackgroundMode = "blueGray-700";
  }

  // function btnHover() {
  //   return `hover:bg-${uiColorData} hover:bg-opacity-50 hover:`;
  // }

  return (
    <div
      className="flex flex-col z-50 absolute h-screen w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
      onClick={() => {
        upperVisDispatch({ type: "PROFILE_TOGGLE" });
      }}
    >
      <div
        className="md:mb-40 relative"
        onClick={(e) => {
          e.stopPropagation();
          return;
        }}
      >
        <div
          className={`bg-gray-200 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{
            width: `350px`,
            height: `238px" : "205px`,
          }}
          // style={{ width: "350px", height: "250px" }}
        >
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                upperVisDispatch({ type: "PROFILE_TOGGLE" });
              }}
            />
          </div>

          <div className="mx-0 xs:mx-2">
            <p className="text-center mb-3">Login / Register</p>
            <div className="mb-3 mx-auto w-40 flex justify-between">
              
              <span
                className={`${
                  loginOrRegister === "login"
                    ? "cursor-default" +
                      " " +
                      "text-" +
                      finalColorForImgBackgroundMode
                    : "hover:text-opacity-50 cursor-pointer text-gray-400"
                } text-lg`}
                onClick={() => {
         
                  setLoginOrRegister("login");
                }}
              >
                Login
              </span>
              {/* <p>|</p> */}
              <span
                className={`${
                  loginOrRegister === "login"
                    ? "hover:text-opacity-50 cursor-pointer text-gray-400"
                    : "cursor-default" +
                      " " +
                      "text-" +
                      finalColorForImgBackgroundMode
                } text-lg`}
                onClick={() => {
           
                  setLoginOrRegister("register");
                }}
              >
                Register
              </span>
            </div>
         

           
              
              <button
                className={`border border-${uiColorData} rounded-md px-1 pb-px hover:bg-${uiColorData} hover:bg-opacity-50 transition-colors duration-150`}
              >
               Login
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile_UpperUI;
