import React from "react";
import { useState, useEffect, useRef } from "react";


import {
  tabsDataState,
  bookmarksAllTagsState,
} from "../state/tabsAndBookmarks";

import { closeAllTabsState } from "../state/defaultSettings";

import { produce } from "immer";

import {resetColorsState } from "../state/colorsState";

import { globalSettingsState } from "../state/defaultSettings";
import Column from "./Column";

import useSize from "@react-hook/size";

interface Props {}

function Grid({}: Props): JSX.Element {
  const [tabsData, setTabsData] = tabsDataState.use();
  const [bookmarksAllTagsData, setBookmarksAllTagsData] = bookmarksAllTagsState.use();
  const [resetColorsData, setResetColorsData] = resetColorsState.use();
  const [globalSettingsData, setGlobalSettingsData] = globalSettingsState.use();

  const [
    closeAllTabsData,
    setCloseAllTabsData,
  ] = closeAllTabsState.use();

  const target = React.useRef(null);
  const [width, height] = useSize(target);

  // const [{addedProps}, drop] = useDrop({

  // })

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

    console.log(bookmarksAllTagsData);

    // deleting an empty folderTab
    // deleting a tab if there is no tags with the same name in bookmarks

    tabsData.forEach((obj, i) => {
      if (bookmarksAllTagsData.indexOf(obj.id) === -1 && obj.type === "folder") {
        console.log("cut");

        setTabsData((previous) =>
          produce(previous, (updated) => {
            updated.splice(i, 1);
          })
        );
      }
    });


  }, [tabsData, setTabsData, bookmarksAllTagsData]);

  function renderColumns(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return <Column colNumber={1} closeAllTabs={closeAllTabsData} />;
      case 2:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
          </>
        );
      case 3:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
            <Column colNumber={3} closeAllTabs={closeAllTabsData} />
          </>
        );
      case 4:
        return (
          <>
            <Column colNumber={1} closeAllTabs={closeAllTabsData} />
            <Column colNumber={2} closeAllTabs={closeAllTabsData} />
            <Column colNumber={3} closeAllTabs={closeAllTabsData} />
            <Column colNumber={4} closeAllTabs={closeAllTabsData} />
          </>
        );
    }
  }

  function gridSettings(numberOfCols: 1 | 2 | 3 | 4) {
    switch (numberOfCols) {
      case 1:
        return ``;
      case 2:
        return `sm:grid-cols-2`;
      case 3:
        return `sm:grid-cols-2 md:grid-cols-3`;
      case 4:
        return `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  }

  return (
    <div
      className={`grid gap-x-2 gap-y-6 mx-4 ${gridSettings(
        globalSettingsData.numberOfCols
      )}`}
      // className={`grid gap-x-2 gap-y-6 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
      ref={target}
    >
    

      {renderColumns(globalSettingsData.numberOfCols)}
    </div>
  );
}

export default Grid;
