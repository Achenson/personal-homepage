import React, { useEffect, useState, useLayoutEffect } from "react";
import FocusLock from "react-focus-lock";

import { produce } from "immer";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { uiColorState } from "../../state/colorsState";
import {useUpperUiContext} from "../../utils/upperUiContext"

import {useTabs} from "../../state/useTabs"

import {
  rssSettingsState,
  globalSettingsState,
  // tabOpenedState,
} from "../../state/defaultSettings";

import { UpperVisAction, UpperVisState } from "../../utils/interfaces";

import { useWindowSize } from "../../utils/hook_useWindowSize";
// import { tabsDataState } from "../../state/tabsAndBookmarks";
import Settings_inner_xs from "./Settings_inner_xs";

interface Props {
  // settingsVis: boolean;
  // setSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  // upperVisDispatch: React.Dispatch<UpperVisAction>;
  // upperVisState: UpperVisState;
  // xsSizing: boolean;
}

function GlobalSettings_UpperUI({
  // upperVisDispatch,
  // upperVisState,
}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  // const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();
  // const [tabsData, setTabsData] = tabsDataState.use();

  const setTabOpenedState = useTabs(state => state.setTabOpenedState);


  const upperUiContext = useUpperUiContext()

  const windowSize = useWindowSize();
  const [xsScreen, setXsScreen] = useState(
    () => upperUiContext.upperVisState.xsSizing_initial
  );

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 505) {
        setXsScreen(true);
      } else {
        setXsScreen(false);
      }
    }
  }, [windowSize.width]);

  function renderColsNumberControls() {
    const arrOfColsNumbers: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];

    let colsNumbering = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
    };

    return arrOfColsNumbers.map((el, i) => {
      return (
        <div className="flex items-center ml-2" key={i}>
          <button
            onClick={() => {
              setGlobalSettingsData({
                ...globalSettingsData,
                numberOfCols: el,
              });
            }}
            className="focus-1-offset"
          >
            <p
              className={` ${
                globalSettingsData.numberOfCols === el
                  ? `text-${uiColorData} underline cursor-default`
                  : `text-black cursor-pointer hover:text-${uiColorData} hover:text-opacity-70`
              } 
              
              `}
            >
              {colsNumbering[el]}
            </p>
          </button>
        </div>
      );
    });
  }
  return (
    <FocusLock>
      <div
        className="flex flex-col z-50 fixed h-full w-screen justify-center items-center"
        style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
        onClick={() => {
          // upperVisDispatch({ type: "SETTINGS_TOGGLE" });
          upperUiContext.upperVisDispatch({type: "SETTINGS_TOGGLE"})
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
            className={`bg-gray-100 pb-3 pt-5 border-2 px-4 border-${uiColorData} rounded-sm relative`}
            style={{
              width: `${xsScreen ? "350px" : "417px"}`,
              height: "255px",
            }}
          >
            <Settings_inner_xs
              // upperVisDispatch={upperVisDispatch}
              currentSettings="global"
            />

            <div className="absolute right-0 top-0 mt-1 mr-1">
              <button
                className="h-5 w-5 focus-2-offset-dark"
                onClick={() => {
                  // upperVisDispatch({ type: "SETTINGS_TOGGLE" });
                  upperUiContext.upperVisDispatch({type: "SETTINGS_TOGGLE"})
                }}
                aria-label={"Close"}
              >
                <CancelSVG className="h-full w-full fill-current text-gray-600 cursor-pointer hover:text-gray-900" />
              </button>
            </div>

            <p className="text-center">Global settings</p>
            <div className="flex justify-between items-center mb-2 mt-2">
              <p className="">One color for all columns</p>
              <button
                className={`h-4 w-4 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                  globalSettingsData.oneColorForAllCols
                    ? // ? `bg-${uiColorData} hover:bg-opacity-50`
                      // : `hover:bg-${uiColorData} hover:bg-opacity-50`
                      `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                    : `hover:border-opacity-50`
                } focus-1-offset-dark`}
                onClick={() => {
                  setGlobalSettingsData({
                    ...globalSettingsData,
                    oneColorForAllCols: !globalSettingsData.oneColorForAllCols,
                  });
                }}
                aria-label={"One color for all columns"}
              ></button>
            </div>
            <div className="flex justify-between items-center mb-2 mt-2">
              <p className="">Limit column width growth</p>
              <button
                className={`h-4 w-4 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                  globalSettingsData.limitColGrowth
                    ? // ? `bg-${uiColorData} hover:bg-opacity-50`
                      // : `hover:bg-${uiColorData} hover:bg-opacity-50`
                      `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                    : `hover:border-opacity-50`
                } focus-1-offset-dark  `}
                onClick={() => {
                  setGlobalSettingsData({
                    ...globalSettingsData,
                    // oneColorForAllCols: !globalSettingsData.oneColorForAllCols,
                    limitColGrowth: !globalSettingsData.limitColGrowth,
                  });
                }}
                aria-label={"Limit column width growth"}
              ></button>
            </div>

            <div className="flex justify-between items-center mb-2 mt-2">
              <p className="">Hide folder containing all bookmarks</p>
              <button
                className={`h-4 w-4 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                  globalSettingsData.hideNonDeletable
                    ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                    : `hover:border-opacity-50`
                } focus-1-offset-dark `}
                onClick={() => {
                  setGlobalSettingsData({
                    ...globalSettingsData,
                    hideNonDeletable: !globalSettingsData.hideNonDeletable,
                  });
                }}
                aria-label={"Hide folder containing all bookmarks"}
              ></button>
            </div>

            <div className="my-0">
              <div
                className={`flex items-center mb-2 mt-2 justify-between border-${uiColorData} border-t border-opacity-40`}
              >
                <p className="whitespace-nowrap w-32">RSS Display</p>

                <div className="flex">
                  <div className="flex items-center mr-2">
                    <button
                      className={`h-3 w-3 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                        rssSettingsData.description
                          ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                          : `hover:border-opacity-50`
                      } focus-1-offset-dark `}
                      style={{ marginTop: "2px" }}
                      onClick={() => {
                        // setDescriptionCheckbox((b) => !b);
                        // setWasCheckboxClicked(true);
                        setRssSettingsData({
                          ...rssSettingsData,
                          description: !rssSettingsData.description,
                        });

                        setTabOpenedState(null);
                      }}
                      aria-label={"RSS description on by default"}
                    ></button>
                    <span className="ml-1 ">Description</span>
                  </div>

                  <div className="flex items-center">
                    <button
                      className={`h-3 w-3 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                        rssSettingsData.date
                          ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                          : `hover:border-opacity-50`
                      } focus-1-offset-dark`}
                      style={{ marginTop: "2px" }}
                      onClick={() => {
                        // setDateCheckbox((b) => !b);
                        // setWasCheckboxClicked(true);
                        setRssSettingsData({
                          ...rssSettingsData,
                          date: !rssSettingsData.date,
                        });

                        setTabOpenedState(null);
                      }}
                      aria-label={"RSS date on by default"}
                    ></button>
                    <span className="ml-1">Date</span>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center mt-2 pb-1 justify-between border-${uiColorData} border-b border-opacity-40`}
              >
                <p className="whitespace-nowrap w-32">RSS Items per page</p>
                <input
                  type="number"
                  min="5"
                  max="15"
                  className="border w-8 text-center border-gray-300 bg-gray-50
                focus-1
                "
                  value={rssSettingsData.itemsPerPage}
                  onChange={(e) => {
                    // setRssItemsPerPage(parseInt(e.target.value));
                    setRssSettingsData({
                      ...rssSettingsData,
                      itemsPerPage: parseInt(e.target.value),
                    });
                    // setWasItemsPerPageClicked(true);
                    setTabOpenedState(null);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 mt-1">
              <p className="">Number of columns</p>

              <div className="flex">{renderColsNumberControls()}</div>
            </div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default GlobalSettings_UpperUI;
