import React, { useEffect, useState } from "react";

import { useDrop } from "react-dnd";
import { produce } from "immer";

import { ItemTypes } from "../utils/itemsDnd";

import { tabsDataState } from "../state/tabsAndBookmarks";

import { tabBeingDraggedColor_State } from "../state/colorsState";
import { is, objectTraps } from "immer/dist/internal";
import { ObjectFlags } from "typescript";

interface Item {
  type: string;
  tabID: string | number;
  colNumber: number;
  tabColor: string;
}

interface Props {
  colNumber: number;
  tabID: number | string | null;
  picBackground: boolean;
  isThisLastGap: boolean;
}

function GapAfterTab({
  colNumber,
  tabID,
  picBackground,
  isThisLastGap,
}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();

  const [
    tabBeingDraggedColor_Data,
    setTabBeingDraggedColor_Data,
  ] = tabBeingDraggedColor_State.use();

  const [{ isOver }, drop] = useDrop({
    //    required property
    accept: ItemTypes.BOOKMARK,
    drop: (item: Item, monitor) => dragTab(item.tabID, item.colNumber),
    // drop: (item, monitor) => console.log(item.tabID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function dragTab(itemID: number | string, itemColNumber: number) {
    setTabsData((previous) =>
      produce(previous, (updated) => {
        let itemToUpdate = updated.find((obj) => obj.id === itemID);

        if (itemToUpdate) {
          itemToUpdate.column = colNumber;
        }

        // reseting priority numbers in column that was item origin
        if (itemColNumber !== colNumber) {
          tabsData
            .filter((obj) => obj.column === itemColNumber)
            .filter((obj) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((filteredTab, i) => {
              let tabToUpdate = updated.find(
                (tab) => tab.id === filteredTab.id
              );
              if (tabToUpdate) {
                tabToUpdate.priority = i;
              }
            });
        }

        // when column is empty
        if (!tabID) {
          if (itemToUpdate) {
            itemToUpdate.priority = 0;
          }
          return;
        }

        // index of tab before the gap the tab is dragged into
        let draggedIntoIndex: number = 0;

        tabsData.forEach((obj, i) => {
          if (obj.id === tabID) {
            draggedIntoIndex = i;
          }
        });

        let draggedIntoPriority = tabsData[draggedIntoIndex].priority;

        if (
          itemID !== tabID &&
          (draggedIntoPriority + 1 !== itemToUpdate?.priority ||
            colNumber !== itemColNumber)
        ) {
          if (itemToUpdate) {
            if (
              colNumber === itemColNumber &&
              draggedIntoPriority > itemToUpdate.priority


            ) {
              itemToUpdate.priority = draggedIntoPriority;
            } else {
              itemToUpdate.priority = draggedIntoPriority + 1;
            }
          }

          tabsData
            .filter((obj) => obj.column === colNumber)
            .filter((obj) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((filteredTab, i) => {
              let tabToUpdate = updated.find(
                (tab) => tab.id === filteredTab.id
              );

              if (tabToUpdate) {
                if (tabToUpdate.priority <= draggedIntoPriority) {
                  tabToUpdate.priority = i;
                } else {
                  tabToUpdate.priority += 1;
                }
              }
            });

            
        }

        // tabsData.forEach((obj, i) => {
        //   let currentTabIndex: number = i;

        //   // setting item priority to 1 higher than the tab placed right before the gap
        //   if (obj.id === itemID) {
        //     updated[currentTabIndex].priority = draggedIntoPriority + 1;
        //   }

        //   // incrementing by 1 priorities of Tabs positioned after the place where the item is being dragged to
        //   if (obj.column === colNumber && obj.id !== itemID) {
        //     if (obj.priority > draggedIntoPriority) {
        //       updated[currentTabIndex].priority += 1;
        //     }
        //   }
        // });
      })
    );
  }

  function calcOpacityOnDrop(picBackground: boolean) {
    // if (isThisLastGap) {
    //   if (picBackground) {
    //     return "bg-black opacity-20";
    //   } else {
    //     return "bg-black opacity-10";
    //   }
    // }

    if (picBackground) {
      return "bg-black opacity-50";
    } else {
      return `bg-${tabBeingDraggedColor_Data.tabColor} opacity-60`;
    }
  }

  return (
    <>
      {isThisLastGap ? (
        <div ref={drop} className="relative">
          <div
            className={`h-6
             ${isOver ? calcOpacityOnDrop(picBackground) : ""}
        
         `}
            // style={{ backgroundColor: singleColumnColor }}
          ></div>
          <div
            className={`min-h-screen w-full absolute
            ${isOver ? "opacity-30 bg-blueGray-200" : ""}
          `}
          ></div>
        </div>
      ) : (
        <div
          className={`h-6 ${isOver ? calcOpacityOnDrop(picBackground) : ""}
     
     `}
          // style={{ backgroundColor: singleColumnColor }}
          ref={drop}
        ></div>
      )}
    </>
  );
}

export default GapAfterTab;
