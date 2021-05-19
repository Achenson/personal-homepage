import React, { useState, useEffect } from "react";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { loggedInState } from "../../state/defaultSettings";

import { uiColorState } from "../../state/colorsState";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

function Profile_UpperUI({ upperVisDispatch }: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  // const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [loginOrRegister, setLoginOrRegister] =
    useState<"login" | "register">("login");

  const [loggedInData, setLoggedInData] = loggedInState.use();

  const [inputHover, setInputHover] = useState(false);

  // useEffect(() => {

  // }, [inputHover, setInputHover])

  let finalColorForImgBackgroundMode = uiColorData;

  if (uiColorData === "blueGray-400") {
    finalColorForImgBackgroundMode = "blueGray-700";
  }

  return (
    <div
      // justify-center changed to paddingTop so login & register are on the same height
      className="flex flex-col z-50 fixed h-full w-screen items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)", paddingTop: "30vh" }}
      onClick={() => {
        upperVisDispatch({ type: "PROFILE_TOGGLE" });
      }}
    >
      <div
        // className="md:mb-40 relative"
        className="relative"
        onClick={(e) => {
          e.stopPropagation();
          return;
        }}
      >
        <div
          className={`bg-gray-100 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
          style={{
            width: `350px`,
          }}
        >
          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                upperVisDispatch({ type: "PROFILE_TOGGLE" });
              }}
            />
          </div>

          <div className="">
            <p className="text-center mb-3">User account</p>
            <div className="mx-auto w-36 flex justify-between">
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

            <div className="mt-3 mb-5 flex flex-col items-center">
              {loginOrRegister === "login" ? (
                <div className="">
                  <p>Email address / username</p>
                  <input
                    type="text"
                    className="input-profile hover:border-gray-200 transition-colors duration-150"
                    style={{
                      borderTopColor: `${inputHover ? "#D1D5DB" : "#9CA3AF"}`,
                      transitionProperty:
                        "background-color, border-color, color, fill, stroke",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDuration: "150ms",
                    }}
                    onMouseEnter={() => {
                      setInputHover(true);
                    }}
                    onMouseLeave={() => {
                      setInputHover(false);
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="">
                    <p>Username</p>
                    <input type="text" className="input-profile" />
                  </div>

                  <div className="mt-1">
                    <p>Email address</p>
                    <input type="text" className="input-profile" />
                  </div>
                </>
              )}

              <div
                className={`${loginOrRegister === "register" ? "mt-3" : ""}`}
              >
                <div className="mt-1">
                  <p>Password</p>
                  <input type="text" className="input-profile" />
                </div>

                {loginOrRegister === "register" && (
                  <div className="mt-1">
                    <p>Confirm password</p>
                    <input type="text" className="input-profile" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              {loginOrRegister === "login" ? (
                <button
                  className={`w-24 border border-${uiColorData} rounded-md px-1 pb-px hover:bg-${uiColorData} hover:bg-opacity-50 transition-colors duration-150`}
                  onClick={() => {
                    if (loggedInData === false) {
                      setLoggedInData(true);
                      console.log("sthh");
                    }

                    upperVisDispatch({ type: "PROFILE_TOGGLE" });
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className={`w-24 border border-${uiColorData} rounded-md px-1 pb-px hover:bg-${uiColorData} hover:bg-opacity-50 transition-colors duration-150`}
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile_UpperUI;
