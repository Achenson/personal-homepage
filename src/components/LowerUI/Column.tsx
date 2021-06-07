import React from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";

import {
  columnsColorsState,
  columnsColorsImg_State,
} from "../../state/colorsState";
import { globalSettingsState } from "../../state/defaultSettings";

import UpperLeftMenu from "../UpperUI/UpperLeftMenu";
import UpperRightMenu from "../UpperUI/UpperRightMenu";

import { backgroundColorState } from "../../state/colorsState";

import Tab from "./Tab";

import GapAfterTab from "./GapAfterTab";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

interface Props {
  colNumber: number;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState;
  setTabType: React.Dispatch<React.SetStateAction<"folder" | "note" | "rss">>;
  breakpoint: 1|2|3|4;
}

// const Column = React.forwardRef(({ colNumber, closeAllTabs }: Props, ref) => {
function Column({
  colNumber,
  upperVisDispatch,
  upperVisState,
  setTabType,
  breakpoint
}: Props): JSX.Element {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [columnsColorsImg_Data, setColumnsColorsImg_Data] =
    columnsColorsImg_State.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [backgroundColorData, setbackgroundColorData] =
    backgroundColorState.use();
  const [tabsData, setTabsData] = tabsDataState.use();

  function calcColumnColor(
    colNumber: number,
    picBackground: boolean,
    oneColorForAllColumns: boolean
  ) {
    if (!picBackground) {
      return "";
    }

    if (oneColorForAllColumns) {
      return columnsColorsImg_Data.column_1;
    }

    switch (colNumber) {
      case 1:
        return columnsColorsImg_Data.column_1;
      case 2:
        return columnsColorsImg_Data.column_2;
      case 3:
        return columnsColorsImg_Data.column_3;
      case 4:
        return columnsColorsImg_Data.column_4;
    }
  }

  function calcColumnColor_picBackground(
    colNumber: number,
    picBackground: boolean,
    oneColorForAllColumns: boolean
  ) {
    if (picBackground) {
      return "";
    }

    if (oneColorForAllColumns) {
      return "bg-" + columnsColorsData.column_1;
    }

    switch (colNumber) {
      case 1:
        return "bg-" + columnsColorsData.column_1;
      case 2:
        return "bg-" + columnsColorsData.column_2;
      case 3:
        return "bg-" + columnsColorsData.column_3;
      case 4:
        return "bg-" + columnsColorsData.column_4;
    }
  }

  let sortedTabs = tabsData
    .filter((el) => el.column === colNumber)
    .sort((a, b) => a.priority - b.priority);

  let lastTabId: number | string | null;
  // let lastTabId: number | string | null = sortedTabs[sortedTabs.length-1].id
  if (sortedTabs.length > 0) {
    lastTabId = sortedTabs[sortedTabs.length - 1].id;
  } else {
    lastTabId = null;
  }

  let tabDataLength = tabsData.filter((el) => el.column === colNumber).length;

  function isThisLastGap(
    lastTabId: number | string | null,
    tabID: string | number
  ) {
    if (lastTabId === tabID) {
      // console.log("true");

      return true;
    }
    // console.log("false");

    return false;
  }

  function bordersIfNoBackground() {
    return `border-black border-opacity-10 border-b ${
      tabDataLength === 0 ? "" : ""
    }`;
  }

  return (
    <div
      className={`h-full relative flex flex-col ${
        globalSettingsData.picBackground ? "" : bordersIfNoBackground()
      }
       ${calcColumnColor_picBackground(
         colNumber,
         globalSettingsData.picBackground,
         globalSettingsData.oneColorForAllCols
       )}`}
      style={{
        backgroundColor: calcColumnColor(
          colNumber,
          globalSettingsData.picBackground,
          globalSettingsData.oneColorForAllCols
        ),
      }}
    >
      {tabsData
        .filter((el) => el.column === colNumber)
        // lower priority, higher in the column
        .sort((a, b) => a.priority - b.priority)
        .map((el, i) => {
          return (
            <div
              key={i}
              className={`flex flex-col ${
                isThisLastGap(lastTabId, el.id) ? "flex-grow" : ""
              }`}
            >
              <Tab
                tabID={el.id}
                tabTitle={el.title}
                tabColor={el.color}
                tabType={el.type}
                colNumber={el.column}
                tabOpened={el.opened}
                tabOpenedByDefault={el.openedByDefault}
                tabIsDeletable={el.deletable}
                upperVisDispatch={upperVisDispatch}
                upperVisState={upperVisState}
              />
              {/* <div className="flex-grow"> */}
              <GapAfterTab
                colNumber={colNumber}
                tabID={el.id}
                picBackground={globalSettingsData.picBackground}
                isThisLastGap={isThisLastGap(lastTabId, el.id)}
                isThisTheOnlyGap={false}
              />
              {/* </div> */}
            </div>
          );
        })}

      {tabDataLength === 0 ? (
        <div className="flex-grow">
          <GapAfterTab
            colNumber={colNumber}
            tabID={null}
            picBackground={globalSettingsData.picBackground}
            isThisLastGap={true}
            isThisTheOnlyGap={true}
          />
        </div>
      ) : null}

      {/* <div
        className={`h-64 lg:bg-${
          globalSettingsData.picBackground ? "" : backgroundColorData
        }`}
      ></div> */}

{/* if this is the last columns */}
      {colNumber ===  1 && (
        <div
          className="absolute"
          style={{
            top: "-32px",
            // zIndex: 9999
          }}
        >
          <UpperLeftMenu
            upperVisDispatch={upperVisDispatch}
            upperVisState={upperVisState}
          />
        </div>
      )}

      {colNumber ===  globalSettingsData.numberOfCols && (
        <div
          className="absolute"
          style={{
            top: "-32px",
            right: "0px"
          }}
        >
          <UpperRightMenu
            upperVisDispatch={upperVisDispatch}
            upperVisState={upperVisState}
            setTabType={setTabType}
          />
        </div>
      )}
    </div>
  );
}

export default Column;
