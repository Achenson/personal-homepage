import React, { useEffect, useState, useLayoutEffect } from "react";
import { produce } from "immer";

import { ReactComponent as CancelSVG } from "../../svgs/alphabet-x.svg";

import { uiColorState } from "../../state/colorsState";

import {
  rssSettingsState,
  globalSettingsState,
  tabOpenedState,
} from "../../state/defaultSettings";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

import { useWindowSize } from "../../utils/hook_useWindowSize";
import { tabsDataState } from "../../state/tabsAndBookmarks";
import Settings_inner_xs from "./Settings_inner_xs";

interface Props {
  // settingsVis: boolean;
  // setSettingsVis: React.Dispatch<React.SetStateAction<boolean>>;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState
  // xsSizing: boolean;
}

function GlobalSettings_UpperUI({ upperVisDispatch, upperVisState}: Props): JSX.Element {
  const [uiColorData, setUiColorData] = uiColorState.use();

  const [rssSettingsData, setRssSettingsData] = rssSettingsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [tabOpenedData, setTabOpenedData] = tabOpenedState.use();
  const [tabsData, setTabsData] = tabsDataState.use();

  const windowSize = useWindowSize();
  const [xsScreen, setXsScreen] = useState(() =>upperVisState.xsSizing_initial);

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 490) {
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
          <p
            className={` ${
              globalSettingsData.numberOfCols === el
                ? `text-${uiColorData} underline cursor-default`
                : `text-black cursor-pointer hover:text-${uiColorData} hover:text-opacity-70`
            } 
              
              `}
            onClick={() => {
              setGlobalSettingsData({
                ...globalSettingsData,
                numberOfCols: el,
              });
            }}
          >
            {colsNumbering[el]}
          </p>
        </div>
      );
    });
  }
  return (
    <div
      className="flex flex-col z-50 fixed h-full w-screen justify-center items-center"
      style={{ backgroundColor: "rgba(90, 90, 90, 0.4)" }}
      onClick={() => {
        upperVisDispatch({ type: "SETTINGS_TOGGLE" });
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
          style={{ width: `${xsScreen ? "350px" : "417px"}`, height: "225px" }}
        >

        <Settings_inner_xs
        upperVisDispatch={upperVisDispatch}
        currentSettings="global"
        />




          <div className="absolute right-0 top-0 mt-1 mr-1">
            <CancelSVG
              className="h-5 fill-current text-gray-600 cursor-pointer hover:text-gray-900"
              onClick={() => {
                upperVisDispatch({ type: "SETTINGS_TOGGLE" });
              }}
            />
          </div>

          <p className="text-center">Global settings</p>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="">One color for all columns</p>
            <div
              className={`h-4 w-4 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                globalSettingsData.oneColorForAllCols
                  ? // ? `bg-${uiColorData} hover:bg-opacity-50`
                    // : `hover:bg-${uiColorData} hover:bg-opacity-50`
                    `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                  : `hover:border-opacity-50`
              } `}
              onClick={() => {
                setGlobalSettingsData({
                  ...globalSettingsData,
                  oneColorForAllCols: !globalSettingsData.oneColorForAllCols,
                });
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="">Hide folder containing all bookmarks</p>
            <div
              className={`h-4 w-4 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                globalSettingsData.hideNonDeletable
                  ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                  : `hover:border-opacity-50`
              } `}
              onClick={() => {
                setGlobalSettingsData({
                  ...globalSettingsData,
                  hideNonDeletable: !globalSettingsData.hideNonDeletable,
                });
              }}
            ></div>
          </div>

          <div className="flex items-center mb-2 mt-2 justify-between">
            <p className="whitespace-nowrap w-32">RSS Display</p>

            <div className="flex">
              <div className="flex items-center mr-2">
                <div
                  className={`h-3 w-3 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                    rssSettingsData.description
                      ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                      : `hover:border-opacity-50`
                  } `}
                  style={{ marginTop: "2px" }}
                  onClick={() => {
                    // setDescriptionCheckbox((b) => !b);
                    // setWasCheckboxClicked(true);
                    setRssSettingsData({
                      ...rssSettingsData,
                      description: !rssSettingsData.description,
                    });

                    setTabOpenedData(null);
                  }}
                />
                <span className="ml-1 ">Description</span>
              </div>

              <div className="flex items-center">
                <div
                  className={`h-3 w-3 cursor-pointer transition duration-75 border-2 border-${uiColorData} ${
                    rssSettingsData.date
                      ? `bg-${uiColorData} bg-opacity-50 hover:border-opacity-30`
                      : `hover:border-opacity-50`
                  } `}
                  style={{ marginTop: "2px" }}
                  onClick={() => {
                    // setDateCheckbox((b) => !b);
                    // setWasCheckboxClicked(true);
                    setRssSettingsData({
                      ...rssSettingsData,
                      date: !rssSettingsData.date,
                    });

                    setTabOpenedData(null);
                  }}
                />
                <span className="ml-1">Date</span>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-2 justify-between">
            <p className="whitespace-nowrap w-32">RSS Items per page</p>
            <input
              type="number"
              min="5"
              max="15"
              className="border w-8 text-center border-gray-300 bg-gray-50"
              value={rssSettingsData.itemsPerPage}
              onChange={(e) => {
                // setRssItemsPerPage(parseInt(e.target.value));
                setRssSettingsData({
                  ...rssSettingsData,
                  itemsPerPage: parseInt(e.target.value),
                });
                // setWasItemsPerPageClicked(true);
                setTabOpenedData(null);
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-2 mt-2">
            <p className="">Number of columns</p>

            <div className="flex">{renderColsNumberControls()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSettings_UpperUI;
