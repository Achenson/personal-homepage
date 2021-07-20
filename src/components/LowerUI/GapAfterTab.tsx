import React, { useEffect, useState } from "react";

import { useDrop } from "react-dnd";
import { produce } from "immer";

import { ItemTypes } from "../../utils/itemsDnd";

import { tabsDataState } from "../../state/tabsAndBookmarks";

import {useTabs} from "../../state/useTabs"

import { tabBeingDraggedColor_State } from "../../state/colorsState";
import { globalSettingsState } from "../../state/defaultSettings";

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
  // for proper top border display
  isThisTheOnlyGap: boolean;
}

function GapAfterTab({
  colNumber,
  tabID,
  picBackground,
  isThisLastGap,
  isThisTheOnlyGap,
}: Props): JSX.Element {

  // const [tabsData, setTabsData] = tabsDataState.use();

  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();


  const tabs = useTabs(store => store.tabs);
  const dragTab = useTabs(store => store.dragTab);

  const [tabBeingDraggedColor_Data, setTabBeingDraggedColor_Data] =
    tabBeingDraggedColor_State.use();

  const [{ isOver }, drop] = useDrop({
    //    required property
    accept: ItemTypes.BOOKMARK,
    drop: (item: Item, monitor) => dragTabWrapper(item.tabID, item.colNumber),
    // drop: (item, monitor) => console.log(item.tabID),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function dragTabWrapper(itemID: number | string, itemColNumber: number) {



    dragTab(itemID, itemColNumber, colNumber, tabID);


    // setTabsData((previous) =>
    //   produce(previous, (updated) => {
    //     let itemToUpdate = updated.find((obj) => obj.id === itemID);

    //     if (itemToUpdate) {
    //       itemToUpdate.column = colNumber;
    //     }

    //     // reseting priority numbers in column that was item origin
    //     if (itemColNumber !== colNumber) {
    //       tabs
    //         .filter((obj) => obj.column === itemColNumber)
    //         .filter((obj) => obj.id !== itemID)
    //         .sort((a, b) => a.priority - b.priority)
    //         .forEach((filteredTab, i) => {
    //           let tabToUpdate = updated.find(
    //             (tab) => tab.id === filteredTab.id
    //           );
    //           if (tabToUpdate) {
    //             tabToUpdate.priority = i;
    //           }
    //         });
    //     }

    //     // when column is empty
    //     if (!tabID) {
    //       if (itemToUpdate) {
    //         itemToUpdate.priority = 0;
    //       }
    //       return;
    //     }

    //     // index of tab before the gap the tab is dragged into
    //     let draggedIntoIndex: number = 0;

    //     tabs.forEach((obj, i) => {
    //       if (obj.id === tabID) {
    //         draggedIntoIndex = i;
    //       }
    //     });

    //     let itemToUpdatePriority_initial = itemToUpdate?.priority as number;

    //     let draggedIntoPriority = tabs[draggedIntoIndex].priority;

    //     if (
    //       itemID !== tabID &&
    //       // if draggetItem do not belongs to the column OR draggedIntoTab is not the previous tab
    //       (draggedIntoPriority + 1 !== itemToUpdate?.priority ||
    //         colNumber !== itemColNumber)
    //     ) {
    //       if (itemToUpdate) {
    //         if (colNumber !== itemColNumber) {
    //           itemToUpdate.priority = draggedIntoPriority + 1;
    //         } else {
    //           // if dragging to a Tab further down
    //           if (draggedIntoPriority > itemToUpdate.priority) {
    //             itemToUpdate.priority = draggedIntoPriority;
    //             //  if dragging to a Tab further up
    //           } else {
    //             itemToUpdate.priority = draggedIntoPriority + 1;
    //           }
    //         }
    //       }

    //       tabs
    //         .filter((obj) => obj.column === colNumber)
    //         .filter((obj) => obj.id !== itemID)
    //         .sort((a, b) => a.priority - b.priority)
    //         .forEach((filteredTab, i) => {
    //           let tabToUpdate = updated.find(
    //             (tab) => tab.id === filteredTab.id
    //           );

    //           if (tabToUpdate) {
    //             if (tabToUpdate.priority <= draggedIntoPriority) {
    //               tabToUpdate.priority = i;
    //               // if tab being updated is further down that the tab being dragged INTO
    //             } else {
    //               // updating priorities further down

    //               if (colNumber !== itemColNumber) {
    //                 tabToUpdate.priority += 1;
    //               } else {
    //                 // DO NOT UPDATE TABS further down then tab being dragged if tab is being dragged up
    //                 if (
    //                   draggedIntoPriority < itemToUpdatePriority_initial &&
    //                   tabToUpdate.priority > itemToUpdatePriority_initial
    //                 ) {
    //                   return;
    //                 }
    //                 // DO NOT UPDATE TABS further down then tab being dragged INTO if tab is being dragged down
    //                 if (
    //                   draggedIntoPriority > itemToUpdatePriority_initial &&
    //                   tabToUpdate.priority > draggedIntoPriority
    //                 ) {
    //                   return;
    //                 }

    //                 tabToUpdate.priority += 1;
    //               }
    //             }
    //           }
    //         });
    //     }
    //   })
    // );






  }

  function calcOpacityOnDrop() {
    // if (picBackground) {
    //   return "bg-black opacity-50";
    // } else {
    //   return `bg-${tabBeingDraggedColor_Data.tabColor} opacity-60`;
    // }

    return `bg-${tabBeingDraggedColor_Data.tabColor} opacity-60`;
  }

  function upperLastGapBorderDrag(): string {
    if (isOver) {
      return calcOpacityOnDrop();
    }

    if (globalSettingsData.picBackground) {
      return "";
    }

    return `border-r border-l ${isThisTheOnlyGap ? "border-t" : ""}`;
  }

  return (
    <>
      {isThisLastGap ? (
        <div ref={drop} className="h-full relative flex flex-col">
          <div
            className={`h-6 ${
              globalSettingsData.picBackground
                ? ""
                : `border-black border-opacity-10 `
            }
            ${upperLastGapBorderDrag()} `}
            // style={{ backgroundColor: singleColumnColor }}
          ></div>

          {/* 1px height to cover bottom of the column when draggind */}
          {!globalSettingsData.picBackground && (
            <div
              className={`absolute h-px w-full ${
                isOver ? calcOpacityOnDrop() : ""
              }`}
              style={{ top: "24px" }}
            ></div>
          )}

          <div
            className={`w-full flex-grow ${
              globalSettingsData.picBackground
                ? ""
                : `border-black border-opacity-10 border-l border-r border-b`
            }
            ${isOver ? "opacity-30 bg-blueGray-200" : ""}
          `}
            // style={{ height: "10000vh" }}
          ></div>
        </div>
      ) : (
        <div
          className={`h-6 ${
            globalSettingsData.picBackground
              ? ""
              : `border-black border-opacity-10 border-l border-r`
          } ${isOver ? calcOpacityOnDrop() : ""}
     
     `}
          // style={{ backgroundColor: singleColumnColor }}
          ref={drop}
        ></div>
      )}
    </>
  );
}

export default GapAfterTab;
