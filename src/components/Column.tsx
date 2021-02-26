import React, { Fragment } from "react";

import { useState, useEffect } from "react";
import { ItemTypes } from "../utils/itemsDnd";

import { tabsDataState } from "../state/tabsAndBookmarks";

import {
  columnsColorsState,
  resetColorsState,
  columnsColorsImg_State,
} from "../state/colorsState";
import {globalSettingsState } from "../state/defaultSettings";

import Tab from "./Tab";

import { useDrop } from "react-dnd";
import { produce } from "immer";
import GapAfterTab from "./GapAfterTab";

interface Props {
  colNumber: number;
  // ref: React.MutableRefObject<number>
  closeAllTabs: boolean;
}

const Column = React.forwardRef(({ colNumber, closeAllTabs }: Props, ref) => {
  const [columnsColorsData, setColumnsColorsData] = columnsColorsState.use();
  const [
    columnsColorsImg_Data,
    setColumnsColorsImg_Data,
  ] = columnsColorsImg_State.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();
  const [tabsData, setTabsData] = tabsDataState.use();


  function dragTab(itemID: number | string) {
    setTabsData((previous) =>
      produce(previous, (updated) => {
        let tabIndex: number = 0;

        tabsData.forEach((obj, i) => {
          if (obj.id === itemID) {
            tabIndex = i;
          }
        });
        // let currentTab = tabsData.filter( obj => obj.id === itemID )

        updated[tabIndex].column = colNumber;
        //  updated[currentTab]
      })
    );
  }

  function calcColumnColor(colNumber: number, picBackground: boolean, oneColorForAllColumns: boolean) {
    if (!picBackground) {
      // switch (colNumber) {
      //   case 1:
      //     return columnsColorsData.column_1;
      //   case 2:
      //     return columnsColorsData.column_2;
      //   case 3:
      //     return columnsColorsData.column_3;
      //   case 4:
      //     return columnsColorsData.column_4;
      // }
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

  //   return <div className={`bg-${columnsColorsData.column_1}`}>

  return (
    <div
      className={`
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
            <div key={i} className="">
              <Tab
                tabID={el.id}
                tabTitle={el.title}
                tabColor={el.color}
                tabType={el.type}
                colNumber={el.column}
                closeAllTabs={closeAllTabs}
                
              />
              <GapAfterTab colNumber={colNumber} tabID={el.id} picBackground={globalSettingsData.picBackground} />
            </div>
          );
        })}
      {tabsData.filter((el) => el.column === colNumber).length === 0 ? (
        <GapAfterTab colNumber={colNumber} tabID={null} picBackground={globalSettingsData.picBackground} />
      ) : null}
    </div>
  );
});

export default Column;
