import React, { useEffect, useState } from "react";

import { useDrop } from "react-dnd";
import { produce } from "immer";

import { ItemTypes } from "../utils/itemsDnd";

import { tabsDataState } from "../state/tabsAndBookmarks";

import {
  tabBeingDraggedColor_State,
} from "../state/colorsState";

interface Props {
  colNumber: number;
  tabID: number | string | null;
  picBackground: boolean;
}

function GapAfterTab({
  colNumber,
  tabID,
  picBackground,
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  
  const [
    tabBeingDraggedColor_Data,
    setTabBeingDraggedColor_Data,
  ] = tabBeingDraggedColor_State.use();

  const [{ isOver }, drop] = useDrop({
    //    required property
    accept: ItemTypes.BOOKMARK,
    drop: (item, monitor) =>
    // @ts-ignore: Unreachable code error
      dragTab(item.tabID, item.colNumber, item.tabColor),
    // drop: (item, monitor) => console.log(item.tabID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),

   
  });



  function dragTab(
    itemID: number | string,
    itemColNumber: number,
    tabColor: string
  ) {
    setTabsData((previous) =>
      produce(previous, (updated) => {
        let tabIndex: number = 0;

        tabsData.forEach((obj, i) => {
          if (obj.id === itemID) {
            tabIndex = i;
          }
        });

        // changing item column number
        updated[tabIndex].column = colNumber;

        // reseting priority numbers in column that was item origin

        if (itemColNumber !== colNumber) {
          tabsData
            .filter((obj, i) => obj.column === itemColNumber)
            .filter((obj, i) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((obj, i) => {
              let currentTabIndex: number = 0;

              tabsData.forEach((obj2, j) => {
                if (obj2.id === obj.id) {
                  currentTabIndex = j;
                }
              });

              updated[currentTabIndex].priority = i;
            });
        }

        // when column is empty
        if (!tabID) {
          updated[tabIndex].priority = 0;
          return;
        }

        //index of tab before the gap the tab is dragged into
        let draggedIntoIndex: number = 0;

        tabsData.forEach((obj, i) => {
          if (obj.id === tabID) {
            draggedIntoIndex = i;
          }
        });

        let draggedIntoPriority = tabsData[draggedIntoIndex].priority;

        tabsData.forEach((obj, i) => {
          let currentTabIndex: number = i;

          // setting item priority to 1 higher than the tab placed right before the gap
          if (obj.id === itemID) {
            updated[currentTabIndex].priority = draggedIntoPriority + 1;
          }

          // incrementing by 1 priorities of Tabs positioned after the place where the item is being dragged to
          if (obj.column === colNumber && obj.id !== itemID) {
            if (obj.priority > draggedIntoPriority) {
              updated[currentTabIndex].priority += 1;
            }
          }
        });
      })
    );
  }

  function calcOpacityOnDrop(picBackground: boolean) {
    if (picBackground) {
      return "bg-black opacity-50";
    }

    // console.log(draggedTabColor);

    return `bg-${tabBeingDraggedColor_Data.tabColor} opacity-60`;
    

  }

  return (
    <div
      className={`${tabID ? "h-6" : "h-14"} ${
        isOver ? calcOpacityOnDrop(picBackground) : ""
      }`}
      // style={{ backgroundColor: singleColumnColor }}
      ref={drop}
    ></div>
  );
}

export default GapAfterTab;
