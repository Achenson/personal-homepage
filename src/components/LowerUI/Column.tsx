import React from "react";

import { tabsDataState } from "../../state/tabsAndBookmarks";

import {
  columnsColorsState,
  columnsColorsImg_State,
} from "../../state/colorsState";
import { globalSettingsState } from "../../state/defaultSettings";

import { backgroundColorState } from "../../state/colorsState";

import Tab from "./Tab";

import GapAfterTab from "./GapAfterTab";

import { UpperVisAction } from "../../utils/interfaces";

interface Props {
  colNumber: number;
  upperVisDispatch: React.Dispatch<UpperVisAction>;
}

// const Column = React.forwardRef(({ colNumber, closeAllTabs }: Props, ref) => {
function Column({ colNumber, upperVisDispatch }: Props): JSX.Element {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [
    columnsColorsImg_Data,
    setColumnsColorsImg_Data,
  ] = columnsColorsImg_State.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [
    backgroundColorData,
    setbackgroundColorData,
  ] = backgroundColorState.use();
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

  return (
    <div
      className={`overflow-hidden flex flex-col justify-between
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
      <div>
        {tabsData
          .filter((el) => el.column === colNumber)
          // lower priority, higher in the column
          .sort((a, b) => a.priority - b.priority)
          .map((el, i) => {
            return (
              <div key={i} className="">
                <Tab
                  tabID={el.id}
                  tabTitle={el.title}
                  tabColor={el.color}
                  tabType={el.type}
                  colNumber={el.column}
                  upperVisDispatch={upperVisDispatch}
                />
                <GapAfterTab
                  colNumber={colNumber}
                  tabID={el.id}
                  picBackground={globalSettingsData.picBackground}
                  isThisLastGap={isThisLastGap(lastTabId, el.id)}
                />
              </div>
            );
          })}

        {tabsData.filter((el) => el.column === colNumber).length === 0 ? (
          <GapAfterTab
            colNumber={colNumber}
            tabID={null}
            picBackground={globalSettingsData.picBackground}
            isThisLastGap={true}
          />
        ) : null}
      </div>

      <div
        className={`h-64 lg:bg-${
          globalSettingsData.picBackground ? "" : backgroundColorData
        }`}
      ></div>
    </div>
  );
}

export default Column;
