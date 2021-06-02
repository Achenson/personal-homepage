import React from "react";
import { useState, useEffect } from "react";
import { produce } from "immer";

import {
  tabsDataState,
  bookmarksAllTagsState,
} from "../../state/tabsAndBookmarks";

import { closeAllTabsState } from "../../state/defaultSettings";

import { useWindowSize } from "../../utils/hook_useWindowSize";

import {
  backgroundColorState,
  resetColorsState,
} from "../../state/colorsState";

import { globalSettingsState } from "../../state/defaultSettings";

import { UpperVisAction, InitUpperVisState } from "../../utils/interfaces";

import Column from "./Column";

interface Props {
  upperVisDispatch: React.Dispatch<UpperVisAction>;
  upperVisState: InitUpperVisState;
}

function Grid({ upperVisDispatch, upperVisState }: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] =
    bookmarksAllTagsState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [closeAllTabsData, setCloseAllTabsData] = closeAllTabsState.use();

  const windowSize = useWindowSize();

  const [breakpoint, setBreakpoint] = useState<0 | 1 | 2 | 3>(
 () =>   calcBreakpoint()
  );

  function calcBreakpoint() {
    if (windowSize.width) {
      // if (windowSize.width >= 1280) {
      //   return "xl";
      // }

      if (windowSize.width >= 1024) {
        return 3;
      }

      if (windowSize.width >= 768) {
        return 2;
      }

      if (windowSize.width >= 640) {
        return 1;
      }
    }

    return 0;
  }

  useEffect(() => {
    if (windowSize.width) {
      // if (windowSize.width >= 1280) {
      //   setBreakpoint("xl");
      //   return;
      // }

      if (windowSize.width >= 1024) {
        setBreakpoint(3);
        return;
      }

      if (windowSize.width >= 768) {
        setBreakpoint(2);
        return;
      }

      if (windowSize.width >= 640) {
        setBreakpoint(1);
        return;
      }

      setBreakpoint(0);
    }
  }, [windowSize.width]);

  useEffect(() => {
    if (closeAllTabsData) {
      setCloseAllTabsData(false);
    }
  }, [closeAllTabsData, setCloseAllTabsData]);

  useEffect(() => {
    if (resetColorsData) {
      // tabsData.forEach((obj, i) => {});

      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated.forEach((obj, i) => {
            obj.color = null;
          });
        })
      );

      setResetColorsData(false);
    }
  }, [resetColorsData, setTabsData, setResetColorsData]);

  useEffect(() => {
    // console.log(bookmarksAllTagsData);

    // deleting an empty folderTab
    // deleting a tab if there is no tags with the same name in bookmarks

    tabsData.forEach((obj, i) => {
      if (
        bookmarksAllTagsData.indexOf(obj.id) === -1 &&
        obj.type === "folder"
      ) {
        console.log(bookmarksAllTagsData);

        console.log("cut");

        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });
  }, [tabsData, setTabsData, bookmarksAllTagsData]);

  useEffect(() => {
    createLessColumns(globalSettingsData.numberOfCols);

    function createLessColumns(numberOfCols: 1 | 2 | 3 | 4) {
      if (numberOfCols === 4) return;

      setTabsData((previous) =>
        produce(previous, (updated) => {
          updated
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
    }
  }, [globalSettingsData.numberOfCols, setTabsData]);

  function renderColumns(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return (
          <Column
            colNumber={1}
            upperVisDispatch={upperVisDispatch}
            upperVisState={upperVisState}
          />
        );
      case 2:
        return (
          <>
            <Column
              colNumber={1}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={2}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
          </>
        );
      case 3:
        return (
          <>
            <Column
              colNumber={1}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={2}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={3}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
          </>
        );
      case 4:
        return (
          <>
            <Column
              colNumber={1}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={2}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={3}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
            <Column
              colNumber={4}
              upperVisDispatch={upperVisDispatch}
              upperVisState={upperVisState}
            />
          </>
        );
    }
  }

  // function gridSettings(numberOfCols: 1 | 2 | 3 | 4) {
  //   switch (numberOfCols) {
  //     case 1:
  //       return `grid-cols-1`;
  //     case 2:
  //       return `grid-cols-1 sm:grid-cols-2`;
  //     case 3:
  //       return `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`;
  //     case 4:
  //       return `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
  //   }
  // }

  function gridSettings(numberOfCols: 1 | 2 | 3 | 4, breakpoint: 0 | 1 | 2 | 3) {
    switch (numberOfCols) {
      case 1:
        return `repeat(1, minmax(0, 800px))`;

      case 2:
        // return `repeat(2, minmax(0, 800px)) `;
        if (breakpoint >= 1) {
          return `repeat(2, minmax(0, 800px))`;
        }
        return `repeat(1, minmax(0, 800px))`;

      case 3:
        if (breakpoint >= 2) {
          return `repeat(3, minmax(0, 800px))`;
        }

        if (breakpoint >= 1) {
          return `repeat(2, minmax(0, 800px))`;
        }

        return `repeat(1, minmax(0, 800px))`;

      case 4:
        if (breakpoint >= 3) {
          return `repeat(4, minmax(0, 800px))`;
        }

        if (breakpoint >= 2) {
          return `repeat(3, minmax(0, 800px))`;
        }

        if (breakpoint >=1) {
          return `repeat(2, minmax(0, 800px))`;
        }

        return `repeat(1, minmax(0, 800px))`;
    }
  }

  return (
    <div className="overflow-hidden mx-2 xs:mx-4">
      <div
        className={`grid justify-center gap-x-2 gap-y-6`}
        style={{
          // gridTemplateColumns: "repeat(1, minmax(0, 800px))"
          gridTemplateColumns: `${gridSettings(
            globalSettingsData.numberOfCols,
            breakpoint
          )}`,
        }}
        // className={`grid gap-x-2 gap-y-6 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
      >
        {renderColumns(globalSettingsData.numberOfCols)}
      </div>
      <div className="h-72"></div>
    </div>
  );
}

export default Grid;
