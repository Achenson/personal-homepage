import create from "zustand";
import produce from "immer";

import { SingleTabData } from "../utils/interfaces";
import { SingleBookmarkData } from "../utils/interfaces";

import { tabsData } from "./tabsData";

interface UseTabs {
  addTab: (singleTabData: SingleTabData) => void;

  // moving tabs to lower number cols(left) if globalSettings numberOfCols changes
  tabsLessColumns: (numberOfCols: 1 | 2 | 3 | 4) => void;
  // reseting tab content (open/closed state) to default
  defaultTabContent: (
    tabID: string | number,
    tabOpenedByDefault: boolean
  ) => void;
  // deleting tab if there are no bookmarks with this tag (tab's name)
  deleteEmptyTab: (bookmarksAllTags: (string | number)[]) => void;
  deleteTab: (tabID: string | number) => void;
  dragTab: (
    itemID: number | string,
    itemColNumber: number,
    colNumber: number,
    tabID: string | number | null
  ) => void;
  editTab: (
    tabID: string | number,
    tabTitleInput: string,
    textAreaValue: string | null,
    rssLinkInput: string,
    dateCheckbox: boolean,
    descriptionCheckbox: boolean,
    rssItemsPerPage: number,
    wasTabOpenClicked: boolean,
    wasCheckboxClicked: boolean,
    wasItemsPerPageClicked: boolean,
    tabType: "folder" | "note" | "rss",
    tabOpen: boolean,
    setTabOpened_local: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  resetAllTabColors: () => void;
  setTabColor: (color: string, tabID: string | number) => void;
  toggleTab: (tabID: string | number, tabOpened: boolean) => void;
  tabs: SingleTabData[];
}

// this can be used everywhere in your application
export const useTabs = create<UseTabs>((set) => ({
  addTab: (singleTabData) => {
    set(
      produce((state: UseTabs) => {
        state.tabs.push(singleTabData);
      })
    );
  },
  tabsLessColumns: (numberOfCols) => {
    set(
      produce((state: UseTabs) => {
        state.tabs
          .filter((obj) => obj.column >= numberOfCols)
          .sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          })
          .forEach((obj, i) => {
            obj.column = numberOfCols;
            obj.priority = i;
          });
      })
    );
  },
  defaultTabContent: (tabID, tabOpenedByDefault) =>
    set(
      produce((state: UseTabs) => {
        let tabToUpdate = state.tabs.find((obj) => obj.id === tabID);

        if (tabToUpdate) {
          let tabIndex = state.tabs.indexOf(tabToUpdate);
          state.tabs[tabIndex].opened = tabOpenedByDefault;
        }
      })
    ),

  deleteEmptyTab: (bookmarksAllTags) =>
    set(
      produce((state: UseTabs) => {
        state.tabs.forEach((obj, i) => {
          if (
            bookmarksAllTags.indexOf(obj.id) === -1 &&
            obj.type === "folder"
          ) {
            // setTabsData((previous) =>
            //   produce(previous, (updated) => {
            state.tabs.splice(i, 1);
            //   })
            // );
          }
        });
      })
    ),
  deleteTab: (tabID) =>
    set(
      produce((state: UseTabs) => {
        let tabToDelete = state.tabs.find((obj) => obj.id == tabID);
        if (tabToDelete) {
          let tabIndex = state.tabs.indexOf(tabToDelete);
          state.tabs.splice(tabIndex, 1);
        }
      })
    ),

  dragTab: (itemID, itemColNumber, colNumber, tabID) =>
    set(
      produce((state: UseTabs) => {
        let itemToUpdate = state.tabs.find((obj) => obj.id === itemID);

        if (itemToUpdate) {
          itemToUpdate.column = colNumber;
        }

        // reseting priority numbers in column that was item origin
        if (itemColNumber !== colNumber) {
          state.tabs
            .filter((obj) => obj.column === itemColNumber)
            .filter((obj) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((filteredTab, i) => {
              let tabToUpdate = state.tabs.find(
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

        state.tabs.forEach((obj, i) => {
          if (obj.id === tabID) {
            draggedIntoIndex = i;
          }
        });

        let itemToUpdatePriority_initial = itemToUpdate?.priority as number;

        let draggedIntoPriority = state.tabs[draggedIntoIndex].priority;

        if (
          itemID !== tabID &&
          // if draggetItem do not belongs to the column OR draggedIntoTab is not the previous tab
          (draggedIntoPriority + 1 !== itemToUpdate?.priority ||
            colNumber !== itemColNumber)
        ) {
          if (itemToUpdate) {
            if (colNumber !== itemColNumber) {
              itemToUpdate.priority = draggedIntoPriority + 1;
            } else {
              // if dragging to a Tab further down
              if (draggedIntoPriority > itemToUpdate.priority) {
                itemToUpdate.priority = draggedIntoPriority;
                //  if dragging to a Tab further up
              } else {
                itemToUpdate.priority = draggedIntoPriority + 1;
              }
            }
          }

          state.tabs
            .filter((obj) => obj.column === colNumber)
            .filter((obj) => obj.id !== itemID)
            .sort((a, b) => a.priority - b.priority)
            .forEach((filteredTab, i) => {
              let tabToUpdate = state.tabs.find(
                (tab) => tab.id === filteredTab.id
              );

              if (tabToUpdate) {
                if (tabToUpdate.priority <= draggedIntoPriority) {
                  tabToUpdate.priority = i;
                  // if tab being updated is further down that the tab being dragged INTO
                } else {
                  // updating priorities further down

                  if (colNumber !== itemColNumber) {
                    tabToUpdate.priority += 1;
                  } else {
                    // DO NOT UPDATE TABS further down then tab being dragged if tab is being dragged up
                    if (
                      draggedIntoPriority < itemToUpdatePriority_initial &&
                      tabToUpdate.priority > itemToUpdatePriority_initial
                    ) {
                      return;
                    }
                    // DO NOT UPDATE TABS further down then tab being dragged INTO if tab is being dragged down
                    if (
                      draggedIntoPriority > itemToUpdatePriority_initial &&
                      tabToUpdate.priority > draggedIntoPriority
                    ) {
                      return;
                    }

                    tabToUpdate.priority += 1;
                  }
                }
              }
            });
        }
      })
    ),

  editTab: (
    tabID,
    tabTitleInput,
    textAreaValue,
    rssLinkInput,
    dateCheckbox,
    descriptionCheckbox,
    rssItemsPerPage,
    wasTabOpenClicked,
    wasCheckboxClicked,
    wasItemsPerPageClicked,
    tabType,
    tabOpen,
    setTabOpened_local
  ) => {
    set(
      produce((state: UseTabs) => {
        let tabToUpdate = state.tabs.find((obj) => obj.id === tabID);

        if (tabToUpdate) {
          tabToUpdate.title = tabTitleInput;
          // updated[tabIndex].deletable = currentTab[0].deletable
          if (wasTabOpenClicked) {
            tabToUpdate.openedByDefault = tabOpen;
            setTabOpened_local(tabOpen);
            tabToUpdate.opened = tabOpen;
          }

          if (tabType === "note") {
            tabToUpdate.noteInput = textAreaValue;
          }
          if (tabType === "rss") {
            tabToUpdate.rssLink = rssLinkInput;

            if (wasCheckboxClicked) {
              tabToUpdate.date = dateCheckbox;
            }

            if (wasCheckboxClicked) {
              tabToUpdate.description = descriptionCheckbox;
            }

            if (wasItemsPerPageClicked) {
              tabToUpdate.itemsPerPage = rssItemsPerPage;
            }
          }
        }
      })
    );
  },
  resetAllTabColors: () =>
    set(
      produce((state: UseTabs) => {
        state.tabs.forEach((obj, i) => {
          obj.color = null;
        });
      })
    ),
  setTabColor: (color, tabID) =>
    set(
      produce((state: UseTabs) => {
        let tabToChange = state.tabs.find((obj) => obj.id === tabID);

        if (tabToChange) {
          tabToChange.color = `${color}`;
        }
      })
    ),

  toggleTab: (tabID, tabOpened) =>
    set(
      produce((state: UseTabs) => {
        let tabToUpdate = state.tabs.find(
          (obj: SingleTabData) => obj.id === tabID
        );
        if (tabToUpdate) {
          state.tabs[state.tabs.indexOf(tabToUpdate)].opened = !tabOpened;
        }
      })
    ),
  tabs: [...tabsData],
}));

// let bookmarksAllTagsState = <(string | number)[]>["ALL_TAGS", "2", "3"];

// let deletedTabState = <string | number>"";
